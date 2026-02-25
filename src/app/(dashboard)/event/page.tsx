"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ChevronDown, MoreVertical, Ticket, Users, DollarSign, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Dummy Data
// Dummy Data
const initialEvents = [
    { id: "E-001", eventName: "Stargazing at Jebel Jais", location: "Ras Al Khaimah", category: "Astronomy", date: "Mar 15, 2026", booked: 45, capacity: 50, revenue: "AED 13,500", status: "Active" },
    { id: "E-002", eventName: "Dubai Opera Night", location: "Dubai", category: "Culture", date: "Apr 10, 2026", booked: 120, capacity: 150, revenue: "AED 36,000", status: "Active" },
    { id: "E-003", eventName: "Desert Safari Adventure", location: "Dubai", category: "Adventure", date: "May 05, 2026", booked: 32, capacity: 40, revenue: "AED 8,960", status: "Pending" },
    { id: "E-004", eventName: "Beach Volleyball Tournament", location: "Dubai", category: "Sports", date: "Jun 12, 2026", booked: 28, capacity: 30, revenue: "AED 4,200", status: "Active" },
    { id: "E-005", eventName: "Abu Dhabi Art Fair", location: "Abu Dhabi", category: "Art", date: "Jul 20, 2026", booked: 85, capacity: 100, revenue: "AED 17,000", status: "Completed" },
    { id: "E-006", eventName: "Skydiving over Palm Jumeirah", location: "Dubai", category: "Adventure", date: "Aug 15, 2026", booked: 12, capacity: 15, revenue: "AED 24,000", status: "Active" },
    { id: "E-007", eventName: "Hot Air Balloon Ride", location: "Dubai", category: "Adventure", date: "Sep 10, 2026", booked: 18, capacity: 20, revenue: "AED 10,800", status: "Pending" },
];

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

// ... [existing dummy data above]

export default function EventManagementPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const filteredEvents = initialEvents.filter((event) => {
        const matchesSearch = event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) || event.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter ? event.category === categoryFilter : true;
        const matchesStatus = statusFilter ? event.status === statusFilter : true;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <div>
            {/* Header */}
            <div className="bg-white py-4 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div className="flex gap-4">
                    <SidebarTrigger className="w-10 h-10 md:hidden bg-gray-50 border ml-1 border-gray-200 rounded-lg hover:bg-gray-100 text-gray-700" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Event Management</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage your platform efficiently</p>
                    </div>
                </div>

                {/* Create Event Modal */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-brand-gold hover:bg-brand-gold-hover text-white font-semibold text-[15px] h-11 px-6 rounded-xl flex items-center cursor-pointer gap-2 shadow-[0_4px_14px_rgba(219,152,6,0.25)] transition-all">
                            <Plus size={18} />
                            Create Event
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-175 p-0 overflow-hidden border-none rounded-2xl bg-white focus:outline-none focus-visible:ring-0">
                        <DialogHeader className="px-6  pt-6 border-b border-gray-100 pr-12 mb-0">
                            <DialogTitle className="text-[22px] font-bold text-[#1F2937]">Create New Event</DialogTitle>
                        </DialogHeader>

                        <div className="p-6">
                            <form className="space-y-3">
                                {/* Event Title */}
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-semibold text-[#4B5563] mb-2">Event Title</label>
                                    <Input
                                        placeholder="Enter event title"
                                        className="h-11 border-gray-200  focus:outline-0 focus:border-0 rounded-lg text-[14px]"
                                    />
                                </div>

                                {/* Category & Location */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-semibold text-[#4B5563]">Category</label>
                                        <div className="relative">
                                            <Input
                                                placeholder="Enter Category"
                                                className="h-11 border-gray-200   rounded-lg text-[14px] pr-10"
                                            />
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-semibold text-[#4B5563]">Location</label>
                                        <div className="relative">
                                            <Input
                                                placeholder="Enter Location"
                                                className="h-11 border-gray-200   rounded-lg text-[14px] pr-10"
                                            />
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                {/* Date & Time */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-semibold text-[#4B5563]">Date</label>
                                        <div className="relative">
                                            <Input
                                                placeholder="Enter Date"
                                                className="h-11 border-gray-200  rounded-lg text-[14px] pr-10"
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                {/* Minimal calendar icon shape */}
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-semibold text-[#4B5563]">Time</label>
                                        <div className="relative">
                                            <Input
                                                placeholder="Enter Time"
                                                className="h-11 border-gray-200   rounded-lg text-[14px] pr-10"
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                {/* Minimal clock icon shape */}
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Price & Capacity */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-semibold text-[#4B5563]">Price (AED)</label>
                                        <Input
                                            type="number"
                                            defaultValue="0"
                                            className="h-11 border-gray-200   rounded-lg text-[14px]"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-semibold text-[#4B5563]">Capacity</label>
                                        <Input
                                            type="number"
                                            defaultValue="50"
                                            className="h-11 border-gray-200   rounded-lg text-[14px]"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-1.5 pb-2">
                                    <label className="text-[13px] font-semibold text-[#4B5563]">Description</label>
                                    <textarea
                                        placeholder="Enter event description"
                                        className="flex min-h-30 w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-[14px] ring-offset-white placeholder:text-gray-400     disabled:cursor-not-allowed disabled:opacity-50"
                                    ></textarea>
                                </div>

                                {/* Buttons Layer */}
                                <div className="flex gap-4 pt-2">
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl border-gray-200 text-black cursor-pointer font-semibold hover:bg-gray-50 text-[15px]">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button type="button" className="flex-1 h-12 rounded-xl bg-brand-gold hover:bg-brand-gold-hover text-white font-bold text-[15px] cursor-pointer">
                                        Create Event
                                    </Button>
                                </div>

                            </form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-col gap-6 w-full  mx-auto">


                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 md:p-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-[#FF6900] to-[#FB2C36] flex items-center justify-center">
                                <Ticket className="text-white w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-auto">
                            <h2 className="text-2xl font-bold text-gray-900">3</h2>
                            <p className="text-gray-500 text-sm mt-1">Active Events</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-[#AD46FF] to-[#F6339A]  flex items-center justify-center">
                                <Users className="text-white w-6 h-6" />
                            </div>
                            <div className="text-emerald-500 text-sm font-medium flex items-center">
                                <span className="text-lg mr-1">↑</span> +12.5%
                            </div>
                        </div>
                        <div className="mt-auto">
                            <h2 className="text-2xl font-bold text-gray-900">1,247</h2>
                            <p className="text-gray-500 text-sm mt-1">Total Bookings</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-41.25">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-[#00C950] to-[#00BC7D] flex items-center justify-center">
                                <DollarSign className="text-white w-6 h-6" />
                            </div>
                            <div className="text-emerald-500 text-sm font-medium flex items-center">
                                <span className="text-lg mr-1">↑</span> +12.5%
                            </div>
                        </div>
                        <div className="mt-auto">
                            <h2 className="text-2xl font-bold text-gray-900">AED 109,110</h2>
                            <p className="text-gray-500 text-sm mt-1">Total Revenue</p>
                        </div>
                    </div>
                </div>

                <div className="px-6 md:px-8 ">
                    {/* Filter / Search Bar */}
                    <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center w-full gap-2 sm:gap-0">
                        <div className="flex-1 flex items-center px-4 w-full">
                            <Search className="text-gray-400 w-5 h-5 mr-3" />
                            <Input
                                type="text"
                                placeholder="search Event"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border-none shadow-none focus-visible:ring-0 text-[15px] h-12 px-0 text-gray-600 bg-transparent placeholder:text-gray-400"
                            />
                        </div>
                        <div className="flex gap-3 px-2 w-full sm:w-auto">
                            <NativeSelect
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl h-11 px-5 font-medium flex items-center gap-2 flex-1 sm:flex-initial"
                            >
                                <NativeSelectOption value="">Category</NativeSelectOption>
                                <NativeSelectOption value="Astronomy">Astronomy</NativeSelectOption>
                                <NativeSelectOption value="Culture">Culture</NativeSelectOption>
                                <NativeSelectOption value="Adventure">Adventure</NativeSelectOption>
                                <NativeSelectOption value="Sports">Sports</NativeSelectOption>
                                <NativeSelectOption value="Art">Art</NativeSelectOption>
                            </NativeSelect>
                            <NativeSelect
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-none rounded-xl h-11 px-5 font-medium flex items-center gap-2 flex-1 sm:flex-initial shadow-none focus:shadow-none focus:border-0"
                            >
                                <NativeSelectOption value="">Status</NativeSelectOption>
                                <NativeSelectOption value="Active">Active</NativeSelectOption>
                                <NativeSelectOption value="Pending">Pending</NativeSelectOption>
                                <NativeSelectOption value="Completed">Completed</NativeSelectOption>
                            </NativeSelect>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-[#F8FAFC] rounded-2xl overflow-hidden border border-gray-100 px-6 md:px-8">
                    <div className="overflow-x-auto">
                        <Table className="w-full">
                            <TableHeader className="bg-[#EEF2F6]">
                                <TableRow className="border-none hover:bg-[#EEF2F6]">
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto w-[30%] pl-6">Events</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto">Category</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto hidden md:table-cell">Date</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto">Capacity</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto hidden lg:table-cell">Revenue</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto">Status</TableHead>
                                    <TableHead className="py-4 font-semibold text-gray-700 h-auto text-right pr-6">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="bg-white">
                                {filteredEvents.map((event, idx) => {
                                    const percentage = (event.booked / event.capacity) * 100;
                                    return (
                                        <TableRow key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <TableCell className="py-4 pl-6">
                                                <div className="font-semibold text-gray-900 text-[15px]">{event.eventName}</div>
                                                <div className="text-gray-500 text-[13px]">{event.location}</div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-medium bg-[#FFF6EE] text-[#D47119] border border-[#FBE3CC]">
                                                    {event.category}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-4 text-gray-600 text-[14px] hidden md:table-cell">{event.date}</TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex flex-col gap-1.5 w-full max-w-30">
                                                    <span className="text-gray-900 font-semibold text-[14px]">{event.booked} <span className="text-gray-400 font-normal">/ {event.capacity}</span></span>
                                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-brand-purple rounded-full" style={{ width: `${percentage}%` }}></div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4 font-semibold text-gray-900 text-[14px] hidden lg:table-cell">{event.revenue}</TableCell>
                                            <TableCell className="py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${event.status === 'Active'
                                                    ? 'bg-brand-success text-brand-success-text'
                                                    : event.status === 'Completed' ? 'bg-fuchsia-100 text-fuchsia-600' : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                    {event.status}
                                                </span>
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
                                    );
                                })}
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
