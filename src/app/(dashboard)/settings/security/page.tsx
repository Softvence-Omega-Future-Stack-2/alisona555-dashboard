"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChangePassword } from "@/hooks/useAuth";

const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export default function SecuritySettingsPage() {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { mutate: changePassword, isPending } = useChangePassword();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: ChangePasswordValues) => {
        changePassword(
            {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            },
            {
                onSuccess: () => {
                    toast.success("Password changed successfully");
                    reset();
                },
                onError: (error: any) => {
                    const message = error?.response?.data?.message || "Failed to change password";
                    toast.error(message);
                },
            }
        );
    };

    return (
        <div className="animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-250 space-y-6">
                {/* Current Password */}
                <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-gray-700">Current password</label>
                    <div className="relative">
                        <Input
                            {...register("oldPassword")}
                            type={showOldPassword ? "text" : "password"}
                            placeholder="********"
                            className="h-12 bg-[#F8FAFC] border-transparent focus-visible:ring-1 focus-visible:ring-brand-purple focus-visible:border-brand-purple text-gray-700 placeholder:text-gray-400 rounded-xl pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showOldPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>
                    {errors.oldPassword && (
                        <p className="text-xs text-red-500 font-medium">{errors.oldPassword.message}</p>
                    )}
                </div>

                {/* New Password */}
                <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-gray-700">New Password</label>
                    <div className="relative">
                        <Input
                            {...register("newPassword")}
                            type={showNewPassword ? "text" : "password"}
                            placeholder="********"
                            className="h-12 bg-[#F8FAFC] border-transparent focus-visible:ring-1 focus-visible:ring-brand-purple focus-visible:border-brand-purple text-gray-700 placeholder:text-gray-400 rounded-xl pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>
                    {errors.newPassword && (
                        <p className="text-xs text-red-500 font-medium">{errors.newPassword.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-gray-700">Confirm Password</label>
                    <div className="relative">
                        <Input
                            {...register("confirmPassword")}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="********"
                            className="h-12 bg-[#F8FAFC] border-transparent focus-visible:ring-1 focus-visible:ring-brand-purple focus-visible:border-brand-purple text-gray-700 placeholder:text-gray-400 rounded-xl pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-xs text-red-500 font-medium">{errors.confirmPassword.message}</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-4 flex items-center gap-3">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-brand-gold hover:bg-brand-gold-hover text-white font-semibold text-[14px] h-11 px-6 rounded-xl shadow-sm transition-all border border-brand-gold disabled:opacity-70"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save changes"
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => reset()}
                        disabled={isPending}
                        className="bg-white hover:bg-gray-50 text-gray-600 font-semibold text-[14px] h-11 px-6 rounded-xl border border-gray-200 shadow-sm transition-all"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}
