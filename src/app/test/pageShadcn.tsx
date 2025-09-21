"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

/** Desafio Criar uma Lista de horários
 * Que seja clicavel com seleção marcar ativo e inativo. 
 */
export default function Test(){
     const [selectedHours, setSelectedHours] = useState<string[]>([])

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
        
        /** ERRO Trazendo horas e meia exemplo 08:00 e 08:30  
         for(let i=8; i<=24; i++){
            for(let j = 0; j < 2; j++) {
                const hour = i.toString().padStart(2, "0")
                const minute = (j*30).toString().padStart(2, "0")
                hours.push(`${hour}:00`)
            }
        }
        */
       
        return hours
    }

    const hours = generateTimeSlots();
    // console.log(hours)

    return(
        <div>
            <div className="px-10 bg-amber-200 flex items-center justify-center">
                 <section className="py-4">
                <p className="mb-6 text-3xl font-bold">
                   Selecionar os horários
                </p>
                <div className="grid grid-cols-5 gap-2 md:w-96 pb-3">
                    {hours.map((hour) => (
                        <button  
                            key={hour}
                            onClick={ () => toggleHour(hour)}
                              className={cn(
                                'border-2 border-green-500 cursor-pointer rounded-sm px-3 md:w-16', 
                                selectedHours.includes(hour) && 'bg-green-500' 
                            )}
                        >
                            {hour}
                        </button>
                    ))}
                </div>
                <button className="rounded pt-6-m w-full md:w-96 font-bold bg-green-600 text-white p-2 px-3">Concluir</button>
            </section>
            </div>
        </div>
    )
}