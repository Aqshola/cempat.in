import { createClient } from "@supabase/supabase-js";



let SUPA_URL= process.env.REACT_APP_SUPABASE_URL
let SUPA_KEY= process.env.REACT_APP_SUPABASE_KEY

const supabase = createClient(
  SUPA_URL || "",
  SUPA_KEY || ""
);

export default supabase;