"use client"
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const reminderSchema = z.object({
    description: z.string().min(1, '')
})

export type ReminderFormdata = z.infer<typeof reminderSchema>