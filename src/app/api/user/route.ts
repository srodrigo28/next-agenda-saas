// meusite.com/api/schedule/get-appointments
// http://localhost:3000/api/user

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {

    return NextResponse.json({
        nome: "Mario",
        idade: 29,
        cidade: "Goiânia",
        status: true
    })
}