import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfileSettingsPage() {
    return (
        <div className="animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>

            <form className="max-w-225">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-gray-700">Full Name</label>
                        <Input
                            type="text"
                            placeholder="Enter name"
                            defaultValue="Arlene McCoy"
                            className="h-12 bg-[#F8FAFC] border-transparent focus-visible:ring-1 focus-visible:ring-brand-purple focus-visible:border-brand-purple text-gray-700 placeholder:text-gray-400 rounded-xl"
                        />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-gray-700">Email Address</label>
                        <Input
                            type="email"
                            placeholder="Enter email"
                            defaultValue="Admin@gmail.com"
                            className="h-12 bg-[#F8FAFC] border-transparent focus-visible:ring-1 focus-visible:ring-brand-purple focus-visible:border-brand-purple text-gray-700 placeholder:text-gray-400 rounded-xl"
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-gray-700">Phone</label>
                        <Input
                            type="tel"
                            placeholder="(555) 123-4567"
                            className="h-12 bg-[#F8FAFC] border-transparent focus-visible:ring-1 focus-visible:ring-brand-purple focus-visible:border-brand-purple text-gray-700 placeholder:text-gray-400 rounded-xl"
                        />
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-gray-700">Address</label>
                        <Input
                            type="text"
                            placeholder="123 Medical Plaza, Suite 200"
                            className="h-12 bg-[#F8FAFC] border-transparent focus-visible:ring-1 focus-visible:ring-brand-purple focus-visible:border-brand-purple text-gray-700 placeholder:text-gray-400 rounded-xl"
                        />
                    </div>
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
            </form>
        </div>
    );
}
