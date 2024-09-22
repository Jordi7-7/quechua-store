
'use server'
import { createClient } from "@/utils/supabase/server";
import { SignOutButtonClient } from "./sign-out-button-client";


export async function SignOutButtonServer() {
    const supabase = createClient()
    const {data :{session}} = await supabase.auth.getSession()

    return <SignOutButtonClient session={session} />

}