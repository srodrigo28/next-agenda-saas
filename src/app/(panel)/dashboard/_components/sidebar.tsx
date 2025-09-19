"use client"

import clsx from "clsx"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Banknote, CalendarCheck2, Folder, List, Settings } from "lucide-react"
import Link from "next/link"
export function SidebarDashboard( { children } : { children?: React.ReactNode } ) {
    const pathame = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)
   
    return(
        <div className="flex min-h-screen w-full">
            <div className={clsx("flex flex-1 flex-col transition-all duration-300", {
                "md:ml-20": isCollapsed,
                "ml-64": !isCollapsed
            })}>      
            <header className=" bg-white md:hidden flex items-center justify-between border-b 
                px-2 md:px-6 h-14 z-10 sticky top-0">
                <Sheet>
                    <div className="flex items-center gap-4">
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <List className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <h1 className="text-base md:text-lg font-semibold">
                            Menu PlanoPRO
                        </h1>
                    </div>
    
                    <SheetContent side="right" className="sm:max-w-xs text-black px-5">
                        <SheetTitle className="mt-3">PlanPro</SheetTitle>
                        <SheetDescription>
                            Menu PlanoPro
                        </SheetDescription>
                        <nav className="grid gap-2 text-base pt-5">
                            <SidebarLink
                                href="/dashboard"
                                label="Agendamentos"
                                pathname={pathame}
                                isColapsed={isCollapsed}
                                icon={<CalendarCheck2 className="w-6 h-6" />}
                            />
                            <SidebarLink
                                href="/dashboard/services"
                                label="Serviços"
                                pathname={pathame}
                                isColapsed={isCollapsed}
                                icon={<Folder className="w-6 h-6"/>}
                            />

                            <hr className="bg-gray-700 border-2" />

                            <SidebarLink
                                href="/dashboard/profile"
                                label="Meu Perfil"
                                pathname={pathame}
                                isColapsed={isCollapsed}
                                icon={<Settings  className="w-6 h-6"/>}
                            />

                            <SidebarLink
                                href="/dashboard/plans"
                                label="Planos"
                                pathname={pathame}
                                isColapsed={isCollapsed}
                                icon={<Banknote  className="w-6 h-6"/>}
                            />
                        </nav>
                    </SheetContent>
                </Sheet>
            </header>
            <main className="flex-1 py-4 px-2 md:p-6">
                {children}
            </main>
            </div>
        </div>
    )
}

interface SidebarLinkProps {
    href: string
    icon: React.ReactNode
    label: string
    pathname: string
    isColapsed: boolean
}

function SidebarLink( { href, icon, isColapsed, label, pathname } : SidebarLinkProps ) {
    return(
        <Link href={href}>
            <div className={clsx("flex items-center gap-2 py-2 rounded-md transition-colors duration-200", {
                "text-white font-semibold bg-blue-500" : pathname === href,
                "text-gray-500 hover:bg-blue-300" : pathname !== href,
            })}>
                <span className="w-6 h-6 pl-3">{icon}</span>
                { !isColapsed && <span className="pl-3">{label}</span> }
            </div>
        </Link>
    )
}