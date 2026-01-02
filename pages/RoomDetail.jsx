import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  CheckCircle, 
  Shield, 
  Phone, 
  MessageSquare,
  GraduationCap,
  Info,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Clock
} from 'lucide-react';
import { getAreaInsights } from '../geminiService.js';

const RoomDetail = ({ 
  rooms, 
  favorites, 
  toggleFavorite, 
  onBookRequest,
  currentUser,
  onLoginRequired
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find(r => r.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [aiInsight, setAiInsight] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    moveInDate: '',
    duration: '6 Months'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (room) {
      setLoadingAi(true);
      getAreaInsights(room.area).then(res => {
        setAiInsight(res);
        setLoadingAi(false);
      });
    }
  }, [room]);

  if (!room) return <div className="p-20 text-center">Room not found</div>;

  const isFavorite = favorites.includes(room.id);

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const handleRequestBook = () => {
    if (!currentUser) {
      onLoginRequired();
    } else {
      setIsBookingModalOpen(true);
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) return;
    
    onBookRequest({
      roomId: room.id,
      roomTitle: room.title,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      moveInDate: bookingFormData.moveInDate,
      duration: bookingFormData.duration
    });
    setIsBookingModalOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white custom-scrollbar pb-24 lg:pb-0">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-300">
          <CheckCircle size={18} />
          Booking Request Sent Successfully!
        </div>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsBookingModalOpen(false)} />
          <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-gray-900">Request to Book</h2>
                <button onClick={() => setIsBookingModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-8">
                <img src={room.images[0]} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-gray-900 line-clamp-1 text-sm">{room.title}</h4>
                  <p className="text-indigo-600 font-black text-lg">৳{room.price.toLocaleString()}</p>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Move-in Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="date" 
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-100 outline-none font-bold"
                      value={bookingFormData.moveInDate}
                      onChange={(e) => setBookingFormData({...bookingFormData, moveInDate: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Duration</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-100 outline-none font-bold appearance-none"
                      value={bookingFormData.duration}
                      onChange={(e) => setBookingFormData({...bookingFormData, duration: e.target.value})}
                    >
                      <option>3 Months</option>
                      <option>6 Months</option>
                      <option>12 Months</option>
                      <option>1 Year+</option>
                    </select>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 text-xs text-amber-700 font-medium leading-relaxed">
                  <strong>Note:</strong> Sending a request does not charge your card. The owner will review your profile and contact you.
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
                  Send Booking Request
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors font-medium">
            <ArrowLeft size={20} />
            Back to Explore
          </button>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 hover:bg-gray-50 transition-all text-sm font-semibold">
              <Share2 size={18} />
              Share
            </button>
            <button 
              onClick={() => toggleFavorite(room.id)}
              className={`flex items-center gap-2 border rounded-xl px-4 py-2 transition-all text-sm font-semibold ${
                isFavorite ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-gray-200 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
              {isFavorite ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-10">
            <div className="space-y-4">
              <div className="relative group aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-gray-100">
                <img 
                  src={room.images[activeImage]} 
                  alt={`${room.title} - view ${activeImage + 1}`} 
                  className="w-full h-full object-cover transition-opacity duration-300" 
                />
                {room.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-4 right-4 bg-gray-900/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                      {activeImage + 1} / {room.images.length}
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar scrollbar-hide">
                {room.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={`w-28 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 relative ${
                      activeImage === idx 
                        ? 'border-indigo-600 ring-2 ring-indigo-100 scale-95 shadow-md' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} />
                    {activeImage === idx && (
                      <div className="absolute inset-0 bg-indigo-600/10" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-indigo-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded tracking-tighter">New Listing</span>
                <span className="bg-gray-100 text-gray-500 text-[10px] font-black uppercase px-2 py-1 rounded tracking-tighter">{room.type} Room</span>
                <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase px-2 py-1 rounded tracking-tighter">
                  <CheckCircle size={10} /> Verified Listing
                </span>
              </div>
              <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">{room.title}</h1>
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <MapPin size={20} className="text-indigo-600" />
                {room.location.address}
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 font-bold uppercase">Room Type</span>
                <span className="font-bold flex items-center gap-2"><Users size={16} /> {room.type}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 font-bold uppercase">Ideal For</span>
                <span className="font-bold flex items-center gap-2">{room.gender} Students</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 font-bold uppercase">Rent / Month</span>
                <span className="font-bold text-indigo-600 text-xl">৳{room.price.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 font-bold uppercase">Deposit</span>
                <span className="font-bold">1 Month Adv.</span>
              </div>
            </div>

            <div className="bg-indigo-50/50 rounded-3xl p-8 border border-indigo-100 relative overflow-hidden group">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-600 text-white p-2 rounded-xl"><Info size={20} /></div>
                <h3 className="font-bold text-indigo-900">AI Local Area Insights</h3>
              </div>
              {loadingAi ? (
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce delay-150"></div>
                </div>
              ) : (
                <div className="text-indigo-800 text-sm leading-relaxed whitespace-pre-line">
                  {aiInsight}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">About the room</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {room.description}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">What this place offers</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6">
                {room.amenities.map(item => (
                  <div key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle size={20} className="text-indigo-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-white p-2 rounded-xl text-indigo-600 shadow-sm"><GraduationCap /></div>
                <h3 className="text-2xl font-bold">Near Your University</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {room.nearbyUniversities.map(uni => (
                  <div key={uni.name} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <span className="font-bold">{uni.name}</span>
                    <span className="text-indigo-600 text-sm font-black">{uni.distance} away</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-96">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white border border-gray-100 shadow-2xl shadow-indigo-100/50 rounded-3xl p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-10"></div>
                
                <div className="mb-8">
                  <p className="text-gray-400 text-sm font-bold uppercase mb-1">Total Monthly Rent</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-gray-900">৳{room.price.toLocaleString()}</span>
                    <span className="text-gray-400 mb-1 font-bold">/mo</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Utilities Included</span>
                    <span className="text-emerald-600 font-bold">Yes</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Service Charge</span>
                    <span className="font-bold">৳0</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Booking Fee</span>
                    <span className="font-bold">৳500 (Platform)</span>
                  </div>
                  <hr className="border-gray-50" />
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Grand Total</span>
                    <span className="text-indigo-600">৳{room.price + 500}</span>
                  </div>
                </div>

                <button 
                  onClick={handleRequestBook}
                  className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 mb-4"
                >
                  Request to Book
                </button>

                <div className="flex gap-2">
                  <button className="flex-1 bg-white border border-gray-200 text-gray-900 py-4 rounded-2xl font-black text-sm shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                    <Phone size={18} />
                    Call
                  </button>
                  <button className="flex-1 bg-emerald-500 text-white py-4 rounded-2xl font-black text-sm shadow-md hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                    <MessageSquare size={18} />
                    WhatsApp
                  </button>
                </div>
                
                <p className="mt-6 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">Available from Nov 1st</p>
              </div>

              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 flex items-center gap-4">
                <img src={`https://picsum.photos/id/${parseInt(room.id)+50}/100/100`} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Owner</p>
                  <p className="font-bold text-gray-900">{room.ownerName}</p>
                  <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-black uppercase">
                    <CheckCircle size={10} /> Verified Provider
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 flex items-start gap-4">
                <Shield className="text-amber-500 flex-shrink-0" />
                <p className="text-xs text-amber-700 leading-relaxed font-medium">
                  <strong>Safety Tip:</strong> Never send advance money via Bkash/Rocket without visiting the property and meeting the owner in person.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
