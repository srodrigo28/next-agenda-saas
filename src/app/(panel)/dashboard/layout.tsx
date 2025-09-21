import { SidebarDashboard } from "./_components/sidebar"

export default function DashboardLayout({
    children
 } : { children: React.ReactNode 
}) {
    return (
        <div className="min-h-screen w-screen relative">
            <SidebarDashboard>
                {children}
            </SidebarDashboard>
        </div>
    )
}