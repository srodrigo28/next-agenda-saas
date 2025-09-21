import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface UseProfileFormProps{
    name: string | null;
    address: string | null;
    phone: string | null;
    status: boolean;
    timeZone: string | null;
}

const profileShema = z.object({
    name: z.string().min(3, { message: "O nome é obrigatório "}),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.string(),
    timeZone: z.string().min(1, {message: "O time zone é obrigatório"})
})

export type ProfileFormData = z.infer<typeof profileShema>;

export function useProfileForm( {name, address, phone, status, timeZone} : UseProfileFormProps ){
    return useForm<ProfileFormData>({
        resolver: zodResolver(profileShema),
        defaultValues:{
            name: name || "",
            address: address || "",
            phone: phone || "",
            status: status ? "activo" : "inactive",
            timeZone: timeZone || ""
        }
    })
}