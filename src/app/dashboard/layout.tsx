import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard-feature/components/dashboard-sidebar";


export default async function DashboardLayout({
    children
}: {children: React.ReactNode}) {
    return (
            <SidebarProvider defaultOpen={true} className="h-svh">
            <DashboardSidebar/>
            <SidebarInset className="min-h-0 min-w-0">
                <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </SidebarInset>
            </SidebarProvider>
    )
}