import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Map as MapIcon, 
  List, 
  Heart, 
  User as UserIcon, 
  PlusCircle, 
  Menu, 
  X,
  Home as HomeIcon,
  Compass,
  ArrowRight,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import RoomDetail from './pages/RoomDetail.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CreateListing from './pages/CreateListing.jsx';
import Favorites from './pages/Favorites.jsx';
import AuthModal from './components/AuthModal.jsx';
import { MOCK_ROOMS } from './mockData.js';

const Navbar = ({ 
  user, 
  onLogout, 
  onLoginClick, 
  toggleMenu 
}) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [showDropdown, setShowDropdown] = useState(false);

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
        {user?.role === 'owner' && (
          <Link to="/dashboard" className={`${isActive('/dashboard') ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'} transition-colors`}>Dashboard</Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {user?.role === 'owner' && (
          <Link to="/create" className="hidden sm:flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
            <PlusCircle size={18} />
            Post Room
          </Link>
        )}
        
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 p-1.5 rounded-2xl transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-100 border border-indigo-200 overflow-hidden">
                <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="profile" />
              </div>
              <span className="hidden lg:block text-sm font-bold text-gray-900 pr-2">{user.name.split(' ')[0]}</span>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 shadow-2xl rounded-3xl p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-3 border-b border-gray-50 mb-2">
                  <p className="font-black text-gray-900 text-sm truncate">{user.name}</p>
                  <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{user.role}</p>
                </div>
                <div className="space-y-1">
                  <Link 
                    to={user.role === 'owner' ? '/dashboard' : '/favorites'} 
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 rounded-xl transition-all text-sm font-bold"
                  >
                    <LayoutDashboard size={18} />
                    My Workspace
                  </Link>
                  <button 
                    onClick={() => { onLogout(); setShowDropdown(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-rose-50 text-gray-600 hover:text-rose-600 rounded-xl transition-all text-sm font-bold"
                  >
                    <LogOut size={18} />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={onLoginClick}
            className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-black transition-all shadow-xl shadow-gray-200"
          >
            Log In
          </button>
        )}

        <button className="md:hidden text-gray-500" onClick={toggleMenu}>
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

const MobileMenu = ({ isOpen, close, user, onLoginClick }) => {
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
        {user?.role === 'owner' && (
          <Link to="/dashboard" onClick={close} className="flex items-center gap-4 text-gray-800"><LayoutDashboard /> Dashboard</Link>
        )}
      </div>
      <div className="mt-auto flex flex-col gap-4">
        {!user ? (
          <button 
            onClick={() => { onLoginClick(); close(); }}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-4 rounded-xl font-bold"
          >
            Log In to Continue
          </button>
        ) : (
          user.role === 'owner' && (
            <Link to="/create" onClick={close} className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-4 rounded-xl font-bold">
              <PlusCircle /> Post a Room
            </Link>
          )
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [rooms, setRooms] = useState(MOCK_ROOMS);
  const [favorites, setFavorites] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [bookingRequests, setBookingRequests] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const toggleFavorite = (id) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const addBookingRequest = (request) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    const newRequest = {
      ...request,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      studentName: currentUser.name,
      studentEmail: currentUser.email
    };
    setBookingRequests(prev => [newRequest, ...prev]);
  };

  const updateRequestStatus = (id, status) => {
    setBookingRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar 
          user={currentUser} 
          onLogout={handleLogout} 
          onLoginClick={() => setIsAuthModalOpen(true)}
          toggleMenu={() => setIsMenuOpen(true)} 
        />
        <MobileMenu 
          isOpen={isMenuOpen} 
          close={() => setIsMenuOpen(false)} 
          user={currentUser}
          onLoginClick={() => setIsAuthModalOpen(true)}
        />
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          onLogin={handleLogin} 
        />
        
        <main className="flex-1 overflow-hidden flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore rooms={rooms} favorites={favorites} toggleFavorite={toggleFavorite} />} />
            <Route 
              path="/room/:id" 
              element={
                <RoomDetail 
                  rooms={rooms} 
                  favorites={favorites} 
                  toggleFavorite={toggleFavorite} 
                  onBookRequest={addBookingRequest}
                  currentUser={currentUser}
                  onLoginRequired={() => setIsAuthModalOpen(true)}
                />
              } 
            />
            <Route path="/dashboard" element={<Dashboard rooms={rooms} bookingRequests={bookingRequests} onUpdateStatus={updateRequestStatus} user={currentUser} />} />
            <Route path="/create" element={<CreateListing setRooms={setRooms} user={currentUser} onLoginRequired={() => setIsAuthModalOpen(true)} />} />
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
