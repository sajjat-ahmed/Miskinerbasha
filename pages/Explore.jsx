import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  Map as MapIcon, 
  LayoutGrid, 
  Heart, 
  ChevronRight,
  Info,
  Navigation,
  List,
  RefreshCw
} from 'lucide-react';
import RoomCard from '../components/RoomCard.jsx';
import FilterModal from '../components/FilterModal.jsx';
import MapView from '../components/MapPlaceholder.jsx';

const Explore = ({ rooms, favorites, toggleFavorite }) => {
  const [viewMode, setViewMode] = useState('list');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchArea, setShowSearchArea] = useState(false);
  const [filters, setFilters] = useState({
    budget: 20000,
    type: 'all',
    gender: 'all',
    area: 'all'
  });

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const areaParam = params.get('area');
    if (areaParam) {
      setFilters(prev => ({ ...prev, area: areaParam }));
    }
  }, [location.search]);

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchesSearch = room.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          room.area.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBudget = room.price <= filters.budget;
      const matchesType = filters.type === 'all' || room.type === filters.type;
      const matchesGender = filters.gender === 'all' || room.gender === filters.gender;
      const matchesArea = filters.area === 'all' || room.area === filters.area;
      
      return matchesSearch && matchesBudget && matchesType && matchesGender && matchesArea;
    });
  }, [rooms, searchQuery, filters]);

  const handleMapBoundsChange = () => {
    if (!showSearchArea) {
      setShowSearchArea(true);
    }
  };

  const handleSearchThisArea = () => {
    setShowSearchArea(false);
    setFilters(prev => ({ ...prev, area: 'all' }));
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Search & Filter Header */}
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by area, title or landmark..." 
              className="w-full bg-gray-50 border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-gray-200 rounded-xl px-5 py-3 hover:bg-gray-50 font-medium transition-all"
            >
              <SlidersHorizontal size={18} />
              Filters
              {Object.values(filters).some(v => v !== 'all' && typeof v === 'string') && (
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              )}
            </button>
            
            <div className="flex p-1 bg-gray-100 rounded-xl">
              <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600 font-bold' : 'text-gray-500'}`}
              >
                <LayoutGrid size={18} />
                <span className="hidden sm:inline">List</span>
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-indigo-600 font-bold' : 'text-gray-500'}`}
              >
                <MapIcon size={18} />
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Results Side */}
        <div className={`flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 ${viewMode === 'map' ? 'hidden lg:block lg:max-w-md xl:max-w-xl' : 'w-full'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{filteredRooms.length} Rooms Available</h2>
                <p className="text-gray-500">Showing student-friendly housing in Dhaka</p>
              </div>
            </div>

            {filteredRooms.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">No rooms found</h3>
                <p className="text-gray-500 max-w-xs">Try adjusting your filters or searching in a different area.</p>
                <button 
                  onClick={() => setFilters({ budget: 20000, type: 'all', gender: 'all', area: 'all' })}
                  className="mt-6 text-indigo-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'list' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredRooms.map(room => (
                  <RoomCard 
                    key={room.id} 
                    room={room} 
                    isFavorite={favorites.includes(room.id)}
                    onToggleFavorite={() => toggleFavorite(room.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map Side */}
        {(viewMode === 'map' || window.innerWidth >= 1024) && (
          <div className={`flex-1 bg-gray-100 relative ${viewMode === 'map' ? 'block' : 'hidden lg:block'}`}>
            <MapView rooms={filteredRooms} onBoundsChange={handleMapBoundsChange} />
            
            {/* Search This Area Button */}
            {showSearchArea && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000]">
                <button 
                  onClick={handleSearchThisArea}
                  className="bg-white px-6 py-2.5 rounded-full shadow-2xl border border-gray-100 flex items-center gap-2 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-all animate-in fade-in zoom-in-95 duration-200"
                >
                  <RefreshCw size={16} className="text-indigo-600" />
                  Search this area
                </button>
              </div>
            )}

            {/* Overlay UI for Map */}
            <div className="absolute top-4 left-4 right-4 flex justify-center lg:hidden">
              <button 
                onClick={() => setViewMode('list')}
                className="bg-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2 text-indigo-600 animate-bounce"
              >
                <List size={20} />
                Show List
              </button>
            </div>
            
            <div className="absolute bottom-20 lg:bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-white px-6 py-3 rounded-full shadow-xl text-sm font-medium flex items-center gap-2 z-[1000]">
              <Navigation size={16} className="text-indigo-600" />
              Real-time map view
            </div>
          </div>
        )}
      </div>

      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        filters={filters} 
        setFilters={setFilters} 
      />
    </div>
  );
};

export default Explore;
