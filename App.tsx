
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Map as MapIcon, 
  List, 
  Heart, 
  User, 
  PlusCircle, 
  Menu, 
  X,
  Home as HomeIcon,
  Compass,
  ArrowRight
} from 'lucide-react';
import Home from './pages/Home';
import Explore from './pages/Explore';
import RoomDetail from './pages/RoomDetail';
import Dashboard from './pages/Dashboard';
import CreateListing from './pages/CreateListing';
import Favorites from './pages/Favorites';
import { Room, User as UserType } from './types';
import { MOCK_ROOMS } from './mockData';

const Navbar = ({ toggleMenu }: { toggleMenu: () => void }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 md:px-8 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <HomeIcon size={24} />
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">Miskiner<span className="text-indigo-600">basha</span></span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link to="/explore" className={`${isActive('/explore') ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'} transition-colors`}>Explore</Link>
        <Link to="/favorites" className={`${isActive('/favorites') ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'} transition-colors`}>Favorites</Link>
        <Link to="/dashboard" className={`${isActive('/dashboard') ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'} transition-colors`}>Dashboard</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/create" className="hidden sm:flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
          <PlusCircle size={18} />
          Post Room
        </Link>
        <button className="md:hidden text-gray-500" onClick={toggleMenu}>
          <Menu size={24} />
        </button>
        <div className="hidden md:block w-9 h-9 rounded-full bg-gray-200 border border-gray-100 overflow-hidden cursor-pointer">
          <img src="https://picsum.photos/id/64/100/100" alt="profile" />
        </div>
      </div>
    </nav>
  );
};

const MobileMenu = ({ isOpen, close }: { isOpen: boolean, close: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col p-6 animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center mb-12">
        <span className="text-2xl font-bold">Menu</span>
        <button onClick={close} className="p-2 text-gray-500"><X size={28} /></button>
      </div>
      <div className="flex flex-col gap-8 text-xl font-semibold">
        <Link to="/" onClick={close} className="flex items-center gap-4 text-gray-800"><HomeIcon /> Home</Link>
        <Link to="/explore" onClick={close} className="flex items-center gap-4 text-gray-800"><Compass /> Explore</Link>
        <Link to="/favorites" onClick={close} className="flex items-center gap-4 text-gray-800"><Heart /> Favorites</Link>
        <Link to="/dashboard" onClick={close} className="flex items-center gap-4 text-gray-800"><User /> My Profile</Link>
      </div>
      <div className="mt-auto">
        <Link to="/create" onClick={close} className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-4 rounded-xl font-bold">
          <PlusCircle /> Post a Room
        </Link>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(MOCK_ROOMS);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar toggleMenu={() => setIsMenuOpen(true)} />
        <MobileMenu isOpen={isMenuOpen} close={() => setIsMenuOpen(false)} />
        
        <main className="flex-1 overflow-hidden flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore rooms={rooms} favorites={favorites} toggleFavorite={toggleFavorite} />} />
            <Route path="/room/:id" element={<RoomDetail rooms={rooms} favorites={favorites} toggleFavorite={toggleFavorite} />} />
            <Route path="/dashboard" element={<Dashboard rooms={rooms} />} />
            <Route path="/create" element={<CreateListing setRooms={setRooms} />} />
            <Route path="/favorites" element={<Favorites rooms={rooms} favorites={favorites} toggleFavorite={toggleFavorite} />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-100 py-8 px-4 text-center md:px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <HomeIcon size={18} />
              </div>
              <span className="font-bold">Miskinerbasha</span>
            </div>
            <p className="text-gray-500 text-sm">© 2024 Miskinerbasha. Made for Dhaka Students.</p>
            <div className="flex gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-indigo-600">Privacy</a>
              <a href="#" className="hover:text-indigo-600">Terms</a>
              <a href="#" className="hover:text-indigo-600">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
