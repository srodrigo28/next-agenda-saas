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

export function DialogService(){
    const form = useDialogServiceForm()

    async function onSubmit(values: DialogServiceFormData) {
        const priceInCents = convertRealToCentes(values.price)
        const hours = parseInt(values.hours) || 0;
        const minutes = parseInt(values.minutes) || 0;

        // Converter as horas e minutos para duração total
        const duration = (hours * 60) + minutes;

        const response = await createNewService({
            name: values.name,
            price: priceInCents,
            duration: duration
        })

        console.log(response)

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
                    <Button type="submit" className="w-full font-semibold text-white">
                            Adicionar serviço
                    </Button>
                </form>
            </Form>
        </>
    )
}