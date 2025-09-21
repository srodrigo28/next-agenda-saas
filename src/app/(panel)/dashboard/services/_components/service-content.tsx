import { getAllServices } from "../_data-access/get-all-services";

interface ServicesContentProps{
    userId: string;
}

export async function ServiceContent( { userId} : ServicesContentProps){
    const services = await getAllServices({ userId })

    console.log(services)
    return(
        <div>
            <h1>TODOS OS MEUS SERVIÇOS</h1>
            <p>User ID: {userId}</p>
        </div>
    )
}