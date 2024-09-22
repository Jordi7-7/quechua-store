'use client'
import { createClient } from "@/utils/supabase/client"
import type { Session } from '@supabase/auth-js/src/lib/types'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function SignOutButtonClient({session}:{session: Session | null}) {
    const supabase = createClient()
    const router = useRouter()


    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut({ scope: "local" });
        console.log(error)
        router.refresh()
    } 

    return (
        <>
            {session ? (
                <button className="bg-black text-white px-6 py-2 rounded-full" onClick={handleSignOut}>
                    Cerrar Sesión
                </button>)
                :
                (<></>)
            }
        </>
    )
}