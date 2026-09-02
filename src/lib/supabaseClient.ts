import { createClient } from "@supabase/supabase-js";

export interface SignupRecord {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  company_size?: string;
  bottleneck?: string;
  created_at?: string;
}

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

const supabaseUrl = getEnvVariable("NEXT_PUBLIC_SUPABASE_URL", "VITE_SUPABASE_URL");
const supabaseAnonKey = getEnvVariable("NEXT_PUBLIC_SUPABASE_ANON_KEY", "VITE_SUPABASE_ANON_KEY");

// Use a fallback URL structure to ensure createClient doesn't crash on initial build if env vars aren't provided yet.
const effectiveUrl =
  supabaseUrl && supabaseUrl.startsWith("http")
    ? supabaseUrl
    : "https://placeholder-project.supabase.co";

const effectiveAnonKey = supabaseAnonKey || "placeholder-anon-key";

export const supabase = createClient(effectiveUrl, effectiveAnonKey);

export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};
