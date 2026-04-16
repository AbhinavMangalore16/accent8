import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard-feature/components/dashboard-sidebar";
import { cookies } from "next/headers";


export default async function DashboardLayout({
    children
}: {children: React.ReactNode}) {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar-open")?.value === "true";
    return (
        <div>
            <SidebarProvider defaultOpen={true} className="h-svh">
            <DashboardSidebar/>
            <SidebarInset className="min-h-0 min-w-0">
                <main className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-8">
                    {children}
                </main>
            </SidebarInset>
            </SidebarProvider>
        </div>
    )
}