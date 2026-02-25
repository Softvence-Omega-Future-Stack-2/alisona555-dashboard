import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar"; 

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 w-full min-h-screen overflow-x-hidden  bg-brand-gray">
                {/* We can include Navbar here if needed, or just let pages define their headers */}
                {children}
            </main>
        </SidebarProvider>
    );
}
