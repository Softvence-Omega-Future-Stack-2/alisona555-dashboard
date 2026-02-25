"use client";

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Ticket,
  Settings,
  LogOut,
  UserRoundCheck
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Event Management",
    url: "/event",
    icon: CalendarDays,
  },
  {
    title: "User Management",
    url: "/users",
    icon: Users,
  },
  {
    title: "Bookings",
    url: "/bookings",
    icon: Ticket,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="bg-[#101828] border-r-0 text-white w-64">
      {/* Top Graphic / Profile area */}
      <SidebarHeader className="pt-6 pb-2 px-4 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
        <div className="bg-brand-navy-light rounded-xl p-4 flex flex-col items-center justify-center gap-2 mb-4 relative overflow-hidden">
          <div className="w-12 h-12 bg-[#0F1D2F] rounded-full flex items-center justify-center border border-gray-600 relative">
            <Image src="/logo.png" alt="Logo" width={24} height={24} className=" " />
            <span className="absolute -bottom-1 -right-1 bg-white text-black p-0.5 rounded-full z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </span>
          </div>
          <div className="flex items-center gap-3 w-full justify-between mt-2">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Profile" width={32} height={32} className="rounded-full border border-gray-500" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white leading-tight">Arlene McCoy</span>
                <span className="text-[10px] text-[#5CE1E6]">Admin@gmail.com</span>
              </div>
            </div>

            <UserRoundCheck size={16} className="text-white " />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => {
                const isActive = pathname === item.url || (pathname === "/" && item.url === "/dashboard") || (pathname.startsWith("/settings") && item.url === "/settings");
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`h-11 rounded-lg transition-colors px-4 ${isActive
                        ? "bg-white text-[#312C85] hover:bg-white/90 hover:text-[#312C85]"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                      <Link href={item.url} className="flex items-center gap-3" onClick={() => setOpenMobile(false)}>
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium font-inter text-[15px]">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer  */}
      <SidebarFooter className="p-4 mb-4">
        <Link href="/" className="w-full">
          <Button className="w-full bg-brand-gold hover:bg-brand-gold-hover text-white font-semibold text-[15px] h-11 rounded-lg flex items-center gap-2 transition-all">
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;