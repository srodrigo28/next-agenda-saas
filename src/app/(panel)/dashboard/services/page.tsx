import  getSession  from "@/lib/getSession"
import { redirect } from "next/navigation"
import { ServiceContent } from "./_components/service-content"

export default async function Services(){

    const session = await getSession()
    
      if (!session) {
        redirect("/")
      }

    return(
        <div>
           <ServiceContent userId={session.user?.id!} />
        </div>
    )
}