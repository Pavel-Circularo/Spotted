import { createClient } from "@supabase/supabase-js";
import useAuthUser from "@/composables/UseAuthUser.js";

const supabaseUrl = "https://izptjbyyibydlsfuaujz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6cHRqYnl5aWJ5ZGxzZnVhdWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyOTYxMjgsImV4cCI6MTk4ODg3MjEyOH0.-SyzrjRctkoUMdW4jwFSCd07ACAU-_vt1mQ5pWLM2R8";

const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  // the "event" is a string indicating what trigger the state change (ie. SIGN_IN, SIGN_OUT, etc)
  // the session contains info about the current session most importanly the user dat
  const { user } = useAuthUser();

  // if the user exists in the session we're logged in
  // and we can set our user reactive ref
  user.value = session?.user || null;
});

export default function useSupabase() {
  return { supabase };
}
