import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";

const originIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

const destIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149059.png",
  iconSize: [30, 30],
});

const MapView = ({ coordinates, origin, destination }) => {
  return (
    <MapContainer center={origin} zoom={10} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {origin && <Marker position={origin} icon={originIcon} />}
      {destination && <Marker position={destination} icon={destIcon} />}
      {coordinates.length > 0 && <Polyline positions={coordinates} color="blue" />}
    </MapContainer>
  );
};

export default MapView;
