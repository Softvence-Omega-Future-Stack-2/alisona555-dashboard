"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"; // shadcn input

// icon fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface LocationPickerContentProps {
    onConfirm: (location: { lat: number; lng: number; address?: string }) => void;
    initialLocation: { lat: number; lng: number; address?: string } | null;
}

function MapUpdater() {
    const map = useMap();

    useEffect(() => {
        const timers = [
            setTimeout(() => map.invalidateSize({ animate: false }), 100),
            setTimeout(() => map.invalidateSize({ animate: false }), 300),
            setTimeout(() => map.invalidateSize({ animate: false }), 600),
        ];

        const handleResize = () => map.invalidateSize();
        window.addEventListener("resize", handleResize);

        return () => {
            timers.forEach(clearTimeout);
            window.removeEventListener("resize", handleResize);
        };
    }, [map]);

    return null;
}

export default function LocationPickerContent({
    onConfirm,
    initialLocation,
}: LocationPickerContentProps) {
    const [position, setPosition] = useState<[number, number] | null>(
        initialLocation ? [initialLocation.lat, initialLocation.lng] : null
    );

    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const mapRef = useRef<any>(null);

    const defaultCenter: [number, number] = [25.276987, 55.296249]; // Dubai

    // Nominatim দিয়ে সার্চ করা
    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon, display_name } = data[0];
                const newPos: [number, number] = [parseFloat(lat), parseFloat(lon)];

                setPosition(newPos);
                setSearchQuery(display_name); // অ্যাড্রেস দেখানো

                // ম্যাপ সেন্টার করা + জুম
                if (mapRef.current) {
                    mapRef.current.setView(newPos, 15);
                }
            } else {
                alert("কোনো লোকেশন পাওয়া যায়নি। অন্য নাম দিয়ে চেষ্টা করুন।");
            }
        } catch (err) {
            console.error("Search error:", err);
            alert("সার্চ করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
        } finally {
            setIsSearching(false);
        }
    };

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
            },
        });

        return position ? (
            <Marker
                position={position}
                draggable
                eventHandlers={{
                    dragend(e) {
                        const { lat, lng } = e.target.getLatLng();
                        setPosition([lat, lng]);
                    },
                }}
            />
        ) : null;
    };

    return (
        <div className="h-full w-full flex flex-col">
            {/* সার্চ বার */}
            <div className="p-4 bg-white border-b flex gap-2 items-center z-[1000]">
                <Input
                    placeholder="Search location (e.g. Burj Khalifa, Dubai)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1"
                />
                <Button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="bg-brand-gold hover:bg-brand-gold-hover min-w-[100px]"
                >
                    {isSearching ? "Searching..." : "Search"}
                </Button>
            </div>

            {/* ম্যাপ */}
            <div className="flex-1 relative">
                <MapContainer
                    center={position || defaultCenter}
                    zoom={position ? 15 : 10}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={true}
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapUpdater />
                    <LocationMarker />
                </MapContainer>

                {/* Confirm বাটন */}
                {position && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
                        <Button
                            onClick={() => onConfirm({
                                lat: position[0],
                                lng: position[1],
                                address: searchQuery || "Selected location"
                            })}
                            className="bg-brand-gold hover:bg-brand-gold-hover text-white shadow-xl px-8 py-6 text-lg"
                        >
                            Confirm This Location
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}