import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

const formShema = z.object({
    name: z.string().min(3, { message: "O nome serviço é obrigatório" }),
    price: z.string().min(1, { message: "O preço do serviço é obrigatório" }),
    hours: z.string(),
    minutes: z.string()
})

export interface UseDialogServiceFormProps{
    initialValues?: {
        name: string;
        price: string;
        hours: string;
        minutes: string;
    }
}

export type DialogServiceFormData = z.infer<typeof formShema>;
// export type DialogServiceFormData = z.infer<typeof formShema>;

export function useDialogServiceForm( {initialValues}: UseDialogServiceFormProps ){
    return useForm<DialogServiceFormData>({
        resolver:zodResolver(formShema),
        defaultValues: initialValues || {
            name: "",
            price: "",
            hours: "",
            minutes: ""
        }
    })
}