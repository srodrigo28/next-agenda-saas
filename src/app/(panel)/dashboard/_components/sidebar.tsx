"use client"

import clsx from "clsx"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { List } from "lucide-react"
export function SidebarDashboard( { children } : { children?: React.ReactNode } ) {
    const usePathnames = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(true)
   
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
    
                    <SheetContent side="right" className="sm:max-w-xs text-black">
                        <SheetTitle className="mt-3">PlanPro</SheetTitle>
                        <SheetDescription>
                            Menu PlanoPro
                        </SheetDescription>
                        <nav>
                            <p>Teste</p>
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