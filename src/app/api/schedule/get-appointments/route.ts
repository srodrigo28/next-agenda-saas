// meusite.com/api/schedule/get-appointments
// http://localhost:3000/api/schedule/get-appointments
// http://localhost:3000/api/schedule/get-appointments?userId=123&date=10/10/2025

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const userId = searchParams.get('userId')
    const dateParam = searchParams.get('date')

    if (!userId || userId === "null" || !dateParam || dateParam === "null") {
        return NextResponse.json({
            error: "Nenhum agendamento"
            }, {
            status: 400
        })
    }

    try {
        const [year, moth, day] = dateParam.split("-").map(Number)
        const startDate = new Date(year, moth - 1, day, 0, 0, 0)
        const endDate = new Date(year, moth - 1, day, 23, 59, 59)

        const user = await prisma.user.findFirst({
            where: { id: userId }
        })

        if(!user){
            return NextResponse.json({ error: "Nenhum agendamento encontrado"}, {
                status: 400
            })
        }

        const appointments = await prisma.appointment.findMany({
            where: { 
                userId: userId,
                appointmentDate: {
                    gte: startDate,
                    lte: endDate
                }
             },
             include: {
                service: true
             }
        })

        /**
         * Percorrendo serviço e procurando horários
         * Disponíveis
         */
        const blockedSlots = new Set<string>()

        for (const apt of appointments) {
            const requiredSlots = Math.ceil(apt.service.duration / 30)
            const startIndex = user.times.indexOf(apt.time)

            if(startIndex !== -1){
                for (let i = 0; i< requiredSlots; i++){
                    const blockedSlot = user.times[startIndex + i]
                    if(blockedSlots){
                        blockedSlots.add(blockedSlot)
                    }
                }
            }
        }

        const blocketimes = Array.from(blockedSlots)

        console.log("BlockedTimes: ", blocketimes)

        return NextResponse.json(blocketimes)

    } catch (err) {
        console.log(err);
        return NextResponse.json({
            error: "Nenhum agendamento"
            }, {
            status: 400 
        })
    }
}