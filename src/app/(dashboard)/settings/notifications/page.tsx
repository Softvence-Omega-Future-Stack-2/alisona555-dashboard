"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Need to ensure shadcn switch exists

export default function NotificationSettingsPage() {
    return (
        <div className="animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>

            <div className="max-w-250 flex flex-col gap-6">

                {/* Toggle 1: New Bookings */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex flex-col gap-1">
                        <span className="text-[15px] font-semibold text-gray-800">New Bookings</span>
                        <span className="text-[13px] text-gray-400">Get notified when users book events</span>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-brand-purple" />
                </div>

                {/* Toggle 2: New User Registrations */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex flex-col gap-1">
                        <span className="text-[15px] font-semibold text-gray-800">New User Registrations</span>
                        <span className="text-[13px] text-gray-400">Alert when new users sign up</span>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-brand-purple" />
                </div>

                {/* Toggle 3: Event Reminders */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex flex-col gap-1">
                        <span className="text-[15px] font-semibold text-gray-800">Event Reminders</span>
                        <span className="text-[13px] text-gray-400">Reminders for upcoming events</span>
                    </div>
                    <Switch defaultChecked={false} className="data-[state=checked]:bg-brand-purple" />
                </div>

                {/* Toggle 4: Payment Confirmations */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex flex-col gap-1">
                        <span className="text-[15px] font-semibold text-gray-800">Payment Confirmations</span>
                        <span className="text-[13px] text-gray-400">Notifications for successful payments</span>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-brand-purple" />
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex items-center gap-3">
                    <Button type="button" className="bg-brand-gold hover:bg-brand-gold-hover text-white font-semibold text-[14px] h-11 px-6 rounded-xl shadow-sm transition-all border border-brand-gold">
                        Save changes
                    </Button>
                    <Button type="button" variant="outline" className="bg-white hover:bg-gray-50 text-gray-600 font-semibold text-[14px] h-11 px-6 rounded-xl border border-gray-200 shadow-sm transition-all">
                        Cancel
                    </Button>
                </div>

            </div>
        </div>
    );
}
