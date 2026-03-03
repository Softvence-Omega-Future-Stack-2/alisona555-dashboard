"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap,
} from "react-leaflet";
import L from "leaflet";
// Leaflet CSS is now imported in globals.css
import { X, MapPin, Check, Search, Loader2 } from "lucide-react";

// Fix for default marker icon in Leaflet + Next.js
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface LocationPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (location: { lat: number; lng: number; address: string }) => void;
    initialLocation?: { lat: number; lng: number; address: string } | null;
}

// Component to handle map clicks and marker placement
function LocationMarker({
    position,
    setPosition,
}: {
    position: [number, number] | null;
    setPosition: (pos: [number, number]) => void;
}) {
    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
    });

    return position === null ? null : <Marker position={position} />;
}

// Component to update map center when position changes
function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

// Component to fix map sizing issues in modals
function MapResizer() {
    const map = useMap();
    useEffect(() => {
        // Delay slightly to ensure the modal animation hasn't messed with the container size
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 300);
        return () => clearTimeout(timer);
    }, [map]);
    return null;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
    isOpen,
    onClose,
    onConfirm,
    initialLocation,
}) => {
    const [position, setPosition] = useState<[number, number] | null>(
        initialLocation ? [initialLocation.lat, initialLocation.lng] : null
    );
    const [address, setAddress] = useState(initialLocation?.address || "");
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const dubaiCenter: [number, number] = [25.276987, 55.296249];

    // Reverse geocoding using Nominatim (free OSM service)
    useEffect(() => {
        const fetchAddress = async () => {
            if (!position) return;
            setLoading(true);
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position[0]}&lon=${position[1]}`
                );
                const data = await res.json();
                if (data.display_name) {
                    setAddress(data.display_name);
                }
            } catch (error) {
                console.error("Error fetching address:", error);
            } finally {
                setLoading(false);
            }
        };

        // Only fetch if position changed and it's not the initial load or if initial address is empty
        if (position && (!initialLocation || (position[0] !== initialLocation.lat || position[1] !== initialLocation.lng) || !address)) {
            const timeoutId = setTimeout(fetchAddress, 500); // Debounce
            return () => clearTimeout(timeoutId);
        }
    }, [position]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
                    searchQuery
                )}`
            );
            const data = await res.json();
            if (data && data.length > 0) {
                const first = data[0];
                const newPos: [number, number] = [parseFloat(first.lat), parseFloat(first.lon)];
                setPosition(newPos);
                setAddress(first.display_name);
            }
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleConfirm = () => {
        if (position) {
            onConfirm({
                lat: position[0],
                lng: position[1],
                address: address,
            });
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <MapPin className="text-brand-gold w-5 h-5" />
                            Pick Venue Location
                        </h3>
                        <p className="text-sm text-gray-500">Click on the map to set the event location</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="px-6 py-3 bg-gray-50/50 border-b border-gray-100">
                    <form onSubmit={handleSearch} className="relative flex gap-2">
                        <div className="relative flex-1">
                            <InputWithIcon
                                placeholder="Search for an area, building, or landmark..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="px-4 py-2 bg-brand-gold text-white rounded-lg font-semibold text-sm hover:bg-brand-gold-hover transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
                        </button>
                    </form>
                </div>

                {/* Map Container */}
                <div className="flex-1 relative min-h-[400px] h-[50vh] md:h-[60vh] lg:h-[70vh]">
                    <MapContainer
                        center={position || dubaiCenter}
                        zoom={13}
                        style={{ height: "100%", width: "100%" }}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker position={position} setPosition={setPosition} />
                        {position && <ChangeView center={position} />}
                        <MapResizer />
                    </MapContainer>
                </div>

                {/* Footer info & Actions */}
                <div className="bg-white p-6 border-t border-gray-100">
                    <div className="mb-4">
                        <label className="text-[13px] font-semibold text-gray-500 block mb-1">
                            Selected Location Details
                        </label>
                        <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <div className="mt-0.5">
                                {loading ? (
                                    <Loader2 className="w-4 h-4 text-brand-gold animate-spin" />
                                ) : (
                                    <MapPin className="w-4 h-4 text-brand-gold" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {address || (position ? "Fetching address..." : "Click map to select location")}
                                </p>
                                {position && (
                                    <p className="text-xs text-gray-500 mt-0.5 font-mono">
                                        {position[0].toFixed(6)}, {position[1].toFixed(6)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 h-11 rounded-xl border border-gray-200 text-gray-700 font-semibold text-[15px] hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={!position || loading}
                            className="px-6 h-11 rounded-xl bg-brand-gold hover:bg-brand-gold-hover text-white font-bold text-[15px] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(219,152,6,0.25)]"
                        >
                            <Check size={18} />
                            Confirm Location
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Internal small UI component for search input
const InputWithIcon = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        {...props}
        className="w-full h-10 pl-10 pr-4 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold outline-none transition-all placeholder:text-gray-400"
    />
);

export default LocationPicker;
