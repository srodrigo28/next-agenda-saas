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

        console.log("AGENDAMENTOS carregados: ", appointments)

        return NextResponse.json({
            ok: true
        })
        
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            error: "Nenhum agendamento"
            }, {
            status: 400 
        })
    }
}