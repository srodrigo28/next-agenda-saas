"use client"

import { ProfileFormData, useProfileForm  } from "./profile-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ImageTest from "../../../../../../public/doutora-3.jpg"
import { toast } from 'sonner'
import { formatPhone, extractPhoneNumber } from "@/utils/format"
import { signOut, useSession} from "next-auth/react"
import { useRouter } from "next/navigation"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LogOut, PlusCircle } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

// import { Prisma } from "@prisma/client"
import { Prisma } from "@/generated/prisma" // 
import { updateProfile } from "../_actions/update-profile"

type UseWithSubscription = Prisma.UserGetPayload<{
  include: { subscription: true }
}>

interface ProfileContentProps{
    user: UseWithSubscription;
}

export function ProfileContent( { user } : ProfileContentProps ){
    const router = useRouter();
    const [selectedHours, setSelectedHours] = useState<string[]>( user.times ?? [])
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const { update } = useSession();

    const hours = generateTimeSlots();

    // const form = useProfileForm();
    const form = useProfileForm({
        name: user.name,
        address: user.address,
        phone: user.phone,
        status: user.status,
        timeZone: user.timeZone
    })

    const timeZone = Intl.supportedValuesOf("timeZone").filter((zone) =>
        zone.startsWith("America/Sao_Paulo") ||
        zone.startsWith("America/Fortaleza") ||
        zone.startsWith("America/Recife") ||
        zone.startsWith("America/Bahia") ||
        zone.startsWith("America/Manaus") ||
        zone.startsWith("America/Cuiaba") ||
        zone.startsWith("America/Boa_Vista")
    );

    function toggleHour(hour: string) {
        setSelectedHours((prev) => prev.includes(hour) 
        ? prev.filter(h => h !== hour) 
        : [...prev, hour].sort())
    }

    function generateTimeSlots(): string[] {
        const hours: string[] = []

        /** Trazendo somente horas exemplo 08:00  */
            for(let i=8; i<=24; i++){
                const hour = i.toString().padStart(2, "0")
                hours.push(`${hour}:00`)
            }
       

        /** Trazendo horas e meia exemplo 08:00 e 08:30 
           for (let i = 8; i < 24; i++) {
            for (let j = 0; j < 2; j++) {
                const hour = i.toString().padStart(2, "0")
                const minute = (j * 30).toString().padStart(2, "0")
                hours.push(`${hour}:${minute}`)
            }
        }
        */
       
        return hours
    }

    async function onSubmit(values: ProfileFormData){
        /**  teste
        const profileData = {
            ...values,
            times: selectedHours
        }
        console.log(profileData);
        */

        // se quiser salvar sem caracteres
        const extractValue = extractPhoneNumber(values.phone || "")

        const response = await updateProfile({
            name: values.name,
            address: values.address,
            status: values.status === 'active',
            timeZone: values.timeZone,
            times: selectedHours || [],
            phone: values.phone 
        })
        //ERROR
        if(response.error){
            toast.error(response.error)
            return;
        }
        //SUCESSO
        toast.success(response.data)
    }

    async function handleLogout(){
        await signOut();
        await update();
        router.replace("/")
    }

    return(
        <div className="mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Meu Perfil</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex justify-center">
                                <div className=" bg-gray-200 relative w-40 h-40 overflow-hidden rounded-full">
                                    <Image src={ user.image ? user.image : ImageTest } alt="" fill className="object-cover"  />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome completo</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Digite seu nome completo" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Endereço completo:</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Digite seu endereço completo" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Telefone</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field} 
                                                    placeholder="(62) 9 0000-0000" 
                                                    onChange={ (e) => {
                                                        const formattedValue = formatPhone(e.target.value)
                                                        field.onChange(formattedValue)
                                                    }}
                                            />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Status da Empresa
                                            </FormLabel>
                                            <FormControl>
                                            <Select 
                                                    onValueChange={field.onChange} 
                                                    defaultValue={field.value ? "active" : "inactive"}
                                                >
                                                <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o status da empresa" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="active">Ativo (empresa aberta)</SelectItem>
                                                        <SelectItem value="inactive">Inativo (empresa fechada)</SelectItem>
                                                    </SelectContent>
                                            </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-2">
                                    <Label className="font-semibold">
                                        Configurar Horários de funcionamento
                                    </Label>

                                    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                                        <DialogTrigger asChild>
                                            <Button className="w-full md:gap-6 items-center justify-center bg-blue-300 hover:bg-blue-400 duration-200 cursor-pointer">
                                                <span>Configurar horários disponiveis</span>
                                                <PlusCircle />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Horários da empresa</DialogTitle>
                                                    <DialogDescription>
                                                        Selecione horários para o funcionamento da empresa
                                                    </DialogDescription>
                                            </DialogHeader>
                                            <section className="py-4">
                                                <p className="mb-2 text-sm text-muted-foreground">
                                                    Clique para selecionar os horários
                                                </p>
                                                <div className="grid grid-cols-5 gap-2">
                                                    {hours.map((hour) => (
                                                        <Button 
                                                            key={hour}
                                                            variant="outline"
                                                            onClick={ () => toggleHour(hour)}
                                                            className={cn(
                                                                'border-2 border-green-500 cursor-pointer', 
                                                                selectedHours.includes(hour) && 'bg-green-500' 
                                                            )}
                                                        >
                                                            {hour}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </section>
                                            <Button className="w-full" onClick={ () => setDialogIsOpen(false)}>
                                                    Gravar e fechar
                                            </Button>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="timeZone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Selecione o fuso-horário
                                            </FormLabel>
                                            <FormControl>
                                            <Select 
                                                    onValueChange={field.onChange} 
                                                    defaultValue={field.value}
                                                >
                                                <SelectTrigger>
                                                        <SelectValue placeholder=" Selecione o fuso-horário" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {timeZone.map( (zone) => (
                                                            <SelectItem key={zone} value={zone}> {zone}  </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                            </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full bg-blue-500 hover:bg-blue-400"

                                >Salvar alterações</Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>

            <section className="mt-3">
                <Button variant="destructive" onClick={handleLogout} className="cursor-pointer">
                    <LogOut />
                    Sair da Conta
                </Button>
            </section>
        </div>
    )
}