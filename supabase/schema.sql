-- ==============================================================================
-- VAYIRA — A Royal Indian Silk House
-- Database Schema & Row Level Security (RLS) Policies
-- PostgreSQL / Supabase
-- ==============================================================================

-- 1. Profiles & Roles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'atelier_master', 'administrator')),
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by self and admins"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'administrator');

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. Collections Table
CREATE TABLE IF NOT EXISTS public.collections (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  subtitle TEXT,
  description TEXT,
  region TEXT,
  weave_type TEXT,
  zari_type TEXT,
  image_url TEXT,
  price_range TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Collections are viewable by everyone" ON public.collections FOR SELECT USING (true);
CREATE POLICY "Admins can modify collections" ON public.collections FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'administrator')
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  collection_id TEXT REFERENCES public.collections(id) ON DELETE SET NULL,
  price NUMERIC NOT NULL,
  price_formatted TEXT,
  silk_type TEXT,
  origin TEXT,
  weave_type TEXT,
  color_family TEXT,
  color_name TEXT,
  color_hex TEXT,
  zari_type TEXT,
  zari_weight TEXT,
  border_width TEXT,
  pallu_pattern TEXT,
  blouse_included BOOLEAN DEFAULT TRUE,
  blouse_description TEXT,
  weaving_duration TEXT,
  mark_certified TEXT,
  stock_status TEXT DEFAULT 'In Atelier',
  is_featured BOOLEAN DEFAULT FALSE,
  try_on_supported BOOLEAN DEFAULT TRUE,
  primary_image TEXT NOT NULL,
  gallery JSONB DEFAULT '[]'::jsonb,
  editorial_quote TEXT,
  description TEXT,
  specifications JSONB DEFAULT '[]'::jsonb,
  care_instructions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins can modify products" ON public.products FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'administrator')
);

-- 4. Saved Saree Designs (Atelier Creations)
CREATE TABLE IF NOT EXISTS public.saved_designs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Bespoke Saree Creation',
  design_config JSONB NOT NULL,
  estimated_price NUMERIC,
  canvas_preview_data TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.saved_designs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view and manage their own saved designs"
  ON public.saved_designs FOR ALL
  USING (auth.uid() = user_id);

-- 5. Design & Master Weaver Enquiries (No Payment Gateway)
CREATE TABLE IF NOT EXISTS public.design_enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reference_code TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  enquiry_type TEXT CHECK (enquiry_type IN ('bespoke_atelier', 'product_consultation', 'bridal_trousseau')),
  product_id TEXT REFERENCES public.products(id) ON DELETE SET NULL,
  design_config JSONB,
  estimated_amount NUMERIC,
  customer_notes TEXT,
  preferred_contact_mode TEXT DEFAULT 'phone',
  preferred_consultation_date DATE,
  status TEXT DEFAULT 'received' CHECK (status IN ('received', 'atelier_assigned', 'consultation_scheduled', 'loom_weaving', 'completed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.design_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own enquiries"
  ON public.design_enquiries FOR SELECT
  USING (auth.uid() = user_id OR customer_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Anyone can submit a design enquiry"
  ON public.design_enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can manage all design enquiries"
  ON public.design_enquiries FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('administrator', 'atelier_master'))
  );

-- 6. Virtual Try-On Jobs Table
CREATE TABLE IF NOT EXISTS public.try_on_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  saree_id TEXT REFERENCES public.products(id) ON DELETE SET NULL,
  original_photo_url TEXT,
  generated_result_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  provider TEXT DEFAULT 'vayira-neural-vton',
  error_message TEXT,
  retention_expiry TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '48 hours'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.try_on_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can access their own try-on jobs"
  ON public.try_on_jobs FOR ALL
  USING (auth.uid() = user_id);

-- 7. Automated Updated At Trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_saved_designs_updated_at
  BEFORE UPDATE ON public.saved_designs
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_design_enquiries_updated_at
  BEFORE UPDATE ON public.design_enquiries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
