import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Users, CheckCircle } from 'lucide-react';

const RoomCard = ({ room, isFavorite, onToggleFavorite }) => {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300 transform hover:-translate-y-1">
      {/* Favorite Button */}
      <button 
        onClick={(e) => { e.preventDefault(); onToggleFavorite(); }}
        className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md border transition-all ${
          isFavorite 
          ? 'bg-rose-500 border-rose-500 text-white' 
          : 'bg-white/70 border-white/50 text-gray-900 hover:bg-white'
        }`}
      >
        <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>

      {/* Image Gallery */}
      <Link to={`/room/${room.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={room.images[0]} 
            alt={room.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          {room.isVerified && (
            <div className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-emerald-500/30">
              <CheckCircle size={12} />
              Verified
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-semibold">
            {room.type} Room
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1">
              {room.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
            <MapPin size={14} className="text-gray-400" />
            <span>{room.area} • {room.location.address.split(',')[0]}</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
              <Users size={14} />
              {room.gender}
            </div>
            {room.amenities.slice(0, 2).map((amenity, idx) => (
              <span key={idx} className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                {amenity}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <div>
              <span className="text-2xl font-black text-indigo-600">৳{room.price.toLocaleString()}</span>
              <span className="text-gray-400 text-xs font-medium"> /month</span>
            </div>
            <div className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">
              Available
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
