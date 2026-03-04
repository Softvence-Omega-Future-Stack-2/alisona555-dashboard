import React from 'react';
import { Ticket } from "lucide-react";

interface Booking {
  eventId: string;
  title: string;
  category: string;
  createdAt: string;
  // add other fields if needed
}

interface RecentBookingsProps {
  bookings: Booking[];
}

const RecentBookings = ({ bookings }: RecentBookingsProps) => {
  console.log(bookings);
  return (
    <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Bookings</h3>

      <div className="flex flex-col gap-6 relative">
        {bookings?.map((booking, index) => (
          <div key={`${booking.eventId}-${index}`} className="flex gap-4 border-b border-gray-300/70 pb-4 last:border-0 last:pb-0">
            <div className="mt-1 shrink-0 w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
              <Ticket className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-800 leading-snug">
                New booking for <span className="font-semibold text-gray-900">{booking.title}</span>
              </p>
              <span className="text-xs text-gray-400 mt-1">
                {new Date(booking.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
        {(!bookings || bookings.length === 0) && (
          <p className="text-gray-500 text-center py-4">No recent bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentBookings;
