"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { GlassCard } from "@/components/ui/GlassCard";

// Custom Icons
const createCustomIcon = (color: string, isBouncing: boolean = false) => {
  return L.divIcon({
    className: "custom-pin",
    html: `<div class="w-4 h-4 rounded-full border-2 border-white ${
      color === "green" ? "bg-neon-green" : "bg-neon-red"
    } ${isBouncing ? "animate-bounce" : ""} shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const FACTORIES = [
  { id: 1, name: "Desh Garments", lat: 23.8103, lng: 90.4125, status: "green", owner: "Mr. Rahim" }, // Dhaka
  { id: 2, name: "Alpha Textiles", lat: 22.3569, lng: 91.7832, status: "red", owner: "Ms. Fatema" }, // Chittagong
  { id: 3, name: "Beta Fashions", lat: 23.7949, lng: 90.4043, status: "green", owner: "Mr. Karim" }, // Banani
];

export function OperationsMap({ isDemoMode }: { isDemoMode: boolean }) {
  const [factories, setFactories] = useState(FACTORIES);

  useEffect(() => {
    if (!isDemoMode) return;

    const interval = setInterval(() => {
      setFactories((prev) =>
        prev.map((f) => ({
          ...f,
          status: Math.random() > 0.7 ? (f.status === "green" ? "red" : "green") : f.status,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isDemoMode]);

  return (
    <GlassCard className="h-full w-full overflow-hidden relative">
      <div className="absolute top-4 left-4 z-[1000] bg-black/50 backdrop-blur-md p-2 rounded-lg border border-white/10">
        <h3 className="text-sm font-semibold text-white">Live Operations Map</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
          <span className="text-xs text-gray-400">Real-time Satellite Feed</span>
        </div>
      </div>

      <MapContainer
        center={[23.7, 90.4]}
        zoom={7}
        style={{ height: "100%", width: "100%", background: "#1a1a1a" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {factories.map((factory) => (
          <Marker
            key={factory.id}
            position={[factory.lat, factory.lng]}
            icon={createCustomIcon(factory.status, factory.status === "green" && isDemoMode && Math.random() > 0.8)}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[150px]">
                <h4 className="font-bold text-gray-900">{factory.name}</h4>
                <p className="text-xs text-gray-600">Owner: {factory.owner}</p>
                <div className={`mt-2 text-xs font-bold ${factory.status === 'green' ? 'text-green-600' : 'text-red-600'}`}>
                    {factory.status === 'green' ? '● Online < 1hr' : '● No Response > 24h'}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </GlassCard>
  );
}

