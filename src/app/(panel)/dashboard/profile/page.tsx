import { redirect } from 'next/navigation'
import getSession from '@/lib/getSession'
import { getUserDate } from './_data_access/get-info-user'
import { ProfileContent } from './_components/profile'

export default async function Profile() {
        const session = await getSession()
        // console.log(session?.user)
    
        if(!session){
            redirect("/")
        }

        const user = await getUserDate({ userId: session.user?.id })

    return (
        <ProfileContent />
    )
}