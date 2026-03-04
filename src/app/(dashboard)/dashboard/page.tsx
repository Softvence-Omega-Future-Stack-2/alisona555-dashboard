"use client";

import RecentBookings from "@/components/RecentBookings";
import RecentEvents from "@/components/RecentEvents";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDashboardData } from "@/hooks/useDashboard";
import { DollarSign, CalendarDays, Users, Ticket, Loader2 } from "lucide-react"; 

export default function DashboardPage() {
  const { data: response, isLoading, isError } = useDashboardData();
  

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 font-medium">Failed to load dashboard data. Please try again later.</p>
      </div>
    );
  }

  const { dashboardData, recent10Event, recnt10ooking } = response?.data || {};

 
  return (
    <div>
      {/* Header */}
      <div className="bg-white mb-4 py-5 px-4 md:p-8 flex gap-4">
        <SidebarTrigger className="w-10 h-10 md:hidden bg-gray-50 border ml-1 border-gray-200 rounded-lg hover:bg-gray-100 text-gray-700" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-[#6A7282] text-sm mt-1">Manage your platform efficiently</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full mx-auto p-6 md:p-8">
     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25">
            <div className="flex justify-between items-start">
              <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center">
                <DollarSign className="text-white w-5 h-5" />
              </div>
            </div>
            <div className="mt-auto">
              <h2 className="text-2xl font-bold text-gray-900">AED {dashboardData?.totalRevenue || 0}</h2>
              <p className="text-gray-500 text-sm mt-1">Total Revenue</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25">
            <div className="flex justify-between items-start">
              <div className="w-11 h-11 rounded-xl bg-blue-500 flex items-center justify-center">
                <CalendarDays className="text-white w-5 h-5" />
              </div>
            </div>
            <div className="mt-auto">
              <h2 className="text-2xl font-bold text-gray-900">{dashboardData?.activeEvent || 0}</h2>
              <p className="text-gray-500 text-sm mt-1">Active Events</p>
            </div>
          </div>

      
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25">
            <div className="flex justify-between items-start">
              <div className="w-11 h-11 rounded-xl bg-linear-to-r from-[#AD46FF] to-[#F6339A] flex items-center justify-center">
                <Users className="text-white w-5 h-5" />
              </div>
            </div>
            <div className="mt-auto">
              <h2 className="text-2xl font-bold text-gray-900">{dashboardData?.totalUser || 0}</h2>
              <p className="text-gray-500 text-sm mt-1">Total Users</p>
            </div>
          </div>

        
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25">
            <div className="flex justify-between items-start">
              <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center">
                <Ticket className="text-white w-5 h-5" />
              </div>
            </div>
            <div className="mt-auto">
              <h2 className="text-2xl font-bold text-gray-900">{dashboardData?.bookingToday || 0}</h2>
              <p className="text-gray-500 text-sm mt-1">Bookings Today</p>
            </div>
          </div>
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Recent Events (takes 2 cols on lg) */}
          <RecentEvents 
          events={recent10Event || []}
           />

          {/* RIGHT: Recent Bookings (takes 1 col on lg) */}
          <RecentBookings bookings={recnt10ooking || []}           />
        </div>
      </div>
    </div>
  );
}