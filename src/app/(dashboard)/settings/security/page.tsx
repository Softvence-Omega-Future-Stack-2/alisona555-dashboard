"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeOff } from "lucide-react";

export default function SecuritySettingsPage() {
    return (
        <div className="animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>

            <form className="max-w-250 space-y-6">

                {/* Current Password */}
                <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-gray-700">Current password</label>
                    <div className="relative">
                        <Input
                            type="password"
                            placeholder="********"
                            className="h-12 bg-[#F8FAFC] border-transparent focus-visible:ring-1 focus-visible:ring-brand-purple focus-visible:border-brand-purple text-gray-700 placeholder:text-gray-400 rounded-xl pr-12"
                        />
                        <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                            <EyeOff size={18} />
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-gray-700">New Password</label>
                    <div className="relative">
                        <Input
                            type="password"
                            placeholder="********"
                            className="h-12 bg-[#F8FAFC] border-transparent focus-visible:ring-1 focus-visible:ring-brand-purple focus-visible:border-brand-purple text-gray-700 placeholder:text-gray-400 rounded-xl pr-12"
                        />
                        <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                            <EyeOff size={18} />
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-gray-700">Confirm Password</label>
                    <div className="relative">
                        <Input
                            type="password"
                            placeholder="********"
                            className="h-12 bg-[#F8FAFC] border-transparent focus-visible:ring-1 focus-visible:ring-brand-purple focus-visible:border-brand-purple text-gray-700 placeholder:text-gray-400 rounded-xl pr-12"
                        />
                        <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                            <EyeOff size={18} />
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-4 flex items-center gap-3">
                    <Button type="button" className="bg-brand-gold hover:bg-brand-gold-hover text-white font-semibold text-[14px] h-11 px-6 rounded-xl shadow-sm transition-all border border-brand-gold">
                        Save changes
                    </Button>
                    <Button type="button" variant="outline" className="bg-white hover:bg-gray-50 text-gray-600 font-semibold text-[14px] h-11 px-6 rounded-xl border border-gray-200 shadow-sm transition-all">
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}
