import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Shield, CircleUserRound, LockKeyholeOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#0B1120] flex items-center justify-center relative overflow-hidden">
            {/* Starry Background Effect - using some absolute positioned dots */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="w-1 h-1 bg-white rounded-full absolute top-[10%] left-[20%] opacity-40"></div>
                <div className="w-2 h-2 bg-white rounded-full absolute top-[15%] left-[80%] opacity-20"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-[40%] left-[10%] opacity-30"></div>
                <div className="w-1 h-1 bg-white rounded-full absolute top-[60%] left-[85%] opacity-40"></div>
                <div className="w-2 h-2 bg-white rounded-full absolute top-[80%] left-[30%] opacity-10"></div>
                <div className="w-1 h-1 bg-white rounded-full absolute top-[85%] left-[70%] opacity-30"></div>
                {/* Could add a dozen more points for an exact starry night look */}
            </div>

            <div className="z-10 w-full max-w-md px-6 flex flex-col items-center">

                {/* Logo Graphic */}
                <div className="w-20 h-20 bg-brand-navy rounded-full border border-gray-600 flex items-center justify-center mb-6 relative shadow-lg shadow-black/50">
                    <Image src="/logo.png" alt="NATURE & SKY" width={60} height={60} className="w-full h-full opacity-90 grayscale-0" />
                </div>

                {/* Headings */}
                <h1 className="text-white text-2xl font-bold mb-2">Admin Portal</h1>
                <p className="text-gray-400 text-sm mb-8">NATURE & SKY UAE Management System</p>

                {/* Login Form Box */}
                <div className="bg-brand-navy-light w-full rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-800/50">
                    <form className="space-y-5" autoComplete="off">

                        <div className="space-y-4">
                            <label className="text-gray-300 text-sm font-inter font-semibold ml-1">Admin Email</label>
                            <div className="relative mt-4">
                                {/* <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" /> */}

                                 <CircleUserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 h-5 w-5" />
                                <Input
                                    type="email"
                                    autoComplete="off"
                                    placeholder="admin@example.com"
                                    className="pl-11 h-12 bg-white/10  border border-white/20    text-gray-200 placeholder:text-gray-500 rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm! font-inter font-semibold ml-1 mb-4!">Password</label>
                            <div className="relative mt-4">
                                <LockKeyholeOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    type="password"
                                    autoComplete="off"
                                    placeholder="password"
                                    className="pl-11 h-12 bg-white/10  border border-white/20   text-gray-200 placeholder:text-gray-500 rounded-xl"
                                />
                            </div>
                            <div className="flex justify-end pt-1">
                                <button type="button" className="text-red-500 text-xs hover:underline cursor-pointer">
                                    Forgot Password?
                                </button>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Link href="/dashboard"  >
                                <Button className="cursor-pointer w-full h-12 rounded-xl bg-brand-gold hover:bg-brand-gold-hover text-white font-bold text-[15px] shadow-[0_4px_14px_rgba(219,152,6,0.3)] transition-all">
                                    <Shield size={18} className="mr-2" />
                                    Sign In to Admin Panel
                                </Button>
                            </Link>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <p className="text-gray-400 text-xs mt-8">Authorized personnel only • All actions are logged</p>
            </div>
        </div>
    );
}
