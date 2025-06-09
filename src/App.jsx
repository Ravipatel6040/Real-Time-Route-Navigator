import React, { useState, useEffect } from "react";
import MapView from "./components/MapView";
import axios from "axios";

const API_KEY = "5b3ce3597851110001cf624810f3a455f4874b66b531b24d5a6db71b";

const App = () => {
  const [originText, setOriginText] = useState("Indore");
  const [destinationText, setDestinationText] = useState("Bhopal");
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  const geocode = async (address) => {
    const res = await axios.get("https://api.openrouteservice.org/geocode/search", {
      params: { api_key: API_KEY, text: address, size: 1 },
    });
    const [lon, lat] = res.data.features[0].geometry.coordinates;
    return [lat, lon];
  };

  const fetchRoute = async (from, to) => {
    const res = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        coordinates: [[from[1], from[0]], [to[1], to[0]]],
      },
      {
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const route = res.data.features[0];
    const coords = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
    setRouteCoords(coords);
  };

  useEffect(() => {
    const load = async () => {
      const from = await geocode(originText);
      const to = await geocode(destinationText);
      setOrigin(from);
      setDestination(to);
      await fetchRoute(from, to);
    };
    load();
  }, [originText, destinationText]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
          🧭 Real-Time Route Navigator
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row items-center gap-4 mb-8">
          <input
            type="text"
            value={originText}
            onChange={(e) => setOriginText(e.target.value)}
            className="p-3 rounded-md border border-blue-300 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter origin location"
          />
          <input
            type="text"
            value={destinationText}
            onChange={(e) => setDestinationText(e.target.value)}
            className="p-3 rounded-md border border-blue-300 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter destination location"
          />
        </div>

        <div className="h-[550px] rounded-xl overflow-hidden shadow-xl border border-blue-200">
          {origin && destination && (
            <MapView
              coordinates={routeCoords}
              origin={origin}
              destination={destination}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
