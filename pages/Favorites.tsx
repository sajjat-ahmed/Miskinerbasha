
import React from 'react';
import { Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Room } from '../types';
import RoomCard from '../components/RoomCard';

interface FavoritesProps {
  rooms: Room[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ rooms, favorites, toggleFavorite }) => {
  const favoriteRooms = rooms.filter(r => favorites.includes(r.id));

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 custom-scrollbar p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-black text-gray-900">Your Favorites</h1>
          <p className="text-gray-500 font-medium">Keep track of the rooms you liked.</p>
        </div>

        {favoriteRooms.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-6">
              <Heart size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-4">No favorites yet</h2>
            <p className="text-gray-500 max-w-sm mb-10 leading-relaxed">
              When you find a room you like, click the heart icon to save it here for later.
            </p>
            <Link to="/explore" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2">
              <Search size={20} />
              Browse Rooms
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteRooms.map(room => (
              <RoomCard 
                key={room.id} 
                room={room} 
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(room.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
