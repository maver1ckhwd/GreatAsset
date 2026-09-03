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

/**
 * Retrieve environment variables supporting both Next.js (process.env.NEXT_PUBLIC_*)
 * and Vite (import.meta.env.VITE_*) frameworks.
 */
function getEnvVariable(nextKey: string, viteKey: string): string {
  if (typeof process !== "undefined" && process.env && process.env[nextKey]) {
    return process.env[nextKey] as string;
  }

  try {
    // Vite support fallback
    const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env;
    if (metaEnv && metaEnv[viteKey]) {
      return metaEnv[viteKey];
    }
  } catch {
    // Ignore in environments where import.meta is unavailable
  }

  return "";
}

export const supabaseUrl = getEnvVariable("NEXT_PUBLIC_SUPABASE_URL", "VITE_SUPABASE_URL");
export const supabaseAnonKey = getEnvVariable("NEXT_PUBLIC_SUPABASE_ANON_KEY", "VITE_SUPABASE_ANON_KEY");

// Use a fallback URL structure to ensure createClient doesn't crash on initial build if env vars aren't provided yet.
const effectiveUrl =
  supabaseUrl && supabaseUrl.startsWith("http")
    ? supabaseUrl
    : "https://placeholder-project.supabase.co";

const effectiveAnonKey = supabaseAnonKey || "placeholder-anon-key";

export const supabase = createClient(effectiveUrl, effectiveAnonKey);

export const isSupabaseConfigured = (): boolean => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return false;
  }
  if (
    supabaseUrl.includes("your-actual-project") ||
    supabaseUrl.includes("your-project-ref") ||
    supabaseAnonKey.includes("your-actual-anon-key") ||
    supabaseAnonKey.includes("your-supabase-anon-key") ||
    supabaseUrl.includes("placeholder-project") ||
    supabaseAnonKey === "placeholder-anon-key"
  ) {
    return false;
  }
  return true;
};
