"use client"
import { Button } from '@/components/ui/button'
import { Reminder } from '../../../../../generated/prisma'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import { Plus } from 'lucide-react'
interface ReminderListProps {
    reminder: Reminder[]
}

export function ReminderList( { reminder } : ReminderListProps ){
    return(
        <div className='flex flex-col gap-3'>
            <Card>
                <CardHeader className='flex justify-between'>
                    <CardTitle>Lembretes</CardTitle>
                    <Button className='hover:bg-green-500 transition-all cursor-pointer'>
                        <Plus className='w-5 h-5' /> 
                    </Button>
                </CardHeader>
                <CardContent>
                    {reminder.length === 0 && (
                        <p>Nenhum lembrete encontrado.</p>
                    )}
                    {reminder.map((item) => (
                        <div key={item.id} className='p-2 border-b last:border-0'>
                            <h3 className='font-medium'>{item.description}</h3>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}