import getSession from '@/lib/getSession'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Dashboard(){
    const session = await getSession()

    console.log(session?.user)

    if(!session){
        redirect("/")
    }

    return(
        <div className="pr-11">
            <h1 className="text-3xl font-semibold"> Dashboard </h1>
            <p>{session.user?.name} {session.user?.email}</p>
            <p>{session.user.image}</p>

        </div>
    )
}