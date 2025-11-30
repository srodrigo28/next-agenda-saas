"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reminder } from "@/generated/prisma";
import { Plus, Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deleteReminder } from '../../_actions/delete-reminder';
import { toast } from 'sonner'
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';

interface ReminderListProps {
  reminder: Reminder[]
}

export function ReminderList({ reminder }: ReminderListProps) {
    const router = useRouter();
    async function handleDeleteReminder(id: string) {
        const response = await deleteReminder(
            { reminderId: id }
        );
        if(response.error) {
            toast.error(response.error);
            return;
        }
        toast.success("Lembrete deletado com sucesso.");
        router.refresh();
    }

    return (
    <div className="flex flex-col gap-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y0 pb-2">
                <CardTitle className="text-xl md:text-2xl font-bold">
                    Lembretes +
                </CardTitle>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant='ghost' className="w-9 p-0 border-2 border-violet-200 mr-1 hover:cursor-pointer">
                            <Plus className="w-5 h-5" />
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Novo Lembrate</DialogTitle>
                            <DialogDescription>Criar novo lembrete para sua lista.</DialogDescription>
                        </DialogHeader>
                        <div>
                            Contente 123
                        </div>
                    </DialogContent>
                </Dialog>

            </CardHeader>
            <CardContent>
                {reminder.length === 0 && (
                    <p className="text-center text-green-300 p-3">
                        Nenhum lembrete encontrado.
                    </p>
                )}
                <ScrollArea className="h-[340px] 
                lg:max-h-[calc(100vh-15rem)] pr-0 w-full flex-1">
                    {reminder.map((item) => (  
                        <article key={item.id}
                            className="flex flex-wrap flex-row items-center justify-between 
                            py-2 bg-violet-100 mb-2 px-2 rounded-md"
                        >
                            <p className="pl-2 lg:text-base font-medium">{item.description}</p>
                            <Button onClick={ () => handleDeleteReminder(item.id)} 
                                className="bg-red-400 transition-all hover:bg-red-500 rounded-full p-2 cursor-pointer" size='sm'> 
                                <Trash className="w-4 h-4 text-white" />
                            </Button>
                        </article>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    </div>
  )
}    