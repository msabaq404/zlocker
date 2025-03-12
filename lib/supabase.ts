import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xpxdoaggoqigdzsxgesi.supabase.co";
const supabaseAnonKey =   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhweGRvYWdnb3FpZ2R6c3hnZXNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4ODAxOTEsImV4cCI6MjA1NTQ1NjE5MX0.oElzNaKQn4KWsrlgDzPmSUFnSI4waIOLs4HuQQsZe48";


const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
