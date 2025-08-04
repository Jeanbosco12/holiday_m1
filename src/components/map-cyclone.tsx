// components/map-cyclone.tsx
"use client";

import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

interface Cyclone {
  id: string;
  name: string;
  trajectory: [number, number][];
  category: string;
}

interface MapCycloneProps {
  cyclones: Cyclone[];
}

const cycloneIcon = new Icon({
  iconUrl: "/icons/cyclone.png",
  iconSize: [25, 25],
});

export default function MapCyclone({ cyclones }: MapCycloneProps) {
  return (
    <div className="h-[400px] w-full rounded-md overflow-hidden">
      <MapContainer
        center={[-18.8, 47.5]}
        zoom={5.5}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cyclones.map((cyclone) => (
          <div key={cyclone.id}>
            <Polyline
              positions={cyclone.trajectory}
              pathOptions={{ color: "red", weight: 3 }}
            />
            <Marker
              position={cyclone.trajectory[cyclone.trajectory.length - 1]}
              icon={cycloneIcon}
            >
              <Popup>
                <strong>{cyclone.name}</strong>
                <br />
                {cyclone.category}
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>
    </div>
  );
}
