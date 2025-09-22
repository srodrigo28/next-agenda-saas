"use client"

import { useState } from "react"
import {
    Dialog, DialogContent, DialogTrigger
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Plus, X } from "lucide-react"
import { DialogService } from "./dialog-service"
import { Service } from "@/generated/prisma"
import { formatCurrency } from "@/utils/format"
import { deleteservice } from "../_actions/delete-service"
import { toast } from "sonner"
// import { useRouter } from 'next/navigation'

interface ServiceListProps{
    services: Service[]
}

export function ServicesList( { services }: ServiceListProps ){
    // const router = useRouter()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingService, setEditingService] = useState<null | Service>(null)

    // console.log('Iniciando a lista -----------------------------------')
    //     console.log(services)
    // console.log('Fim a lista -----------------------------------')

    async function handleDeleteService(serviceId: string){
        const response = await deleteservice({serviceId: serviceId})

        if(response.error){
            toast.error(response.error)
            return
        }

        toast.success(response.data)
    }

    function handleEditService(service: Service){
        setEditingService(service)
        console.log(service);
        setIsDialogOpen(true);
    }

    return(
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
           <section className="mx-auto">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl md:text-2xl font-semibold">Serviços</CardTitle>
                        <DialogTrigger>
                            <Button
                            
                             className="bg-green-500 cursor-pointer hover:bg-green-400"><Plus className="w-4 h-4" /></Button>
                        </DialogTrigger>
                        {/* Alterar a possião de abrir o modal */}
                        <DialogContent  onInteractOutside={ (e) => {
                            e.preventDefault();
                            setIsDialogOpen(false);
                            setEditingService(null);
                         }}
                            className="top-14 translate-y-0">
                            <DialogService
                                closeModal={ () => {
                                    setIsDialogOpen(false);
                                    setEditingService(null);
                                }}
                                serviceId={editingService ? editingService.id : undefined}
                                initialValues={ editingService ? {
                                    name: editingService.name,
                                    price: (editingService.price /100).toFixed(2).replace(".", ","),
                                    hours: Math.floor(editingService.duration / 60).toString(),
                                    minutes: (editingService.duration % 60).toString(),
                                } : undefined }
                            />
                        </DialogContent>
                    </CardHeader>
                    <CardContent className="h-[75vh]">
                        <section className="space-y-4 h-[98%] overflow-y-scroll pr-2">
                                {services.map( service => (
                                    <article key={service.id}>
                                        <div className="flex items-center space-x-2 border-b-2 pb-3">
                                            <div className="font-medium flex-1">
                                                <div className="flex flex-col">
                                                    <span className="text-1xl">{service.name}</span>
                                                    <span className="font-md">
                                                        {formatCurrency((service.price / 100))}
                                                    </span>
                                                </div>
                                            </div>
                                                <div className="flex gap-2">
                                                    <button className="cursor-pointer text-red-500 hover:rotate-90 duration-200">
                                                        <X onClick={ () => handleDeleteService(service.id) } 
                                                    /></button>
                                                    <button className="cursor-pointer text-yellow-600 hover:rotate-12 duration-200">
                                                        <Edit2 
                                                        onClick={ () => handleEditService(service) }
                                                    /></button>
                                                </div>
                                        </div>
                                    </article>
                                ))}
                        </section>
                    </CardContent>
                </Card>
           </section>
        </Dialog>
    )
}