"use client";

import { UserCircle, Shield, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Basic routing logic for tabs
    const isProfileActive = pathname === "/settings" || pathname === "/settings/profile";
    const isSecurityActive = pathname === "/settings/security";
    const isNotificationActive = pathname === "/settings/notifications";

    return (
        <div>
            {/* Header */}
            <div className="bg-white p-6 md:p-8">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h1>
                <p className="text-gray-500 text-sm mt-1">Manage your platform efficiently</p>
            </div>
            <div className="flex flex-col gap-6 w-full   mx-auto p-6 md:p-8">


                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-125">

                    {/* Top Navigation Tabs */}
                    <div className="flex flex-wrap gap-2 sm:gap-4 mb-8">
                        <Link
                            href="/settings/profile"
                            className={`px-4 sm:px-6 h-11 flex items-center justify-center gap-2 rounded-lg font-medium text-sm transition-colors border ${isProfileActive
                                ? "bg-brand-navy border-brand-navy text-white"
                                : "bg-white border-black text-black hover:bg-gray-50"
                                }`}
                        >
                            <UserCircle size={18} className={isProfileActive ? "text-white" : "text-black"} />
                            Profile Settings
                        </Link>

                        <Link
                            href="/settings/security"
                            className={`px-4 sm:px-6 h-11 flex items-center justify-center gap-2 rounded-lg font-medium text-sm transition-colors border ${isSecurityActive
                                ? "bg-brand-navy border-brand-navy text-white"
                                : "bg-white border-black text-black hover:bg-gray-50"
                                }`}
                        >
                            <Shield size={18} className={isSecurityActive ? "text-white" : "text-black"} />
                            Security Settings
                        </Link>

                        <Link
                            href="/settings/notifications"
                            className={`px-4 sm:px-6 h-11 flex items-center justify-center gap-2 rounded-lg font-medium text-sm transition-colors border ${isNotificationActive
                                ? "bg-brand-navy border-brand-navy text-white"
                                : "bg-white border-black text-black hover:bg-gray-50"
                                }`}
                        >
                            <Bell size={18} className={isNotificationActive ? "text-white" : "text-black"} />
                            Notification Settings
                        </Link>
                    </div>

                    {/* Dynamic Content (Sub-pages) */}
                    <div>
                        {children}
                    </div>

                </div>
            </div>
        </div>
    );
}
