"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useAuth";
import { Shield, CircleUserRound, LockKeyholeOpen, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const login = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: LoginFormValues) => {
        login.mutate(data, {
            onSuccess: () => {
                toast.success("Signed in successfully!");
                router.push("/dashboard");
            },
            onError: (error: any) => {
                const message = error.response?.data?.data?.message || error.response?.data?.message || "Sign in failed. Please check your credentials.";
                toast.error(message);
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#0B1120] flex items-center justify-center relative overflow-hidden">
            {/* Starry Background Effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="w-1 h-1 bg-white rounded-full absolute top-[10%] left-[20%] opacity-40"></div>
                <div className="w-2 h-2 bg-white rounded-full absolute top-[15%] left-[80%] opacity-20"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-[40%] left-[10%] opacity-30"></div>
                <div className="w-1 h-1 bg-white rounded-full absolute top-[60%] left-[85%] opacity-40"></div>
                <div className="w-2 h-2 bg-white rounded-full absolute top-[80%] left-[30%] opacity-10"></div>
                <div className="w-1 h-1 bg-white rounded-full absolute top-[85%] left-[70%] opacity-30"></div>
            </div>

            <div className="z-10 w-full max-w-md px-6 flex flex-col items-center">
                {/* Logo Graphic */}
                <div className="w-20 h-20 bg-brand-navy rounded-full border border-gray-600 flex items-center justify-center mb-6 relative shadow-lg shadow-black/50">
                    <Image
                        src="/logo.png"
                        alt="NATURE & SKY"
                        width={60}
                        height={60}
                        className="w-full h-full opacity-90 grayscale-0"
                    />
                </div>

                {/* Headings */}
                <h1 className="text-white text-2xl font-bold mb-2">Admin Portal</h1>
                <p className="text-gray-400 text-sm mb-8">NATURE & SKY UAE Management System</p>

                {/* Login Form Box */}
                <div className="bg-brand-navy-light w-full rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-800/50">
                    <form className="space-y-5" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-1">
                            <label className="text-gray-300 text-sm font-inter font-semibold ml-1">Admin Email</label>
                            <div className="relative mt-2">
                                <CircleUserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 h-5 w-5" />
                                <Input
                                    {...register("email")}
                                    type="email"
                                    autoComplete="email"
                                    placeholder="admin@example.com"
                                    className={`pl-11 h-12 bg-white/10 border ${errors.email ? "border-red-500" : "border-white/20"
                                        } text-gray-200 placeholder:text-gray-500 rounded-xl focus:ring-brand-gold`}
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs ml-1 mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-gray-300 text-sm font-inter font-semibold ml-1">Password</label>
                            <div className="relative mt-2">
                                <LockKeyholeOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    {...register("password")}
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="password"
                                    className={`pl-11 h-12 bg-white/10 border ${errors.password ? "border-red-500" : "border-white/20"
                                        } text-gray-200 placeholder:text-gray-500 rounded-xl focus:ring-brand-gold`}
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-xs ml-1 mt-1">{errors.password.message}</p>}
                            <div className="flex justify-end pt-1">
                                <Link href="/forgot-password" className="text-red-500 text-xs hover:underline cursor-pointer">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={login.isPending}
                                className="cursor-pointer w-full h-12 rounded-xl bg-brand-gold hover:bg-brand-gold-hover text-white font-bold text-[15px] shadow-[0_4px_14px_rgba(219,152,6,0.3)] transition-all flex items-center justify-center"
                            >
                                {login.isPending ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Shield size={18} className="mr-2" />
                                )}
                                {login.isPending ? "Signing In..." : "Sign In to Admin Panel"}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-gray-400 text-xs mt-8">Authorized personnel only • All actions are logged</p>
            </div>
        </div>
    );
}

