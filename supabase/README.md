# VAYIRA — Supabase Backend Configuration Guide

This document explains how to connect your Supabase project to the **VAYIRA** luxury silk saree web application.

---

## 1. Environment Variables

Create a file named `.env.local` in the root of the project with the following keys:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# AI Virtual Try-On Provider (Optional)
# If left empty, VAYIRA will operate in high-fidelity Demonstration Mode
VTON_PROVIDER=mock # Options: 'mock', 'replicate', 'fal_ai', 'kolors'
VTON_API_KEY=
```

> **Note on Development Mode:** If `NEXT_PUBLIC_SUPABASE_URL` is omitted or empty, VAYIRA runs seamlessly using a resilient local fallback layer with localStorage persistence. When you supply your credentials, the application transitions to Supabase PostgreSQL and Supabase Auth.

---

## 2. Setting Up the Database Schema

1. Open your [Supabase Dashboard](https://supabase.com/dashboard).
2. Navigate to the **SQL Editor** tab.
3. Open `supabase/schema.sql` from this repository.
4. Copy the entire contents and run it in the SQL Editor.
5. This creates the required tables (`profiles`, `collections`, `products`, `saved_designs`, `design_enquiries`, `try_on_jobs`) along with Row Level Security (RLS) policies.

---

## 3. Storage Buckets Setup

To allow customer photo uploads for the **See Yourself in Silk** try-on feature and custom saree atelier captures:

1. In Supabase Dashboard, navigate to **Storage**.
2. Create a new bucket named: `try-on-uploads`
   - Set **Public bucket** to `false` (enforcing privacy).
   - Configure 48-hour auto-expiration or lifecycle cleanup.
3. Create a bucket named: `atelier-renders`
   - Set **Public bucket** to `true` (for sharing custom saree renders).

---

## 4. Admin Role Configuration

To grant administrative access to an account:
1. Have the user sign up via the website.
2. In the Supabase Dashboard, go to **Table Editor** > `profiles`.
3. Locate the user row and set the `role` column to `'administrator'`.
4. The user can now access the `/admin` portal.
