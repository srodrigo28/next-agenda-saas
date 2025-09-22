"use server"

import { z } from "zod"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

const formSchema = z.object({
    servivceId: z.string().min(1, "O id do serviço é obrigatório"),
    name: z.string().min(1, { message: "O nome do serviço é obrigatório"}),
    price: z.number().min(1, { message: "O preço do serviço é obrigatório"}),
    duration: z.number(),
})

type FromSchema = z.infer<typeof formSchema>

export async function updateService(formData: FromSchema){
    const session = await auth();

    if(!session?.user?.id){
        return{
            error: "Falha ao atualizar serviço"
        }
    }

    const schema = formSchema.safeParse(formData);

    if(!schema.success){
        return{
            error: schema.error.issues[0].message
        }
    }

    try{
        const service = await prisma.service.update({
            where: { 
                id: formData.servivceId, 
                userId: session?.user?.id, 
            },
            data: {
                name: formData.name,
                price: formData.price,
                duration: formData.duration < 30 ? 30 : formData.duration
            }
        })

        revalidatePath("/dashboard/services")

        return{
            data: "Serviço atualizado com sucesso"
        }

    }catch(err){
        console.log(err);
        return{
            error: "Falha ao atualizar serviço"
        }
    }
}