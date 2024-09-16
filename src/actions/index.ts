'use server'

import { signIn } from "@/utils/auth"

export async function handleSocialAuth(formData:any) {

    const action = formData.get("action")

    console.log({action})

    const result = await signIn(action, { redirectTo: "/dashboard" })
    
    console.log({result})
    
} 

export async function logOut() {
    
}