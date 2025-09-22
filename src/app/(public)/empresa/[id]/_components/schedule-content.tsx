"use client"

import Image from "next/image"
import imgTest from "../../../../../../public/doutora-3.jpg"
import { MapIcon } from "lucide-react"

export function ScheduleContent(){
    return(
        <div className="min-h-screen flex flex-col">
           <div className="h-32 bg-emerald-500" />
           <section className="container mx-auto px-4 -mt-20">
                <div className="max-w-3xl mx-auto">
                    <article className="flex flex-col items-center">
                            <div className="relative w-48 h-48 rounded-full 
                            overflow-hidden border-8 border-white">
                                <Image src={imgTest } alt="" fill className="object-cover"/>
                            </div>

                            <h1 className="text-2xl font-semibold mb-2">Empresa Rose Pink</h1>
                            <div className="flex items-center gap-2">
                                <MapIcon className="w-6 h-6" />
                                <span>Endereço: Rua 21 - Setor Universitário - Goiânia</span>
                            </div>  
                    </article>
                </div>
           </section>
        </div>
    )
}