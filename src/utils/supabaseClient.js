import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qbzwydkwervovqojspyx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiend5ZGt3ZXJ2b3Zxb2pzcHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM1MjI5ODYsImV4cCI6MTk5OTA5ODk4Nn0.f6Raj9UT4KUP2autC1e_G3ZUutP17mEBoXOO7KULF78";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
