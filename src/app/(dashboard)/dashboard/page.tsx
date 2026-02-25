import { DollarSign, CalendarDays, Users, Ticket,   UserPlus, CalendarPlus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
        {/* Header */}
      <div className="bg-white  mb-4 py-5 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-[#6A7282] text-sm mt-1">Manage your platform efficiently</p>
      </div>
      <div className="flex flex-col gap-6 w-full  mx-auto p-6 md:p-8">


        {/* Stats Cards (4 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Revenue */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25">
            <div className="flex justify-between items-start">
              <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center">
                <DollarSign className="text-white w-5 h-5" />
              </div>
              <div className="text-emerald-500 text-sm font-medium flex items-center">
                <span className="text-base mr-1">↑</span> +12.5%
              </div>
            </div>
            <div className="mt-auto">
              <h2 className="text-2xl font-bold text-gray-900">AED 245,840</h2>
              <p className="text-gray-500 text-sm mt-1">Total Revenue</p>
            </div>
          </div>

          {/* Card 2: Active Events */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25">
            <div className="flex justify-between items-start">
              <div className="w-11 h-11 rounded-xl bg-blue-500 flex items-center justify-center">
                <CalendarDays className="text-white w-5 h-5" />
              </div>
              <div className="text-emerald-500 text-sm font-medium flex items-center">
                <span className="text-base mr-1">↑</span> +12.5%
              </div>
            </div>
            <div className="mt-auto">
              <h2 className="text-2xl font-bold text-gray-900">23</h2>
              <p className="text-gray-500 text-sm mt-1">Active Events</p>
            </div>
          </div>

          {/* Card 3: Total Users */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25">
            <div className="flex justify-between items-start">
              <div className="w-11 h-11 rounded-xl bg-linear-to-r from-[#AD46FF] to-[#F6339A]   flex items-center justify-center">
                <Users className="text-white w-5 h-5" />
              </div>
              <div className="text-emerald-500 text-sm font-medium flex items-center">
                <span className="text-base mr-1">↑</span> +12.5%
              </div>
            </div>
            <div className="mt-auto">
              <h2 className="text-2xl font-bold text-gray-900">1,247</h2>
              <p className="text-gray-500 text-sm mt-1">Total Users</p>
            </div>
          </div>

          {/* Card 4: Bookings Today */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25">
            <div className="flex justify-between items-start">
              <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center">
                <Ticket className="text-white w-5 h-5" />
              </div>
              <div className="text-red-500 text-sm font-medium flex items-center">
                <span className="text-base mr-1">↓</span> -5.3%
              </div>
            </div>
            <div className="mt-auto">
              <h2 className="text-2xl font-bold text-gray-900">47</h2>
              <p className="text-gray-500 text-sm mt-1">Bookings Today</p>
            </div>
          </div>
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Recent Events (takes 2 cols on lg) */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Recent Events</h3>
              <Link href="/event" className="text-blue-600 font-medium text-sm hover:underline">
                View All
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {/* Event Item 1 */}
              <div className="bg-[#F8FAFC] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between border border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col gap-1 mb-2 sm:mb-0">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 text-[15px]">Stargazing at Jebel Jais</span>
                    <span className="bg-emerald-100 text-emerald-700 text-[11px] font-medium px-2 py-0.5 rounded-full">active</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">45 bookings</span>
                    <span className="text-emerald-500 font-medium">AED 13,500</span>
                  </div>
                </div>
              </div>

              {/* Event Item 2 */}
              <div className="bg-[#F8FAFC] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between border border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col gap-1 mb-2 sm:mb-0">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 text-[15px]">Dubai Opera Night</span>
                    <span className="bg-emerald-100 text-emerald-700 text-[11px] font-medium px-2 py-0.5 rounded-full">active</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">120 bookings</span>
                    <span className="text-emerald-500 font-medium">AED 36,000</span>
                  </div>
                </div>
              </div>

              {/* Event Item 3 */}
              <div className="bg-[#F8FAFC] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between border border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col gap-1 mb-2 sm:mb-0">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 text-[15px]">Desert Safari Adventure</span>
                    <span className="bg-amber-100 text-amber-700 text-[11px] font-medium px-2 py-0.5 rounded-full">pending</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">32 bookings</span>
                    <span className="text-emerald-500 font-medium">AED 8,960</span>
                  </div>
                </div>
              </div>

              {/* Event Item 4 */}
              <div className="bg-[#F8FAFC] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between border border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col gap-1 mb-2 sm:mb-0">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 text-[15px]">Beach Volleyball Tournament</span>
                    <span className="bg-emerald-100 text-emerald-700 text-[11px] font-medium px-2 py-0.5 rounded-full">active</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">28 bookings</span>
                    <span className="text-emerald-500 font-medium">AED 4,200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Recent Activity (takes 1 col on lg) */}
          <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>

            <div className="flex flex-col gap-6 relative">
              {/* Activity 1 */}
              <div className="flex gap-4 border-b border-gray-300/70 pb-4">
                <div className="mt-1 shrink-0 w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                  <Ticket className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-800 leading-snug">
                    <span className="font-semibold text-gray-900">Ahmed Al-Mansoori</span> booked Stargazing at Jebel Jais
                  </p>
                  <span className="text-xs text-gray-400 mt-1">5 min ago</span>
                </div>
              </div>

           
              {/* Activity 2 */}
              <div className="flex gap-4 border-b border-gray-300/70 pb-4">
                <div className="mt-1 shrink-0 w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-800 leading-snug">
                    <span className="font-semibold text-gray-900">Sarah Johnson</span> registered new account
                  </p>
                  <span className="text-xs text-gray-400 mt-1">12 min ago</span>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="flex gap-4 border-b border-gray-300/70 pb-4">
                <div className="mt-1 shrink-0 w-9 h-9 rounded-full bg-fuchsia-50 flex items-center justify-center">
                  <CalendarPlus className="w-4 h-4 text-fuchsia-500" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-800 leading-snug">
                    <span className="font-semibold text-gray-900">Admin</span> published Beach Volleyball Tournament
                  </p>
                  <span className="text-xs text-gray-400 mt-1">1 hour ago</span>
                </div>
              </div>

              {/* Activity 4 */}
              <div className="flex gap-4">
                <div className="mt-1 shrink-0 w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                  <Ticket className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-800 leading-snug">
                    <span className="font-semibold text-gray-900">Fatima Hassan</span> booked Dubai Opera Night
                  </p>
                  <span className="text-xs text-gray-400 mt-1">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}