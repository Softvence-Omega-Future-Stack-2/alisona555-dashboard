"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ChevronDown, MoreVertical, Ticket, Calendar as CalendarIcon, DollarSign, Eye, FileText, RefreshCcw } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import Image from "next/image";

// Dummy Data
const initialBookings = [
    { id: "NS-2026-001", customerName: "Ahmed Al-Mansoori", customerEmail: "ahmed.mansoori@email.com", event: "Stargazing at Jebel Jais", location: "Dubai", date: "Jan 15, 2025", quantity: "2 tickets", amount: "AED 600", status: "confirmed" },
    { id: "NS-2026-002", customerName: "Sarah Johnson", customerEmail: "sarah.j@email.com", event: "Dubai Opera Night", location: "Dubai", date: "Feb 20, 2025", quantity: "4 tickets", amount: "AED 1,200", status: "confirmed" },
    { id: "NS-2026-003", customerName: "Mohammed Ali", customerEmail: "m.ali@email.com", event: "Desert Safari Adventure", location: "Abu Dhabi", date: "Mar 05, 2025", quantity: "1 tickets", amount: "AED 280", status: "pending" },
    { id: "NS-2026-004", customerName: "Emily Chen", customerEmail: "emily.c@email.com", event: "Beach Volleyball Tournament", location: "Dubai", date: "Apr 12, 2025", quantity: "3 tickets", amount: "AED 450", status: "cancelled" },
    { id: "NS-2026-005", customerName: "Michael Smith", customerEmail: "m.smith@email.com", event: "Stargazing at Jebel Jais", location: "Dubai", date: "Jan 15, 2025", quantity: "2 tickets", amount: "AED 600", status: "confirmed" },
    { id: "NS-2026-006", customerName: "David Williams", customerEmail: "d.will@email.com", event: "Hot Air Balloon Ride", location: "Dubai", date: "May 15, 2025", quantity: "2 tickets", amount: "AED 1,200", status: "confirmed" },
    { id: "NS-2026-007", customerName: "Sven Olsen", customerEmail: "sven.o@email.com", event: "Skydiving over Palm Jumeirah", location: "Dubai", date: "Jun 20, 2025", quantity: "1 tickets", amount: "AED 2,000", status: "pending" },
    { id: "NS-2026-008", customerName: "Fatima Hassan", customerEmail: "f.hassan@email.com", event: "Dubai Opera Night", location: "Dubai", date: "Feb 20, 2025", quantity: "3 tickets", amount: "AED 900", status: "confirmed" },
];

export default function BookingsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    const filteredBookings = initialBookings.filter((booking) => {
        const matchesSearch =
            booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.event.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDate = dateFilter ? booking.date === dateFilter : true;
        return matchesSearch && matchesDate;
    });

    return (
        <div>
            <div className="bg-white p-6 md:p-8 flex gap-4">
                <SidebarTrigger className="w-10 h-10 md:hidden bg-gray-300 border-2 border-gray-300 cursor-pointer ml-1 rounded-lg hover:bg-gray-100 text-gray-700" />
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Bookings</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your platform efficiently</p>
                </div>
            </div>
            <div className="flex flex-col gap-6 w-full  mx-auto p-6 md:p-8">
                {/* Header */}


                {/* Stats Cards */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25 w-full max-w-sm">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-[#FF6900] to-[#FB2C36] flex items-center justify-center">
                                <Ticket className="text-white w-6 h-6" />
                            </div>
                            <div className="text-emerald-500 text-sm font-medium flex items-center">
                                <span className="text-lg mr-1">↑</span> +12.5%
                            </div>
                        </div>
                        <div className="mt-auto">
                            <h2 className="text-2xl font-bold text-gray-900">50</h2>
                            <p className="text-gray-500 text-sm mt-1">Total Bookings</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25 w-full max-w-sm">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-[#00C950] to-[#00BC7D] flex items-center justify-center">
                                <DollarSign className="text-white w-6 h-6" />
                            </div>
                            {/* No indicator on revenue in design but let's add placeholder or leave empty. Image doesn't clearly show +12.5% on revenue but looks like it might not have it. Let's omit just in case. */}
                        </div>
                        <div className="mt-auto">
                            <h2 className="text-2xl font-bold text-gray-900">AED 3,390</h2>
                            <p className="text-gray-500 text-sm mt-1">Total Revenue</p>
                        </div>
                    </div>
                </div>

                {/* Filter / Search Bar */}
                <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex items-center w-full gap-2">
                    <div className="flex-1 flex items-center px-4">
                        <Search className="text-gray-400 w-5 h-5 mr-3" />
                        <Input
                            type="text"
                            placeholder="search Bookings"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border-none shadow-none focus-visible:ring-0 text-[15px] h-12 px-0 text-gray-600 bg-transparent placeholder:text-gray-400"
                        />
                    </div>

                    <div className="relative flex-1 sm:flex-initial min-w-40">
                        <CalendarIcon
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 w-4 h-4 pointer-events-none z-10"
                        />
                        <NativeSelect
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className={`
      bg-brand-purple hover:bg-brand-purple/90 
      text-white rounded-xl h-11 
      pl-10 pr-8              
      font-medium shadow-none border-none focus:ring-0
      appearance-none          
    `}
                        >
                            <NativeSelectOption value="">Date</NativeSelectOption>
                            <NativeSelectOption value="Jan 15, 2025">Jan 15, 2025</NativeSelectOption>
                            <NativeSelectOption value="Feb 20, 2025">Feb 20, 2025</NativeSelectOption>
                            <NativeSelectOption value="Mar 05, 2025">Mar 05, 2025</NativeSelectOption>
                            <NativeSelectOption value="Apr 12, 2025">Apr 12, 2025</NativeSelectOption>
                            <NativeSelectOption value="May 15, 2025">May 15, 2025</NativeSelectOption>
                            {/* ... বাকি অপশন */}
                        </NativeSelect>

                        {/* ঐচ্ছিক: custom dropdown arrow রাখতে চাইলে */}
                        <ChevronDown
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 w-4 h-4 pointer-events-none"
                        />
                    </div>

                </div>

                {/* Data Table */}
                <div className="bg-[#F8FAFC] rounded-2xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <Table className="w-full">
                            <TableHeader className="bg-[#EEF2F6]">
                                <TableRow className="border-none hover:bg-[#EEF2F6]">
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto pl-4">Booking Ref</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto">Customer</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto hidden md:table-cell">Event</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto hidden sm:table-cell">Location</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto hidden lg:table-cell">Event date</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto">Quantity</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto">Amount</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto">Status</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto text-right pr-6">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="bg-white">
                                {filteredBookings.map((booking, idx) => (
                                    <TableRow key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <TableCell className="py-4 text-gray-900 font-medium text-[14px] pl-4">
                                            {booking.id}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="font-medium text-gray-900 text-[15px]">{booking.customerName}</div>
                                            <div className="text-gray-500 text-[13px]">{booking.customerEmail}</div>
                                        </TableCell>
                                        <TableCell className="py-4 text-gray-500 text-[14px] hidden md:table-cell">{booking.event}</TableCell>
                                        <TableCell className="py-4 text-gray-500 text-[14px] hidden sm:table-cell">{booking.location}</TableCell>
                                        <TableCell className="py-4 text-gray-500 text-[14px] hidden lg:table-cell">{booking.date}</TableCell>
                                        <TableCell className="py-4 text-gray-500 text-[14px]">{booking.quantity}</TableCell>
                                        <TableCell className="py-4 font-semibold text-gray-900 text-[14px]">{booking.amount}</TableCell>
                                        <TableCell className="py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${booking.status === 'confirmed'
                                                ? 'bg-blue-50 text-blue-600 border-blue-100/50'
                                                : booking.status === 'pending'
                                                    ? 'bg-amber-50 text-amber-600 border-amber-100/50'
                                                    : 'bg-red-50 text-red-600 border-red-100/50'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-4 text-right pr-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 ml-auto">
                                                        <MoreVertical size={18} />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Eye className="w-4 h-4 mr-2" /> View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <FileText className="w-4 h-4 mr-2" /> Download Ticket
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                                                        <RefreshCcw className="w-4 h-4 mr-2" /> Refund
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="bg-white py-4 px-6 flex items-center justify-center gap-2 border-t border-gray-50">
                        <button className="text-gray-500 text-sm font-medium hover:text-gray-900 flex items-center mr-2">
                            <ChevronDown className="w-4 h-4 mr-1 rotate-90" /> Previous
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-sm text-gray-600 hover:bg-gray-100 font-medium">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-sm bg-blue-50 text-brand-purple font-medium">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-sm text-gray-600 hover:bg-gray-100 font-medium">3</button>
                        <span className="text-gray-400 px-1">..</span>
                        <button className="text-gray-900 text-sm font-medium hover:text-brand-purple flex items-center ml-2">
                            Next <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
