import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';

const MapView = ({ rooms, onBoundsChange }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const dhakaCenter = [23.777176, 90.399452];
    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
    }).setView(dhakaCenter, 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(mapRef.current);

    L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);

    mapRef.current.on('moveend', () => {
      if (mapRef.current && onBoundsChange) {
        onBoundsChange(mapRef.current.getBounds());
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    rooms.forEach(room => {
      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="marker-pin">৳${Math.floor(room.price / 1000)}k</div>`,
        iconSize: [40, 30],
        iconAnchor: [20, 15]
      });

      const marker = L.marker([room.location.lat, room.location.lng], { icon })
        .addTo(mapRef.current)
        .bindPopup(`
          <div class="flex flex-col">
            <img src="${room.images[0]}" class="w-full h-32 object-cover rounded-t-xl" alt="${room.title}" />
            <div class="p-3">
              <h4 class="font-bold text-gray-900 text-sm line-clamp-1">${room.title}</h4>
              <p class="text-xs text-indigo-600 font-black mb-2">৳${room.price.toLocaleString()} / month</p>
              <button id="view-room-${room.id}" class="w-full bg-indigo-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all">View Details</button>
            </div>
          </div>
        `, {
          closeButton: false,
          offset: L.point(0, -10)
        });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`view-room-${room.id}`);
        if (btn) {
          btn.addEventListener('click', () => {
            navigate(`/room/${room.id}`);
          });
        }
      });

      markersRef.current.push(marker);
    });

    if (rooms.length > 0 && mapRef.current) {
      const group = L.featureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [rooms, navigate]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default MapView;
