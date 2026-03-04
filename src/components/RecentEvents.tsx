 

interface Event {
  eventId: string;
  title: string;
  category: string;
  price: number;
  status: string;
  // add other fields if needed
}

interface RecentEventsProps {
  events: Event[];
}
// { events }: RecentEventsProps
const RecentEvents =  ({ events }: RecentEventsProps) => { 
 
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Events</h3>
      </div>

      <div className="flex flex-col gap-3">
        {events?.map((event) => (
          <div
            key={event.eventId}
            className="bg-[#F8FAFC] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between border border-gray-50 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col gap-1 mb-2 sm:mb-0">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-900 text-[15px]">{event.title}</span>
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${event.status === 'ACTIVE'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                    }`}
                >
                  {event.status.toLowerCase()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">{event.category}</span>
                <span className="text-emerald-500 font-medium">AED {event.price}</span>
              </div>
            </div>
          </div>
        ))}
        {(!events || events.length === 0) && (
          <p className="text-gray-500 text-center py-4">No recent events found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentEvents;
