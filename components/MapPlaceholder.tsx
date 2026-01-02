
import React from 'react';
import { Room } from '../types';
import { MapPin } from 'lucide-react';

interface MapPlaceholderProps {
  rooms: Room[];
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ rooms }) => {
  return (
    <div className="w-full h-full bg-[#e3eaef] relative overflow-hidden">
      {/* Grid Pattern to look like a map */}
      <div className="absolute inset-0 opacity-20" style={{ 
        backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }}></div>

      {/* Simulated City Blocks */}
      <div className="absolute top-1/4 left-1/4 w-32 h-64 bg-white/40 rounded-lg -rotate-12 border border-indigo-200"></div>
      <div className="absolute top-1/2 right-1/4 w-48 h-32 bg-white/40 rounded-lg rotate-6 border border-indigo-200"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-48 bg-white/40 rounded-lg -rotate-6 border border-indigo-200"></div>

      {/* Markers */}
      {rooms.map((room, idx) => {
        // Deterministic random positions for markers based on room data if no actual lat/lng
        // Using room coords if they make sense relative to a center point or just demo offsets
        const top = 20 + (idx * 15) % 60;
        const left = 20 + (idx * 23) % 60;

        return (
          <div 
            key={room.id}
            className="absolute z-10 transition-transform hover:scale-110 cursor-pointer"
            style={{ top: `${top}%`, left: `${left}%` }}
          >
            <div className="relative group">
              <div className="bg-white border-2 border-indigo-600 px-3 py-1 rounded-full shadow-lg flex items-center gap-1 hover:bg-indigo-600 hover:text-white transition-all">
                <span className="text-xs font-black">৳{Math.floor(room.price/1000)}k</span>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-indigo-600"></div>
              
              {/* Tooltip/Small Card on Hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 bg-white rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none p-2 border border-gray-100">
                <img src={room.images[0]} className="w-full h-20 object-cover rounded-lg mb-2" />
                <p className="text-[10px] font-bold line-clamp-1">{room.title}</p>
                <p className="text-[10px] text-indigo-600 font-black">৳{room.price}</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Map Labels */}
      <div className="absolute top-10 left-10 text-gray-400 font-bold text-xl uppercase tracking-widest opacity-30 select-none">Dhaka City Map</div>
      <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2">
        <div className="bg-white p-2 rounded-lg shadow-md flex flex-col gap-1">
          <button className="w-8 h-8 flex items-center justify-center border-b border-gray-100 hover:bg-gray-50 text-gray-500 font-bold text-lg">+</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500 font-bold text-lg">-</button>
        </div>
      </div>
    </div>
  );
};

export default MapPlaceholder;
