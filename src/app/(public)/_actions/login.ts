"use server"

import { signIn } from "@/lib/auth"

export async function handleRergister(provider: string) {
    await signIn(provider, { redirectTo: "/dashboard" })
}