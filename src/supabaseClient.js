import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fqyfphnebclfswfrhhzv.supabase.co";
const supabaseAnonKey = "sb_publishable_LIAijkyesxEgaLLdkCR02g_Ucc1PoUo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);