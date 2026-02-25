"use client";
 
import Link from "next/link"; 
 
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 bg-white z-10 border-b border-gray-100">
      {/* LEFT - Mobile Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <SidebarTrigger className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-700" />
        </div>
      </div>


    </nav>
  );
};

export default Navbar;