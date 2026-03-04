"use client";

import { useUsers } from "@/hooks/useUsers";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/types";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ChevronDown, MoreVertical, Ticket, Users, DollarSign, Eye, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";

// Dummy Data
const initialUsers = [
    { id: "1", name: "Ahmed Al-Mansoori", email: "ahmed.mansoori@email.com", contact: "+971 50 123 4567", location: "Dubai", activity: "12 bookings", joined: "Jan 15, 2025", status: "Active" },
    { id: "2", name: "Sarah Johnson", email: "sarah.j@email.com", contact: "+1 202 555 0123", location: "USA", activity: "5 bookings", joined: "Feb 20, 2025", status: "Active" },
    { id: "3", name: "Mohammed Ali", email: "m.ali@email.com", contact: "+971 50 987 6543", location: "Abu Dhabi", activity: "8 bookings", joined: "Mar 05, 2025", status: "Inactive" },
    { id: "4", name: "Emily Chen", email: "emily.c@email.com", contact: "+44 7700 900077", location: "England", activity: "2 bookings", joined: "Mar 12, 2025", status: "Active" },
    { id: "5", name: "Michael Smith", email: "m.smith@email.com", contact: "+1 312 555 0199", location: "USA", activity: "15 bookings", joined: "Apr 01, 2025", status: "Active" },
    { id: "6", name: "David Williams", email: "d.will@email.com", contact: "+66 81 234 5678", location: "Thailand", activity: "4 bookings", joined: "May 15, 2025", status: "Active" },
    { id: "7", name: "Sven Olsen", email: "sven.o@email.com", contact: "+45 20 12 34 56", location: "Denmark", activity: "9 bookings", joined: "Jun 20, 2025", status: "Active" },
    { id: "8", name: "Fatima Hassan", email: "f.hassan@email.com", contact: "+971 50 111 2222", location: "Sharjah", activity: "1 bookings", joined: "Jul 10, 2025", status: "Inactive" },
];

export default function UserManagementPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const limit = 10;

    const { data: response, isLoading, isError, error } = useUsers({
        page,
        limit,
        search,
        status,
    });

    const userManagement = response?.data;
    const stats = userManagement?.dashboard;
    const users = userManagement?.data || [];
    const pagination = userManagement?.pagination;

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1); // Reset to first page on search
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
        setPage(1); // Reset to first page on filter
    };

    return (
        <div>
            <div className="bg-white p-6 md:p-8 flex gap-4">
                <SidebarTrigger className="w-10 h-10 md:hidden bg-gray-50 border ml-1 border-gray-200 rounded-lg hover:bg-gray-100 text-gray-700" />
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">User Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your platform efficiently</p>
                </div>
            </div>

            <div className="flex flex-col gap-6 w-full mx-auto p-6 md:p-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Total Users */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-r from-[#FF6900] to-[#FB2C36] flex items-center justify-center">
                            <Ticket className="text-white w-6 h-6" />
                        </div>
                        <div className="mt-auto">
                            {isLoading ? (
                                <Skeleton className="h-8 w-16" />
                            ) : (
                                <h2 className="text-2xl font-bold text-gray-900">{stats?.totalUser || 0}</h2>
                            )}
                            <p className="text-gray-500 text-sm mt-1">Total Users</p>
                        </div>
                    </div>

                    {/* Active Users */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-r from-[#AD46FF] to-[#F6339A] flex items-center justify-center">
                            <Users className="text-white w-6 h-6" />
                        </div>
                        <div className="mt-auto">
                            {isLoading ? (
                                <Skeleton className="h-8 w-16" />
                            ) : (
                                <h2 className="text-2xl font-bold text-gray-900">{stats?.totalActiveUser || 0}</h2>
                            )}
                            <p className="text-gray-500 text-sm mt-1">Active Users</p>
                        </div>
                    </div>

                    {/* Total Bookings */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-r from-[#00C950] to-[#00BC7D] flex items-center justify-center">
                            <DollarSign className="text-white w-6 h-6" />
                        </div>
                        <div className="mt-auto">
                            {isLoading ? (
                                <Skeleton className="h-8 w-16" />
                            ) : (
                                <h2 className="text-2xl font-bold text-gray-900">{stats?.totalBooking || 0}</h2>
                            )}
                            <p className="text-gray-500 text-sm mt-1">Total Bookings</p>
                        </div>
                    </div>
                </div>

                {/* Filter / Search Bar */}
                <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex items-center w-full gap-4">
                    <div className="flex-1 flex items-center px-4 bg-[#EEF2FF] rounded-xl">
                        <Search className="text-gray-400 w-5 h-5 mr-3" />
                        <Input
                            type="text"
                            placeholder="search User"
                            value={search}
                            onChange={handleSearch}
                            className="border-none shadow-none focus-visible:ring-0 text-[15px] h-12 px-0 text-gray-600 bg-transparent placeholder:text-gray-400"
                        />
                    </div>
                    <NativeSelect
                        value={status}
                        onChange={handleStatusChange}
                        className="bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl h-11 px-5 font-medium flex items-center gap-2 flex-1 sm:flex-initial"
                    >
                        <NativeSelectOption value="">Status</NativeSelectOption>
                        <NativeSelectOption value="ACTIVE">Active</NativeSelectOption>
                        <NativeSelectOption value="INACTIVE">Inactive</NativeSelectOption>
                    </NativeSelect>
                </div>

                {/* Data Table */}
                <div className="bg-[#F8FAFC] rounded-2xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <Table className="w-full">
                            <TableHeader className="bg-[#EEF2F6]">
                                <TableRow className="border-none hover:bg-[#EEF2F6]">
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto pl-5">Profile</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto">User</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto hidden md:table-cell">Role</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto">Status</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto hidden lg:table-cell">Joined</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto text-right pr-6">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="bg-white">
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell className="py-4 pl-5">
                                                <Skeleton className="h-10 w-10 rounded-full" />
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <Skeleton className="h-4 w-32 mb-2" />
                                                <Skeleton className="h-3 w-40" />
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <Skeleton className="h-4 w-16" />
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <Skeleton className="h-6 w-20 rounded-full" />
                                            </TableCell>
                                            <TableCell className="py-4 pl-5 lg:table-cell hidden">
                                                <Skeleton className="h-4 w-24" />
                                            </TableCell>
                                            <TableCell className="py-4 pr-6 text-right">
                                                <Skeleton className="h-8 w-8 rounded-full ml-auto" />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="py-12 text-center text-gray-500">
                                            {isError ? "Error fetching users" : "No users found"}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user: User) => (
                                        <TableRow key={user.userId} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <TableCell className="py-4 pl-5">
                                                <Image
                                                    src="/profile.png"
                                                    alt="Avatar"
                                                    width={40} height={40}
                                                    className="rounded-full border border-gray-200"
                                                />
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="font-medium text-gray-900 text-[15px]">{user.username || "Unknown User"}</div>
                                                <div className="text-gray-500 text-[13px]">{user.email || "N/A"}</div>
                                            </TableCell>
                                            <TableCell className="py-4 text-gray-500 text-[14px] hidden md:table-cell">{user.role}</TableCell>
                                            <TableCell className="py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${user.status === 'ACTIVE'
                                                    ? 'bg-brand-success text-brand-success-text'
                                                    : 'bg-brand-error text-brand-error-text'
                                                    }`}>
                                                    {user.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-4 text-gray-500 text-[14px] hidden lg:table-cell">
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                                            </TableCell>
                                            <TableCell className="py-4 text-right pr-6">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 ml-auto">
                                                            <MoreVertical size={18} />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-36">
                                                        <DropdownMenuItem className="cursor-pointer">
                                                            <Eye className="w-4 h-4 mr-2" /> View
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="cursor-pointer">
                                                            <Edit className="w-4 h-4 mr-2" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                                                            <Trash2 className="w-4 h-4 mr-2" /> Delete
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
                                    const pageNum = i + 1; // Simplified for now
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
