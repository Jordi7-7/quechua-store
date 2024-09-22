import Image from "next/image";
import Logo from "@/components/logo-kwaski";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {

  const supabase = createClient()
  let { data: user, error } = await supabase
  .from('user')
  .select('*')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-400">
      <Logo className="h-12"/>

      <div>
          {
            JSON.stringify(user,null, 2)
          }
      </div>

    </main>
  );
}
