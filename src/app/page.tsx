"use client";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import Link from "next/link";
import { useEffect } from "react";

class CoordRect {
  x1: number; // minX
  y1: number; // minY
  x2: number; // maxX
  y2: number; // maxY

  constructor(x1: number, y1: number, x2: number, y2: number, ) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}

export default function Home() {
  useEffect(() => {
    const map = L.map("map").setView([40.730610, -74.0060], 13);
  
    L.tileLayer('http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
    // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    //@ts-ignore
    L.GridLayer.GridDebug = L.GridLayer.extend({
      //@ts-ignore
      createTile: function (coords) {
        const tile = document.createElement('canvas');
        const context = tile.getContext("2d");

        if (!context) {
          return tile;
        }

        const tileSize = this.getTileSize();
        tile.setAttribute("width", tileSize.x.toString());
        tile.setAttribute("height", tileSize.y.toString());

        const xMin = -20_037_508.3427892;
        const yMin = -20_037_508.3427892;
        const xMax = 20_037_508.3427892;
        const yMax = 20_037_508.3427892;
    
        /*
         * Calculate the extent of the requested tile. This code assumes level 0 is the entire world as a single tile and
         * rows are counted north to south.
         */
        const tileWidth = (xMax - xMin) / Math.pow(2, coords.z);
        const tileHeight = (yMax - yMin) / Math.pow(2, coords.z);
        const tileXMin = xMin + (coords.x * tileWidth);
        const tileXMax = tileXMin + tileWidth;
        const tileYMax = yMax - (coords.y * tileHeight);
        const tileYMin = tileYMax - tileHeight;
        const pixelSize = tileWidth / tileSize.x;
    
        const tileBounds = new CoordRect(tileXMin, tileYMin, tileXMax, tileYMax);

      context.font = "12px sans-serif";
      context.fillText(`${coords.x},${coords.y},${coords.z}`, 0, 12);
      context.fillText(`x1:${tileBounds.x1}`, 0, 25);
      context.fillText(`y1:${tileBounds.y1}`, 0, 38);
      context.fillText(`x2:${tileBounds.x2}`, 0, 51);
      context.fillText(`y2:${tileBounds.y2}`, 0, 64);

      context.strokeRect(0, 0, tileSize.x, tileSize.y);
        return tile;
      },
    });
    
    //@ts-ignore
    L.gridLayer.gridDebug = function (opts) {
      //@ts-ignore
      return new L.GridLayer.GridDebug(opts);
    };
    
    //@ts-ignore
    map.addLayer(L.gridLayer.gridDebug());

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div>
      <h1>Map</h1>

      <Link href="/">Map</Link>
      <Link href="/animations">Animations</Link>
      <Link href="/charts">charts</Link>
      
      <div id="map"></div>
    </div>
  );
}
