"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Search,
  ChevronDown,
  MoreVertical,
  Ticket,
  Users,
  DollarSign,
  Plus,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Calendar as CalendarIcon, // Renamed to avoid conflict with Calendar component
  Upload,
  Loader2,
  Check,
  RotateCcw,
  LayoutDashboard,
  Activity,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateEvent, useEvents, useDeleteEvent, useUpdateEvent, useUpdateEventThumbnail } from "@/hooks/useEvents";
import { Event as EventType } from "@/types/event.types";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "leaflet/dist/leaflet.css";

// LocationPicker dynamic import
const LocationPicker = dynamic(() => import("@/components/LocationPicker2"), {
  ssr: false,
});

const CATEGORIES = [
  { name: "Astronomy", icon: "🚀" },
  { name: "Culture & Art", icon: "🎭" },
  { name: "Sports", icon: "🏀" },
  { name: "Nature & Outdoor", icon: "🌲" },
];

const CITIES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
];

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  eventDate: z.date(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  duration: z.string().min(1, "Duration is required"),
  price: z.number().min(0),
  capacity: z.number().min(1),
  venueName: z.string().min(1, "Venue name is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  about: z.string().min(10),
  cancellationPolicy: z.string().min(5),
  whatToExpect: z.string().min(5),
  isFamilyFriendly: z.boolean(),
  ageLimit: z.number().min(0),
  highlights: z.string().min(1),
  status: z.enum(["ACTIVE", "INACTIVE", "COMPLITE", "CANCELLED"]),
  eventType: z.enum(["PAID", "FREE"]),
  thumbnail: z.any().optional(), // Make optional globally, we'll validate manually if needed or just let it be.
});

type EventFormValues = z.infer<typeof eventSchema>;

export default function EventManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState<number | undefined>(undefined);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | undefined>(undefined);
  const [freeOnlyFilter, setFreeOnlyFilter] = useState(false);
  const [familyFriendlyFilter, setFamilyFriendlyFilter] = useState(false);
  const [upcomingFilter, setUpcomingFilter] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address?: string;
  } | null>(null);

  const { mutate: createEvent, isPending: isCreating } = useCreateEvent();
  const { mutate: deleteEvent, isPending: isDeleting } = useDeleteEvent();
  const { mutate: updateEvent, isPending: isUpdating } = useUpdateEvent();
  const { mutate: updateThumbnail, isPending: isUpdatingThumbnail } = useUpdateEventThumbnail();

  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);

  const { data: eventsResponse, isLoading, refetch } = useEvents({
    page,
    limit,
    search: searchQuery || undefined,
    category: categoryFilter || undefined,
    status: statusFilter || undefined,
    city: cityFilter || undefined,
    minPrice: minPriceFilter,
    maxPrice: maxPriceFilter,
    freeOnly: freeOnlyFilter || undefined,
    familyFriendly: familyFriendlyFilter || undefined,
    upcoming: upcomingFilter || undefined,
  });

  // Reset to page 1 when any filter changes
  useEffect(() => {
    setPage(1);
  }, [
    searchQuery,
    categoryFilter,
    statusFilter,
    cityFilter,
    minPriceFilter,
    maxPriceFilter,
    freeOnlyFilter,
    familyFriendlyFilter,
    upcomingFilter,
  ]);

  const events = eventsResponse?.data?.data || [];
  const meta = eventsResponse?.data?.meta;
  const stats = eventsResponse?.data?.eventData;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      price: 0,
      capacity: 50,
      isFamilyFriendly: true,
      status: "ACTIVE",
      eventType: "PAID",
      ageLimit: 0,
      title: "",
      description: "",
      category: "",
      eventDate: undefined,
      startTime: "",
      endTime: "",
      duration: "",
      venueName: "",
      city: "",
      address: "",
      about: "",
      cancellationPolicy: "",
      whatToExpect: "",
      highlights: "",
      latitude: 0,
      longitude: 0,
      thumbnail: undefined,
    },
  });

  const onSubmit: SubmitHandler<EventFormValues> = (data) => {
    console.log("Form Data:", data);

    if (editingEvent) {
      // Update logic
      const updateData = {
        ...data,
        eventDate: data.eventDate.toISOString(),
        highlights: data.highlights.split(",").map(h => h.trim()),
        ageLimit: data.ageLimit.toString()
      };

      if (!(data.thumbnail instanceof File)) {
        delete (updateData as any).thumbnail;
      }

      updateEvent(
        { eventId: editingEvent.eventId, data: updateData },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setEditingEvent(null);
            reset();
            setSelectedLocation(null);
            setPage(1);
            refetch(); // Explicitly trigger refetch
          },
        }
      );
    } else {
      // Create logic
      createEvent(
        {
          ...data,
          eventDate: data.eventDate.toISOString(),
          thumbnail: data.thumbnail as File,
        },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            reset();
            setSelectedLocation(null);
            setPage(1);
            refetch(); // Explicitly trigger refetch
          },
        }
      );
    }
  };

  const handleEdit = (event: EventType) => {
    setEditingEvent(event);
    reset({
      title: event.title,
      description: event.description,
      category: event.category,
      eventDate: new Date(event.eventDate),
      startTime: event.startTime,
      endTime: event.endTime,
      duration: event.duration,
      price: event.price,
      capacity: event.capacity,
      venueName: event.venueName,
      city: event.city,
      address: event.address,
      latitude: event.latitude,
      longitude: event.longitude,
      about: event.about,
      cancellationPolicy: event.cancellationPolicy,
      whatToExpect: event.whatToExpect,
      isFamilyFriendly: event.isFamilyFriendly,
      ageLimit: parseInt(event.ageLimit) || 0,
      highlights: event.highlights.join(", "),
      status: event.status,
      eventType: event.price > 0 ? "PAID" : "FREE",
      thumbnail: event.thumbnail
    });
    setSelectedLocation({ lat: event.latitude, lng: event.longitude, address: event.address });
    setPreviewUrl(event.thumbnail || null);
    setIsDialogOpen(true);
  };

  const handleThumbnailUpdate = () => {
    const thumbnailFile = watch("thumbnail");
    if (editingEvent && thumbnailFile instanceof File) {
      updateThumbnail(
        { eventId: editingEvent.eventId, thumbnail: thumbnailFile },
        {
          onSuccess: (response) => {
            // Update the preview URL with the new server URL if available, 
            // or just keep the current preview if it's already working.
            // The hook already invalidates the query.
          }
        }
      );
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);



  const filteredEvents = events;

  return (
    <div>
      {/* Header */}
      <div className="bg-white py-4 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-4">
          <SidebarTrigger className="w-10 h-10 md:hidden bg-gray-50 border ml-1 border-gray-200 rounded-lg hover:bg-gray-100 text-gray-700" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Event Management
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage your platform efficiently
            </p>
          </div>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingEvent(null);
              reset({
                price: 0,
                capacity: 50,
                isFamilyFriendly: true,
                status: "ACTIVE",
                eventType: "PAID",
                ageLimit: 0,
                title: "",
                description: "",
                category: "",
                eventDate: undefined,
                startTime: "",
                endTime: "",
                duration: "",
                venueName: "",
                city: "",
                address: "",
                about: "",
                cancellationPolicy: "",
                whatToExpect: "",
                highlights: "",
                latitude: 0,
                longitude: 0,
                thumbnail: undefined,
              });
              setSelectedLocation(null);
              setPreviewUrl(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-brand-gold hover:bg-brand-gold-hover text-white font-semibold text-[15px] h-11 px-6 rounded-xl flex items-center cursor-pointer gap-2 shadow-[0_4px_14px_rgba(219,152,6,0.25)] transition-all">
              <Plus size={18} />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="scrollbar-thin sm:max-w-200 w-[95vw] max-h-[92vh] overflow-y-auto p-0 border-none rounded-2xl bg-white focus:outline-none focus-visible:ring-0">
            <DialogHeader className="px-6 pt-6 border-b border-gray-100 pr-12 mb-0">
              <DialogTitle className="text-[22px] font-bold text-[#1F2937]">
                {editingEvent ? "Edit Event" : "Create New Event"}
              </DialogTitle>
            </DialogHeader>

            <div className="p-4 sm:p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-5">
                    {/* Event Title */}
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-[#4B5563]">
                        Event Title
                      </label>
                      <Input
                        {...register("title")}
                        placeholder="Enter event title"
                        className={`h-11 border-gray-200 rounded-lg text-[14px] ${errors.title ? "border-red-500" : ""}`}
                      />
                      {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-[#4B5563]">
                        Category
                      </label>
                      <Controller
                        control={control}
                        name="category"
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className={`h-11 border-gray-200 rounded-lg text-[14px] w-full ${errors.category ? "border-red-500" : ""}`}>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {CATEGORIES.map((cat) => (
                                <SelectItem key={cat.name} value={cat.name}>
                                  {cat.icon} {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
                    </div>

                    {/* Date Picker */}
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-[#4B5563]">
                        Event Date
                      </label>
                      <Controller
                        control={control}
                        name="eventDate"
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={`w-full h-11 justify-start text-left font-normal border-gray-200 rounded-lg ${!field.value && "text-muted-foreground"} ${errors.eventDate ? "border-red-500" : ""}`}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                      {errors.eventDate && <p className="text-red-500 text-xs">{errors.eventDate.message}</p>}
                    </div>

                    {/* Start & End Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-semibold text-[#4B5563]">Start Time</label>
                        <Input
                          {...register("startTime")}
                          type="time"
                          className="h-11 border-gray-200 rounded-lg text-[14px]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-semibold text-[#4B5563]">End Time</label>
                        <Input
                          {...register("endTime")}
                          type="time"
                          className="h-11 border-gray-200 rounded-lg text-[14px]"
                        />
                      </div>
                    </div>

                    {/* Duration & Price */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-semibold text-[#4B5563]">Duration</label>
                        <Input
                          {...register("duration")}
                          placeholder="e.g. 3 hours"
                          className="h-11 border-gray-200 rounded-lg text-[14px]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-semibold text-[#4B5563]">Price (AED)</label>
                        <Input
                          {...register("price", { valueAsNumber: true })}
                          type="number"
                          className="h-11 border-gray-200 rounded-lg text-[14px]"
                        />
                      </div>
                    </div>

                    {/* Venue & City */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-semibold text-[#4B5563]">Venue Name</label>
                        <Input
                          {...register("venueName")}
                          placeholder="Stadium name"
                          className="h-11 border-gray-200 rounded-lg text-[14px]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-semibold text-[#4B5563]">City</label>
                        <Controller
                          control={control}
                          name="city"
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className={`h-11 border-gray-200 rounded-lg text-[14px] w-full ${errors.city ? "border-red-500" : ""}`}>
                                <SelectValue placeholder="Select city" />
                              </SelectTrigger>
                              <SelectContent>
                                {CITIES.map((city) => (
                                  <SelectItem key={city} value={city}>
                                    {city}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-5">
                    {/* Thumbnail Upload */}
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-[#4B5563]">
                        Thumbnail Image
                      </label>
                      <div className="relative group">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="thumbnail-upload"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setValue("thumbnail", file, { shouldValidate: true });
                              const objectUrl = URL.createObjectURL(file);
                              setPreviewUrl(objectUrl);
                            }
                          }}
                        />
                        <div className="flex gap-4">
                          <label
                            htmlFor="thumbnail-upload"
                            className={`flex flex-col items-center justify-center flex-1 h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden ${errors.thumbnail ? "border-red-500" : ""}`}
                          >
                            {previewUrl ? (
                              <div className="relative w-full h-full">
                                <img
                                  src={previewUrl}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="flex flex-col items-center gap-1 text-white">
                                    <Upload size={20} />
                                    <span className="text-[10px]">Change Image</span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-1 text-gray-400">
                                <Upload size={24} />
                                <span className="text-xs">Click to upload image</span>
                              </div>
                            )}
                          </label>
                          {editingEvent && watch("thumbnail") instanceof File && (
                            <Button
                              type="button"
                              onClick={handleThumbnailUpdate}
                              disabled={isUpdatingThumbnail}
                              className="h-32 w-24 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-white flex-col gap-2 p-2 shrink-0 transition-all duration-200 animate-in fade-in zoom-in"
                            >
                              {isUpdatingThumbnail ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <RotateCcw className="w-5 h-5" />
                              )}
                              <span className="text-[10px] text-center leading-tight">Update Thumbnail</span>
                            </Button>
                          )}
                        </div>
                      </div>
                      {errors.thumbnail && <p className="text-red-500 text-xs">{errors.thumbnail.message as string}</p>}
                    </div>

                    {/* Location Selection */}
                    {/* <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-[#4B5563]">
                        Location (Latitude & Longitude)
                      </label>
                      <div
                        className="relative cursor-pointer group"
                        onClick={() => setIsLocationSheetOpen(true)}
                      >
                        <Input
                          placeholder="Click to pick on map 📍"
                          readOnly
                          value={watch("latitude") && watch("longitude") ? `${watch("latitude").toFixed(4)}, ${watch("longitude").toFixed(4)}` : ""}
                          className={`h-11 border-gray-200 rounded-lg text-[14px] cursor-pointer group-hover:border-brand-gold/50 transition-colors ${errors.latitude || errors.longitude ? "border-red-500" : ""}`}
                        />
                        <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-gold" size={18} />
                      </div>
                      {(errors.latitude || errors.longitude) && <p className="text-red-500 text-xs">Please select a location on map</p>}
                    </div> */}

                    {/* Address */}
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-[#4B5563]">Full Address</label>
                      <Input
                        {...register("address")}
                        placeholder="Detailed address"
                        className={`h-11 border-gray-200 rounded-lg text-[14px] ${errors.address ? "border-red-500" : ""}`}
                      />
                    </div>

                    {/* Toggles and Numerics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-semibold text-[#4B5563]">Capacity</label>
                        <Input
                          {...register("capacity", { valueAsNumber: true })}
                          type="number"
                          className="h-11 border-gray-200 rounded-lg text-[14px]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-semibold text-[#4B5563]">Age Limit</label>
                        <Input
                          {...register("ageLimit", { valueAsNumber: true })}
                          type="number"
                          className="h-11 border-gray-200 rounded-lg text-[14px]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="space-y-0.5">
                        <label className="text-[13px] font-bold text-[#1F2937]">Family Friendly</label>
                        <p className="text-[11px] text-gray-500">Is this event for all ages?</p>
                      </div>
                      <Controller
                        control={control}
                        name="isFamilyFriendly"
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-semibold text-[#4B5563]">Event Type</label>
                        <select
                          {...register("eventType")}
                          className="h-11 w-full border border-gray-200 rounded-lg px-3 text-[14px] bg-white appearance-none"
                        >
                          <option value="PAID">PAID</option>
                          <option value="FREE">FREE</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-semibold text-[#4B5563]">Status</label>
                        <select
                          {...register("status")}
                          className="h-11 w-full border border-gray-200 rounded-lg px-3 text-[14px] bg-white appearance-none"
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="INACTIVE">INACTIVE</option>
                          <option value="COMPLITE">COMPLETE</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full Width Text Areas */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#4B5563]">Description</label>
                    <textarea
                      {...register("description")}
                      placeholder="Enter detailed description..."
                      className={`flex min-h-[80px] w-full rounded-lg border border-gray-200 px-3 py-3 text-[14px] ${errors.description ? "border-red-500" : ""}`}
                    />
                    {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-[#4B5563]">About This Event</label>
                      <textarea
                        {...register("about")}
                        placeholder="What is this event about?"
                        className="flex min-h-[80px] w-full rounded-lg border border-gray-200 px-3 py-3 text-[14px]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-[#4B5563]">What to Expect</label>
                      <textarea
                        {...register("whatToExpect")}
                        placeholder="What should attendees expect?"
                        className="flex min-h-[80px] w-full rounded-lg border border-gray-200 px-3 py-3 text-[14px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-[#4B5563]">Highlights (Comma separated)</label>
                      <textarea
                        {...register("highlights")}
                        placeholder="Networking, Certificate, Food..."
                        className="flex min-h-[60px] w-full rounded-lg border border-gray-200 px-3 py-3 text-[14px]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-[#4B5563]">Cancellation Policy</label>
                      <textarea
                        {...register("cancellationPolicy")}
                        placeholder="Refund policy details..."
                        className="flex min-h-[60px] w-full rounded-lg border border-gray-200 px-3 py-3 text-[14px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 order-2 md:order-1 h-12 rounded-xl border-gray-200 text-black font-semibold hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={isCreating || isUpdating}
                    className="flex-1 order-1 md:order-2 h-12 rounded-xl bg-brand-gold hover:bg-brand-gold-hover text-white font-bold"
                  >
                    {isCreating || isUpdating ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {isUpdating ? "Updating..." : "Publishing..."}
                      </div>
                    ) : (
                      editingEvent ? "Update Event" : "Publish Event"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 md:px-8">
        {/* Total Events */}
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="bg-brand-purple p-3 rounded-2xl w-fit">
              <Ticket className="text-white w-6 h-6" />
            </div>
            <div>
              <div className="text-gray-500 text-sm font-medium">Total Events</div>
              <div className="text-2xl font-bold mt-0.5">
                {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : stats?.totalActiveEvent ?? 0}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">
              Active
            </span>
            <span className="text-gray-400">Total active events</span>
          </div>
        </div>

        {/* Free Events */}
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="bg-brand-gold p-3 rounded-2xl w-fit">
              <Users className="text-white w-6 h-6" />
            </div>
            <div>
              <div className="text-gray-500 text-sm font-medium">Free Events</div>
              <div className="text-2xl font-bold mt-0.5">
                {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : stats?.totalFreeEvent ?? 0}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
              Free
            </span>
            <span className="text-gray-400">All free access events</span>
          </div>
        </div>

        {/* Paid Events */}
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 p-3 rounded-2xl w-fit">
              <DollarSign className="text-white w-6 h-6" />
            </div>
            <div>
              <div className="text-gray-500 text-sm font-medium">Paid Events</div>
              <div className="text-2xl font-bold mt-0.5">
                {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : stats?.totalPaidEvent ?? 0}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full font-medium">
              Paid
            </span>
            <span className="text-gray-400">Total paid events</span>
          </div>
        </div>

        {/* Inactive Events */}
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="bg-amber-500 p-3 rounded-2xl w-fit">
              <Trash2 className="text-white w-6 h-6" />
            </div>
            <div>
              <div className="text-gray-500 text-sm font-medium">Inactive</div>
              <div className="text-2xl font-bold mt-0.5">
                {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : stats?.totalIncativeEvent ?? 0}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
              Inactive
            </span>
            <span className="text-gray-400">Draft or inactive events</span>
          </div>
        </div>
      </div>


      {/* Filter / Search Bar */}
      <div className="px-6 md:px-8 mb-8">
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
            {/* Category Filter */}
            <Select value={categoryFilter || "all"} onValueChange={(val) => setCategoryFilter(val === "all" ? "" : val)}>
              <SelectTrigger className="bg-white border-gray-200 rounded-xl h-11 px-4 font-medium flex items-center gap-2 text-gray-700 hover:bg-gray-50 flex-1 sm:flex-initial shadow-none">
                <LayoutDashboard size={18} className="text-gray-400" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* City Filter */}
            <Select value={cityFilter || "all"} onValueChange={(val) => setCityFilter(val === "all" ? "" : val)}>
              <SelectTrigger className="bg-white border-gray-200 rounded-xl h-11 px-4 font-medium flex items-center gap-2 text-gray-700 hover:bg-gray-50 flex-1 sm:flex-initial shadow-none">
                <MapPin size={18} className="text-gray-400" />
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {CITIES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter || "all"} onValueChange={(val) => setStatusFilter(val === "all" ? "" : val)}>
              <SelectTrigger className="bg-white border-gray-200 rounded-xl h-11 px-4 font-medium flex items-center gap-2 text-gray-700 hover:bg-gray-50 flex-1 sm:flex-initial shadow-none">
                <Activity size={18} className="text-gray-400" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="COMPLITE">Complete</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#F8FAFC] rounded-2xl overflow-hidden border border-gray-100 px-6 md:px-8">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-[#EEF2F6]">
              <TableRow className="border-none hover:bg-[#EEF2F6]">
                <TableHead className="py-4 font-semibold text-gray-700 h-auto w-[30%] pl-6">
                  Events
                </TableHead>
                <TableHead className="py-4 font-semibold text-gray-700 h-auto">
                  Category
                </TableHead>
                <TableHead className="py-4 font-semibold text-gray-700 h-auto hidden md:table-cell">
                  Date
                </TableHead>
                <TableHead className="py-4 font-semibold text-gray-700 h-auto">
                  Capacity
                </TableHead>
                <TableHead className="py-4 font-semibold text-gray-700 h-auto hidden lg:table-cell">
                  Revenue
                </TableHead>
                <TableHead className="py-4 font-semibold text-gray-700 h-auto">
                  Status
                </TableHead>
                <TableHead className="py-4 font-semibold text-gray-700 h-auto text-right pr-6">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={7} className="h-16">
                      <div className="flex items-center space-x-4 px-6">
                        <div className="h-4 w-1/4 bg-gray-100 animate-pulse rounded" />
                        <div className="h-4 w-1/6 bg-gray-100 animate-pulse rounded" />
                        <div className="h-4 w-1/6 bg-gray-100 animate-pulse rounded" />
                        <div className="h-4 w-1/8 bg-gray-100 animate-pulse rounded" />
                        <div className="h-4 w-1/8 bg-gray-100 animate-pulse rounded" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : events.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-gray-500">
                    No events found
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => {
                  const capacity = event.capacity || 1;
                  const booked = event._count?.bookings ?? (event.capacity - (event.availableSeats || 0));
                  const percentage = (booked / capacity) * 100;

                  return (
                    <TableRow
                      key={event.eventId}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <TableCell className="py-4 pl-6">
                        <div className="font-semibold text-gray-900 text-[15px]">
                          {event.title}
                        </div>
                        <div className="text-gray-500 text-[13px]">
                          {event.city}, {event.venueName}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-medium bg-green-50 text-green-600 border border-green-100/50">
                          {event.category}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-gray-600 text-[14px] hidden md:table-cell">
                        {event.eventDate ? format(new Date(event.eventDate), "MMM dd, yyyy") : "N/A"}
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-col gap-1.5 w-full max-w-30">
                          <span className="text-gray-900 font-semibold text-[14px]">
                            {booked}
                            <span className="text-gray-400 font-normal">
                              / {event.capacity}
                            </span>
                          </span>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-purple rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 font-semibold text-gray-900 text-[14px] hidden lg:table-cell">
                        AED {event.price}
                      </TableCell>
                      <TableCell className="py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${event.status === "ACTIVE"
                            ? "bg-brand-success text-brand-success-text"
                            : "bg-amber-100 text-amber-700"
                            }  
                            ${event.status === "INACTIVE"
                              ? "bg-red-50 text-red-600 border-red-100/50"
                              : ""
                            }
                            ${event.status === "COMPLITE" ? "bg-blue-50 text-blue-600 border-blue-100/50" : ""}
                            `}
                        >
                          {/* {event.status} */}
                          {event.status === "COMPLITE" ? "Completed" : ""}
                          {event.status === "ACTIVE" ? "Active" : ""}
                          {event.status === "INACTIVE" ? "Inactive" : ""}
                          {event.status === "CANCELLED" ? "Cancelled" : ""}
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

                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => handleEdit(event)}
                            >
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                              onClick={() => deleteEvent(String(event.eventId))}
                              disabled={isDeleting}
                            >
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="bg-white py-4 px-6 flex items-center justify-center gap-2 border-t border-gray-50">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || isLoading}
            className="text-gray-500 text-sm font-medium hover:text-gray-900 flex items-center mr-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronDown className="w-4 h-4 mr-1 rotate-90" /> Previous
          </button>

          {meta && Array.from({ length: meta.totalPage }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-colors ${page === i + 1 ? "bg-blue-50 text-brand-purple" : "text-gray-600 hover:bg-gray-100"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => (meta && p < meta.totalPage ? p + 1 : p))}
            disabled={!meta || page >= meta.totalPage || isLoading}
            className="text-gray-900 text-sm font-medium hover:text-brand-purple flex items-center ml-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Next <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
          </button>
        </div>
      </div>

      {/* Location Picker Sheet */}
      <Sheet open={isLocationSheetOpen} onOpenChange={setIsLocationSheetOpen}>
        <SheetContent
          side="bottom"
          className="h-[85vh] sm:h-[90vh] p-0 flex flex-col rounded-t-2xl"
        >
          <SheetHeader className="px-6 pt-6 pb-4 border-b">
            <SheetTitle>Select Event Venue Location</SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground mt-1">
              Select the correct location by clicking on the map or dragging the marker.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 relative min-h-[400px] bg-gray-50">
            <LocationPicker
              onConfirm={(location) => {
                setSelectedLocation(location);
                setValue("latitude", location.lat);
                setValue("longitude", location.lng, { shouldValidate: true });
                setIsLocationSheetOpen(false);
              }}
              initialLocation={selectedLocation}
            />
          </div>

          <SheetFooter className="px-6 py-4 border-t flex justify-between items-center shrink-0">
            <div className="text-sm text-gray-600 font-mono">
              {selectedLocation
                ? `Selected: ${selectedLocation.lat.toFixed(6)}, ${selectedLocation.lng.toFixed(6)}`
                : "No location selected."}
            </div>

            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
