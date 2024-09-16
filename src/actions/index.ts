'use server'

import { auth, signIn, signOut } from "@/utils/auth"

export async function handleSocialAuth(formData: FormData) {
    const action = formData.get("action") as string | undefined;
    if (!action) throw new Error("No action provided");

    const result = await signIn(action, { redirectTo: "/dashboard" });
    
    console.log({result});
} 

export async function logOut() {
    await signOut({ redirectTo: "/" });
}


export async function getUser() {
    return await auth()
}

