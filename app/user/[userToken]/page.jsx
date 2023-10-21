
import { UserProfile, UserMail, ContactList } from '@components/index'
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@utils/supabaseServerClient";

export default async function user({params}) {
  const supabase = createServerSupabaseClient();
  const {data: {session}} = await supabase.auth.getSession();

  if(!session) {
    if (!session.access_token.includes(params.userToken)) {
      redirect('/');
    }
  }

  const { data: user } = await supabase.from('userbase').select()

  return (
    <div>
      <div className='flex flex-col md:flex-row gap-4 py-4 px-2'>
        <UserProfile user={user[0]} />

        <UserMail user={user[0]}/>
      </div>
      
      <div className='flex justify-center'>
        <span className='text-xl md:text-2xl py-2 underline'>Contacts</span>
      </div>

      <div className=''>
        <ContactList />
      </div>
    </div>
  );
}
