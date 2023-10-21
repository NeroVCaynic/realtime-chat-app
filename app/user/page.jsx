

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@utils/supabaseServerClient";

export default async function User() {
  const supabase = createServerSupabaseClient();
  const {data: {session}} = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  else {
    redirect(`user/${session.access_token.substring(0, 20)}`);
  }
}
