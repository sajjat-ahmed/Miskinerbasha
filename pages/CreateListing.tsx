
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { 
  Camera, 
  MapPin, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';
import { RoomType, GenderPreference, Room, User } from '../types';
import { getSmartRoomDescription } from '../geminiService';

interface CreateListingProps {
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  user: User | null;
  onLoginRequired: () => void;
}

const CreateListing: React.FC<CreateListingProps> = ({ setRooms, user, onLoginRequired }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loadingAi, setLoadingAi] = useState(false);
  
  if (!user || user.role !== 'owner') {
    return <Navigate to="/" replace />;
  }

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    area: 'Dhanmondi',
    address: '',
    type: RoomType.SINGLE,
    gender: GenderPreference.ANY,
    amenities: [] as string[],
    rules: [] as string[]
  });

  const amenitiesOptions = ['WiFi', 'Kitchen', 'Attached Bath', 'AC', 'Lift', 'Generator', 'Parking'];
  const rulesOptions = ['Bachelor Allowed', 'No Smoking', 'No Alcohol', 'No Parties', 'Curfew 11 PM'];

  const handleToggle = (list: string[], item: string, key: 'amenities' | 'rules') => {
    const updated = list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    setFormData({ ...formData, [key]: updated });
  };

  const generateDescription = async () => {
    if (!formData.title || !formData.area) return;
    setLoadingAi(true);
    const desc = await getSmartRoomDescription(formData);
    setFormData({ ...formData, description: desc });
    setLoadingAi(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRoom: Room = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      price: parseInt(formData.price),
      area: formData.area,
      location: {
        lat: 23.75,
        lng: 90.38,
        address: formData.address
      },
      type: formData.type,
      gender: formData.gender,
      amenities: formData.amenities,
      rules: formData.rules,
      images: ['https://picsum.photos/id/111/800/600'],
      ownerId: user.id,
      ownerName: user.name,
      isVerified: false,
      isAvailable: true,
      nearbyUniversities: [{ name: 'Nearby University', distance: '1.0 km' }],
      createdAt: new Date().toISOString()
    };
    
    setRooms(prev => [newRoom, ...prev]);
    navigate('/dashboard');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 custom-scrollbar p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-black mb-2">List Your Room</h1>
          <p className="text-gray-500 font-medium">Step {step} of 3 • {step === 1 ? 'Basic Info' : step === 2 ? 'Details & Features' : 'Photos & Location'}</p>
          
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1.5 w-12 rounded-full transition-all ${s <= step ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-indigo-100/30">
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Listing Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Spacious Single Room near UIU"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Area</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                  >
                    {['Dhanmondi', 'Mirpur', 'Uttara', 'Banani', 'Mohakhali', 'Mohammadpur'].map(a => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Monthly Rent (৳)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 5000"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Room Description</label>
                  <button 
                    type="button"
                    onClick={generateDescription}
                    disabled={loadingAi}
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                  >
                    <Sparkles size={14} />
                    {loadingAi ? 'AI Thinking...' : 'AI Enhance'}
                  </button>
                </div>
                <textarea 
                  rows={4}
                  placeholder="Tell students about the environment, housemates, etc."
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Room Type</label>
                  <div className="flex flex-col gap-2">
                    {[RoomType.SINGLE, RoomType.SHARED].map(t => (
                      <button 
                        key={t}
                        type="button"
                        onClick={() => setFormData({...formData, type: t})}
                        className={`p-4 rounded-2xl border font-bold text-sm transition-all text-left flex justify-between items-center ${formData.type === t ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 bg-gray-50 text-gray-400'}`}
                      >
                        {t} Room
                        {formData.type === t && <Check size={18} />}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Gender</label>
                  <div className="flex flex-col gap-2">
                    {[GenderPreference.MALE, GenderPreference.FEMALE, GenderPreference.ANY].map(g => (
                      <button 
                        key={g}
                        type="button"
                        onClick={() => setFormData({...formData, gender: g})}
                        className={`p-4 rounded-2xl border font-bold text-sm transition-all text-left flex justify-between items-center ${formData.gender === g ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 bg-gray-50 text-gray-400'}`}
                      >
                        {g === GenderPreference.ANY ? 'Any / Unisex' : g}
                        {formData.gender === g && <Check size={18} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Amenities Included</label>
                <div className="flex flex-wrap gap-2">
                  {amenitiesOptions.map(opt => (
                    <button 
                      key={opt}
                      type="button"
                      onClick={() => handleToggle(formData.amenities, opt, 'amenities')}
                      className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all ${formData.amenities.includes(opt) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-100 text-gray-400'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">House Rules</label>
                <div className="flex flex-wrap gap-2">
                  {rulesOptions.map(opt => (
                    <button 
                      key={opt}
                      type="button"
                      onClick={() => handleToggle(formData.rules, opt, 'rules')}
                      className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all ${formData.rules.includes(opt) ? 'bg-amber-100 border-amber-100 text-amber-700' : 'bg-white border-gray-100 text-gray-400'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Upload Photos (Max 5)</label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-square bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-3xl flex flex-col items-center justify-center text-indigo-600 cursor-pointer hover:bg-indigo-100 transition-all">
                    <Camera size={32} />
                    <span className="text-[10px] font-black mt-2">ADD PHOTO</span>
                  </div>
                  {[1, 2].map(i => (
                    <div key={i} className="aspect-square bg-gray-50 rounded-3xl border border-gray-100"></div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Exact Address</label>
                <div className="relative">
                  <MapPin size={20} className="absolute left-4 top-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="House No, Road No, Sector/Block..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    required
                  />
                </div>
                <div className="mt-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                  <div className="bg-emerald-500 text-white p-1 rounded-full"><Check size={12} /></div>
                  <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest leading-none">Map Location Auto-detected</p>
                </div>
              </div>

              <div className="p-4 bg-indigo-50 rounded-2xl flex gap-4">
                <Info className="text-indigo-600 flex-shrink-0" />
                <p className="text-xs text-indigo-700 font-medium">
                  After posting, our team will review your listing and verify the property details within 24 hours.
                </p>
              </div>
            </div>
          )}

          <div className="mt-12 flex gap-4">
            {step > 1 && (
              <button 
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 py-5 rounded-2xl border border-gray-200 font-black flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
              >
                <ChevronLeft size={20} />
                Back
              </button>
            )}
            {step < 3 ? (
              <button 
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex-[2] bg-indigo-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
              >
                Continue
                <ChevronRight size={20} />
              </button>
            ) : (
              <button 
                type="submit"
                className="flex-[2] bg-emerald-500 text-white py-5 rounded-2xl font-black shadow-xl shadow-emerald-100 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
              >
                Publish Listing
                <Check size={20} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
