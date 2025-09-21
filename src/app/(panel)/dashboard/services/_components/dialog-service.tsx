"use client"

import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useDialogServiceForm } from "./dialog-service-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DialogService(){
    const form = useDialogServiceForm()

    return(
        <>
            <DialogHeader className="flex flex-col items-center justify-center">
                <DialogTitle>Novo Serviço</DialogTitle>
                <DialogDescription>
                    Adicione um novo serviço
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form className="space-y-2">
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
                                        <Input {...field} placeholder="Digite o preço do serviço" />
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