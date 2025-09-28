"use client"

import Image from "next/image"
import imgTest from "../../../../../../public/doutora-3.jpg"
import { MapIcon } from "lucide-react"
import { Prisma } from "@/generated/prisma"
import { useAppointmentForm, AppointmentFormData } from "./../_components/schedule-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatPhone } from "@/utils/format"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DateTimePicker } from "./date-picker"
import { useState, useCallback, useEffect } from "react"
import { ScheduleTimeList } from "./schedule-time-list"
import { createNewAPpointment } from "../_actions/create-appointment"
import { toast } from "sonner"

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true,
        services: true
    }
}>

interface ScheduleContentProps {
    empresa: UserWithServiceAndSubscription
}

export interface TimeSloat {
    time: string;
    available: boolean;
}

export function ScheduleContent({ empresa }: ScheduleContentProps) {

    const form = useAppointmentForm();
    const { watch } = form;
    const selectedData = watch("date")
    const selectedServiceId = watch("serviceId")

    const [selectedTime, setSelectedTime] = useState("")
    const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSloat[]>([]);
    const [loadingSloats, setLoadingSlots] = useState(false);

    // Quais os horários bloqueados
    const [blockedTimes, setBlockedTimes] = useState<string[]>([])

    // Função que busca os horários bloqueados (via Fetch HTTP)

    const fetchBlockedTimes = useCallback(async (date: Date): Promise<string[]> => {
        setLoadingSlots(true);
        try {
            const dateString = date.toISOString().split("T")[0]
            console.log(dateString)
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${empresa.id}&date=${dateString}`)

            const json = await response.json();
            setLoadingSlots(false);

            return json;

        } catch (err) {
            console.log(err)
            setLoadingSlots(false);
            return [];
        }
    }, [empresa.id])

    useEffect(() => {

        if (selectedData) {
            fetchBlockedTimes(selectedData).then((blocked) => {
                setBlockedTimes(blocked)

                const times = empresa.times || [];

                const finalSloats = times.map((time) => ({
                    time: time,
                    available: !blocked.includes(time)
                }))

                setAvailableTimeSlots(finalSloats)
            })
        }

    }, [selectedData, empresa.times, fetchBlockedTimes, selectedTime])

    async function handleRegisterAppointmnent(formData: AppointmentFormData) {
        if(!selectedTime){
            return;
        }

        const response = await createNewAPpointment({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            time: selectedTime,
            date: formData.date,
            serviceId: formData.serviceId,
            empresaId: empresa.id
        })

        if(response!.error){
            toast.error(response!.error)
            return;
        }

        toast.success("Consulta agendada com sucesso!")
        form.reset();
        setSelectedTime("");
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-32 bg-emerald-500" />
            <section className="container mx-auto px-4 -mt-20">
                <div className="max-w-3xl mx-auto">
                    <article className="flex flex-col items-center">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-8 border-white">
                            <Image src={empresa.image ? empresa.image : imgTest} alt="" fill className="object-cover" />
                        </div>

                        <h1 className="text-2xl font-semibold mb-2">
                            {empresa.name}
                        </h1>
                        <div className="flex items-center gap-2">
                            <MapIcon className="w-6 h-6" />
                            <span>
                                {empresa.address ? empresa.address : "Setor Universitário - Goiânia"}
                            </span>
                        </div>

                    </article>
                </div>
            </section>

            <div className="max-w-2xl mx-auto mt-5 w-full">
                {/* Formulario de agendamento */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleRegisterAppointmnent)} className="mx-5 h-[22rem] pt-3 scroll-py-6 bg-white p-6 border rounded-md shadow-sm">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Nome completo:</FormLabel>
                                    <FormControl>
                                        <Input id="name"
                                            placeholder="Digite seu nome"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">E-mail:</FormLabel>
                                    <FormControl>
                                        <Input id="email"
                                            placeholder="Digite seu e-mail"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Telefone:</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="phone"
                                            placeholder="Digite seu telefone"
                                            onChange={(e) => {
                                                const formattedValue = formatPhone(e.target.value)
                                                field.onChange(formattedValue)
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="grid gap-3 grid-cols-2 w-full">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="my-2">
                                        <FormLabel className="font-semibold">Agendamento:</FormLabel>
                                        <FormControl>
                                            <DateTimePicker
                                                initialDate={new Date()}
                                                className="w-full rounded border p-1"
                                                onChange={(date) => {
                                                    if (date) {
                                                        field.onChange(date)
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="serviceId"
                                render={({ field }) => (
                                    <FormItem className="my-2">
                                        <FormLabel className="font-semibold">Selecione o serviço:</FormLabel>
                                        <FormControl >
                                            <Select onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="selecione um serviço" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {empresa.services.map((service) => (
                                                        <SelectItem key={service.id}
                                                            value={service.id}
                                                        >
                                                            {service.name} - {Math.floor(service.duration / 60)}h {service.duration % 60}min
                                                        </SelectItem>
                                                    ))

                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {selectedServiceId && (
                            <div className="space-y-2">
                                <Label className="font-semibold">Horários disponíveis: </Label>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    {loadingSloats ? (
                                        <p>Carregando horários...</p>
                                    ) : availableTimeSlots.length === 0 ? (
                                        <> Nenhum horário</>
                                    ) : (
                                        <ScheduleTimeList
                                            onSelecTime={ (time) => setSelectedTime(time) }
                                            empresaTimes={empresa.times}
                                            blockedTimes={blockedTimes}
                                            availableTimeSlots={availableTimeSlots}
                                            selectedTime={selectedTime}
                                            selectedDate={selectedData}
                                            requiredSlots={
                                                empresa.services.find(service => service.id === selectedServiceId) 
                                                    ? Math.ceil(empresa.services.find(service =>
                                                    service.id === selectedServiceId) !
                                                    .duration / 30) : 1
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                        {!empresa.status ? (
                            <Button
                                disabled={!form.watch("name") || !form.watch("email") || !form.watch("phone") || !form.watch("date")}
                                className="w-full bg-emerald-500 hover:bg-emerald-400"
                            >
                                Realizar agendamento
                            </Button>
                        ) : (
                            <p className="p-2 px-3 bg-red-400 rounded-md text-center text-white font-semibold">Fechado no momento</p>
                        )

                        }
                    </form>
                </Form>
            </div>
        </div>
    )
}