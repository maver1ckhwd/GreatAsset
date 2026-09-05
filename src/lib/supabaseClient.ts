import { createClient } from "@supabase/supabase-js";

export interface DiagnosticSignupRecord {
  id?: string;
  full_name: string;
  work_email: string;
  phone_number?: string;
  company_name?: string;
  company_size?: string;
  primary_bottleneck?: string;
  message?: string;
  created_at?: string;
}

export type SignupRecord = DiagnosticSignupRecord;

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Use fallback URL to ensure createClient doesn't crash during initial compilation if env vars are undefined
const effectiveUrl =
  supabaseUrl && supabaseUrl.startsWith("http")
    ? supabaseUrl
    : "https://placeholder-project.supabase.co";

const effectiveAnonKey = supabaseAnonKey || "placeholder-anon-key";

export const supabase = createClient(effectiveUrl, effectiveAnonKey);

export const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return false;
  }
  if (
    url.includes("your-actual-project") ||
    url.includes("your-project-ref") ||
    key.includes("your-actual-anon-key") ||
    key.includes("your-supabase-anon-key") ||
    url.includes("placeholder-project") ||
    key === "placeholder-anon-key"
  ) {
    return false;
  }
  return true;
};
