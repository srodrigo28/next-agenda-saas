"use client"

import { useState } from "react"
import {
    Dialog, DialogContent, DialogTrigger
} from "@/components/ui/dialog"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DialogService } from "./dialog-service"

export function ServicesList(){
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return(
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
           <section className="mx-auto">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl md:text-2xl font-semibold">Serviços</CardTitle>
                        <DialogTrigger>
                            <Button><Plus className="w-4 h-4" /></Button>
                        </DialogTrigger>
                        {/* Alterar a possião de abrir o modal */}
                        <DialogContent  className="top-14 translate-y-0">
                            <DialogService />
                        </DialogContent>
                    </CardHeader>
                </Card>
           </section>
        </Dialog>
    )
}