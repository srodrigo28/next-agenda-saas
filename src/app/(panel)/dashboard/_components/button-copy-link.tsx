"use client"

import { Button } from "@/components/ui/button"
import { LinkIcon } from "lucide-react"
import { toast } from "sonner"
/** criando link */
export function ButtonCopyLink( {userId} : {userId: string} ){

    async function handleCopyLink(){
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/empresa/${userId}`)
        toast.success("Link copiado com sucesso!")
    }
    return(
        <Button onClick={handleCopyLink}>
            <LinkIcon className="w-5 h-5" />
        </Button>
    )
}