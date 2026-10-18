import { createClient } from "@supabase/supabase-js";
import { products as fallbackProducts } from "@/data/products";
import { collections as fallbackCollections } from "@/data/collections";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== "https://your-project-id.supabase.co"
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch all collections with fallback
 */
export async function getCollections() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .eq("is_active", true);
      if (!error && data?.length) return data;
    } catch (err) {
      console.warn("Supabase fetch failed, using curated fallback:", err);
    }
  }
  return fallbackCollections;
}

/**
 * Fetch all products with fallback
 */
export async function getProducts(collectionSlug = null) {
  if (isSupabaseConfigured) {
    try {
      let query = supabase.from("products").select("*");
      if (collectionSlug) {
        query = query.eq("collection_id", collectionSlug);
      }
      const { data, error } = await query;
      if (!error && data?.length) return data;
    } catch (err) {
      console.warn("Supabase products fetch failed, using fallback:", err);
    }
  }

  if (collectionSlug) {
    return fallbackProducts.filter(p => p.collectionId === collectionSlug);
  }
  return fallbackProducts;
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();
      if (!error && data) return data;
    } catch (err) {
      console.warn("Supabase product single fetch failed, using fallback:", err);
    }
  }
  return fallbackProducts.find(p => p.slug === slug) || null;
}

/**
 * Save custom atelier saree design
 */
export async function saveAtelierDesign({ userId, title, designConfig, estimatedPrice, previewData }) {
  if (isSupabaseConfigured && userId) {
    try {
      const { data, error } = await supabase
        .from("saved_designs")
        .insert([{
          user_id: userId,
          title,
          design_config: designConfig,
          estimated_price: estimatedPrice,
          canvas_preview_data: previewData,
        }])
        .select()
        .single();
      if (!error) return { success: true, data };
    } catch (err) {
      console.error("Failed to save design to Supabase:", err);
    }
  }

  // Local storage fallback for guests or offline mode
  try {
    const existing = JSON.parse(localStorage.getItem("vayira_saved_designs") || "[]");
    const newDesign = {
      id: `local-${Date.now()}`,
      title,
      designConfig,
      estimatedPrice,
      previewData,
      createdAt: new Date().toISOString()
    };
    existing.unshift(newDesign);
    localStorage.setItem("vayira_saved_designs", JSON.stringify(existing));
    return { success: true, data: newDesign, isLocal: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * Submit design / consultation enquiry
 */
export async function submitEnquiry(enquiryData) {
  const refCode = `VYR-${Math.floor(100000 + Math.random() * 900000)}`;
  const record = {
    ...enquiryData,
    reference_code: refCode,
    status: "received",
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("design_enquiries")
        .insert([record])
        .select()
        .single();
      if (!error) return { success: true, data, referenceCode: refCode };
    } catch (err) {
      console.warn("Enquiry Supabase insert failed, storing locally:", err);
    }
  }

  // Fallback storage
  try {
    const existing = JSON.parse(localStorage.getItem("vayira_enquiries") || "[]");
    existing.unshift(record);
    localStorage.setItem("vayira_enquiries", JSON.stringify(existing));
  } catch (e) {
    // ignore
  }

  return { success: true, data: record, referenceCode: refCode, isLocal: !isSupabaseConfigured };
}
