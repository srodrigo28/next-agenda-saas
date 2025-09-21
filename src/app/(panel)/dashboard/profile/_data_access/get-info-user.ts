"use server"
import getSession from '@/lib/getSession'
import prisma from "@/lib/prisma"

interface getUserDateProps{
    userId: string;
}

export async function getUserDate( {userId} : getUserDateProps ){
    const session = await getSession()
    try{

        if(!userId){
            return null;
        }

        const user = await prisma.user.findFirst({
            where: { id: userId },
            include: { subscription: true }
        })

         if(!userId){
            return null;
        }

        // console.log("Achei um usuário: ------------------------------")
        //     console.log(user);
        // console.log("------------------------------------------------")
       
        return user;

    } catch(err){
        console.log(err)
    }
}