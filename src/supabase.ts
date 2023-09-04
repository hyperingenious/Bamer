import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zcazbnhvugxlayqfoecm.supabase.co";
export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjYXpibmh2dWd4bGF5cWZvZWNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzYxNzU4MywiZXhwIjoyMDA5MTkzNTgzfQ.anbQFqaFeQp1TAZaXnBRvDpJO7Ypma4DdZhEkTyfbq4";
export const supabase = createClient(supabaseUrl, supabaseKey);
