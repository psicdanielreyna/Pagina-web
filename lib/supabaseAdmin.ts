// lib/supabaseAdmin.ts
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!; // server-side only

export const supabaseAdmin = createClient(url, key, {
  auth: { persistSession: false },
});
