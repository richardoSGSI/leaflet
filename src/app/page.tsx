"use client";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const map = L.map("map").setView([51.505, -0.09], 13);
  
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div>
      <div id="map"></div>
    </div>
  );
}
