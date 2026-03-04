"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "./ui/button";

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
        // Sheet open হওয়ার পর invalidateSize একাধিকবার কল
        const timers = [
            setTimeout(() => map.invalidateSize({ animate: false }), 100),
            setTimeout(() => map.invalidateSize({ animate: false }), 300),
            setTimeout(() => map.invalidateSize({ animate: false }), 600),
        ];

        // resize event fallback
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

    const defaultCenter: [number, number] = [25.276987, 55.296249]; // Dubai

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
        <div className="h-full w-full">
            <MapContainer
                center={position || defaultCenter}
                zoom={position ? 15 : 10}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapUpdater />
                <LocationMarker />
            </MapContainer>

            {/* Confirm button – SheetFooter-এ নয়, এখানে রাখলে ভালো */}
            {position && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000]">
                    <Button
                        onClick={() => onConfirm({ lat: position[0], lng: position[1] })}
                        className="bg-brand-gold hover:bg-brand-gold-hover text-white shadow-lg"
                    >
                        Confirm This Location
                    </Button>
                </div>
            )}
        </div>
    );
}