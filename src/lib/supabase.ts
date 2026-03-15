import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xjvybocakttbfwbmpfni.supabase.co";
const supabaseKey = "sb_publishable_-ms17v44J88Gc9m2bb-mDw_RZkDKhcY";

export const supabase = createClient(supabaseUrl, supabaseKey);