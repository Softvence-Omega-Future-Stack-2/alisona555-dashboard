"use client";

import { useBookings } from "@/hooks/useBookings";
import { Skeleton } from "@/components/ui/skeleton";
import { Booking } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ChevronDown, MoreVertical, Ticket, Calendar as CalendarIcon, DollarSign, Eye, FileText, RefreshCcw } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import Image from "next/image";

export default function BookingsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const limit = 10;

    const { data: response, isLoading, isError } = useBookings({
        page,
        limit,
        search,
        status,
    });

    const bookingManagement = response?.data;
    const summary = bookingManagement?.summary;
    const bookings = bookingManagement?.data || [];
    const pagination = bookingManagement?.pagination;

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
        setPage(1);
    };

    return (
        <div>
            <div className="bg-white p-6 md:p-8 flex gap-4">
                <SidebarTrigger className="w-10 h-10 md:hidden bg-gray-50 border ml-1 border-gray-200 rounded-lg hover:bg-gray-100 text-gray-700" />
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Bookings</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your platform efficiently</p>
                </div>
            </div>

            <div className="flex flex-col gap-6 w-full mx-auto p-6 md:p-8">
                {/* Stats Cards */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Total Bookings */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25 w-full max-w-sm">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-[#FF6900] to-[#FB2C36] flex items-center justify-center">
                                <Ticket className="text-white w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-auto">
                            {isLoading ? (
                                <Skeleton className="h-8 w-16" />
                            ) : (
                                <h2 className="text-2xl font-bold text-gray-900">{summary?.totalBookings || 0}</h2>
                            )}
                            <p className="text-gray-500 text-sm mt-1">Total Bookings</p>
                        </div>
                    </div>

                    {/* Total Revenue */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25 w-full max-w-sm">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-[#00C950] to-[#00BC7D] flex items-center justify-center">
                                <DollarSign className="text-white w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-auto">
                            {isLoading ? (
                                <Skeleton className="h-8 w-24" />
                            ) : (
                                <h2 className="text-2xl font-bold text-gray-900">AED {summary?.totalRevenue?.toLocaleString() || 0}</h2>
                            )}
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
                            value={search}
                            onChange={handleSearch}
                            className="border-none shadow-none focus-visible:ring-0 text-[15px] h-12 px-0 text-gray-600 bg-transparent placeholder:text-gray-400"
                        />
                    </div>

                    <div className="relative flex-1 sm:flex-initial min-w-40">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 w-4 h-4 pointer-events-none z-10" />
                        <NativeSelect
                            value={status}
                            onChange={handleStatusChange}
                            className="bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl h-11 pl-10 pr-8 font-medium shadow-none border-none focus:ring-0 appearance-none"
                        >
                            <NativeSelectOption value="">Status</NativeSelectOption>
                            <NativeSelectOption value="CONFIRMED">Confirmed</NativeSelectOption>
                            <NativeSelectOption value="PENDING">Pending</NativeSelectOption>
                            <NativeSelectOption value="FAILED">Failed</NativeSelectOption>
                            <NativeSelectOption value="CANCELLED">Cancelled</NativeSelectOption>
                        </NativeSelect>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 w-4 h-4 pointer-events-none" />
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
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto hidden lg:table-cell">Event date</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto">Quantity</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto">Amount</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto">Status</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto text-right pr-6">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="bg-white">
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell className="py-4 pl-4"><Skeleton className="h-4 w-24" /></TableCell>
                                            <TableCell className="py-4">
                                                <Skeleton className="h-4 w-32 mb-2" />
                                                <Skeleton className="h-3 w-40" />
                                            </TableCell>
                                            <TableCell className="py-4 hidden md:table-cell"><Skeleton className="h-4 w-40" /></TableCell>
                                            <TableCell className="py-4 hidden lg:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                                            <TableCell className="py-4"><Skeleton className="h-4 w-12" /></TableCell>
                                            <TableCell className="py-4"><Skeleton className="h-4 w-20" /></TableCell>
                                            <TableCell className="py-4"><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                                            <TableCell className="py-4 pr-6 text-right"><Skeleton className="h-8 w-8 rounded-full ml-auto" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : bookings.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="py-12 text-center text-gray-500">
                                            {isError ? "Error fetching bookings" : "No bookings found"}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    bookings.map((booking: Booking) => (
                                        <TableRow key={booking.bookingId} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <TableCell className="py-4 text-gray-900 font-medium text-[14px] pl-4">
                                                {booking.bookingId.slice(0, 8).toUpperCase()}
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="font-medium text-gray-900 text-[15px]">{booking.fullName}</div>
                                                <div className="text-gray-500 text-[13px]">{booking.email}</div>
                                            </TableCell>
                                            <TableCell className="py-4 text-gray-500 text-[14px] hidden md:table-cell">{booking.event?.title || "N/A"}</TableCell>
                                            <TableCell className="py-4 text-gray-500 text-[14px] hidden lg:table-cell">
                                                {booking.event?.eventDate ? new Date(booking.event.eventDate).toLocaleDateString() : "N/A"}
                                            </TableCell>
                                            <TableCell className="py-4 text-gray-500 text-[14px]">{booking.quentity}</TableCell>
                                            <TableCell className="py-4 font-semibold text-gray-900 text-[14px]">AED {booking.price?.toLocaleString()}</TableCell>
                                            <TableCell className="py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${booking.status === 'CONFIRMED'
                                                        ? 'bg-blue-50 text-blue-600 border-blue-100/50'
                                                        : booking.status === 'PENDING'
                                                            ? 'bg-amber-50 text-amber-600 border-amber-100/50'
                                                            : 'bg-red-50 text-red-600 border-red-100/50'
                                                    }`}>
                                                    {booking.status.toLowerCase()}
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
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="bg-white py-4 px-6 flex items-center justify-center gap-2 border-t border-gray-50">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                className="text-gray-500 text-sm font-medium hover:text-gray-900 flex items-center mr-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <ChevronDown className="w-4 h-4 mr-1 rotate-90" /> Previous
                            </button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(pagination.totalPages, 5) }).map((_, i) => {
                                    const pageNum = i + 1;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setPage(pageNum)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === pageNum
                                                    ? "bg-blue-50 text-brand-purple"
                                                    : "text-gray-600 hover:bg-gray-100"
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                disabled={page === pagination.totalPages}
                                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                                className="text-gray-900 text-sm font-medium hover:text-brand-purple flex items-center ml-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                Next <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
