"use client"
/** Convertendo valores
 * 
 * - Valor em centavos = Valor em reais * 100
 * - Valor em reais = Valor em centavos / 100
 */

import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DialogServiceFormData, useDialogServiceForm } from "./dialog-service-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { convertRealToCentes } from "@/utils/format"
import { createNewService } from "../_actions/create-service"
import { updateService } from "../_actions/update-service"
import { toast } from "sonner"
import { useState } from "react"

interface DialogServicePro{
    closeModal: () => void;
    serviceId?: string;
    initialValues?: {
        name: string;
        price: string;
        hours: string;
        minutes: string;
    } 
}

export function DialogService( { 
    closeModal, initialValues, serviceId 
}: DialogServicePro ){
    const form = useDialogServiceForm( 
        {initialValues: initialValues } )
    const [loading, setLoading ] = useState(false)

    async function onSubmit(values: DialogServiceFormData) {
        setLoading(true);
        const priceInCents = convertRealToCentes(values.price)
        const hours = parseInt(values.hours) || 0;
        const minutes = parseInt(values.minutes) || 0;

        // Converter as horas e minutos para duração total
        const duration = (hours * 60) + minutes;

        if(serviceId){
            await editServiceById({
                serviceId: serviceId,
                name: values.name,
                priceInCents: priceInCents,
                duration: duration
            })

            return;
        }

        const response = await createNewService({
            name: values.name,
            price: priceInCents,
            duration: duration
        })

        setLoading(false);

        if(response.error){
            toast.error(response.error)
           
            return
        }else{
            toast.success("Cadastrado com sucesso")
            handCloseModal();
        }
    }

    async function editServiceById(
        { serviceId, name, priceInCents, duration} : 
        { serviceId: string, name: string, priceInCents: number, duration: number}) {

        const response = await updateService({
            servivceId: serviceId,
            name: name,
            price: priceInCents,
            duration: duration
        })

        setLoading(false)

        if(response.error){
            toast.error(response.error)
            return
        }

        toast.success(response.data)
        handCloseModal();
    }

    function handCloseModal(){
        form.reset();
        closeModal();
    }

     function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
        let { value } = event.target;
        value = value.replace(/\D/g, '');

        if(value){
            value = (parseInt(value, 10) / 100).toFixed(2);
            value = value.replace('.', ',');
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        event.target.value = value;
        form.setValue("price", value)
    }


    return(
        <>
            <DialogHeader className="flex flex-col items-center justify-center">
                <DialogTitle>Novo Serviço</DialogTitle>
                <DialogDescription>
                    Adicione um novo serviço
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={ ({field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Nome do serviço:
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Digite o nome do serviço" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="price"
                            render={ ({field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Preço do serviço:
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} 
                                        onChange={changeCurrency}
                                        placeholder="Digite o preço do serviço"
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <p className="font-semibold">Tempo de duração do serviço</p>
                    <div className="grid grid-cols-2 gap-3">
                        <FormField 
                            control={form.control}
                            name="hours"
                            render={ ({field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Horas de serviço:
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            placeholder="1"
                                            min="0"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="minutes"
                            render={ ({field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Minutos de serviço:
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            placeholder="1"
                                            min="0"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full font-semibold text-white"
                    >
                       { loading ? "Carregando..." : `${serviceId ? "Atualizar" : "Cadastrar"}` }
                    </Button>
                </form>
            </Form>
        </>
    )
}