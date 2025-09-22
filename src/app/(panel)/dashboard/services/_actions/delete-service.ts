"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const formSchme = z.object({
    serviceId: z.string().min(1, "O Id do serviço é obrigatório")
})

type FromSchema = z.infer<typeof formSchme>

export async function  deleteservice(formData: FromSchema){
    const session = await auth();

    if(!session?.user?.id){
        return{
            error: "Falha ao deletar serviço"
        }
    }

    const schema = formSchme.safeParse(formData);

    if(!schema.success){
        return{
            error: schema.error.issues[0].message
        }
    }

    try{
        await prisma.service.update({
            where: { 
                id: formData.serviceId, 
                userId: session?.user?.id,
            },
            data: {
                status: false
            }
        })

        revalidatePath("/dashboard/services")

        return{
            data: "Serviço deletado com sucesso"
        }

    }catch(err){
        console.log(err)
        return{
            error: "Falha ao deletar serviço"
        }
    }
}
