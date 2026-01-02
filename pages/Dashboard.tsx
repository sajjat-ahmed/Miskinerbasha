
import React, { useState, useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { 
  BarChart3, 
  Settings, 
  Plus, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  Eye, 
  CheckCircle2,
  XCircle,
  Clock,
  ClipboardList,
  Check,
  X as XIcon,
  Calendar,
  Heart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  // Added missing icon imports
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Room, BookingRequest, User } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface DashboardProps {
  rooms: Room[];
  bookingRequests: BookingRequest[];
  onUpdateStatus: (id: string, status: 'accepted' | 'rejected') => void;
  user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ rooms, bookingRequests, onUpdateStatus, user }) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'requests'>('listings');
  
  if (!user || user.role !== 'owner') {
    return <Navigate to="/" replace />;
  }

  // Mock analytics data
  const chartData = [
    { name: 'Mon', views: 400 },
    { name: 'Tue', views: 300 },
    { name: 'Wed', views: 600 },
    { name: 'Thu', views: 800 },
    { name: 'Fri', views: 700 },
    { name: 'Sat', views: 900 },
    { name: 'Sun', views: 500 },
  ];

  // Dummy area benchmarks
  const areaBenchmarks: Record<string, number> = {
    'Dhanmondi': 7200,
    'Mirpur': 4000,
    'Uttara': 8500,
    'Banani': 14000,
    'Mohakhali': 5000,
    'Mohammadpur': 5500,
  };

  const myRooms = useMemo(() => {
    return rooms.filter(r => r.ownerId === 'owner1' || r.ownerId === 'owner2' || r.ownerId === user.id)
      .map(room => ({
        ...room,
        // Mocking individual analytics
        saves: Math.floor(Math.random() * 45) + 5,
        views: Math.floor(Math.random() * 800) + 200,
        areaAvg: areaBenchmarks[room.area] || 6000
      }));
  }, [rooms, user.id]);

  const myRequests = bookingRequests;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 custom-scrollbar p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Owner Dashboard</h1>
            <p className="text-gray-500 font-medium">Welcome back, {user.name.split(' ')[0]}. Managing {myRooms.length} active listings.</p>
          </div>
          <Link to="/create" className="bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
            <Plus size={20} />
            Add New Listing
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-2 group hover:border-indigo-100 transition-all">
            <div className="flex justify-between items-start">
              <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Total Impressions</span>
              <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600"><Eye size={18} /></div>
            </div>
            <span className="text-4xl font-black">4,281</span>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
               <ArrowUpRight size={14} /> +12% from last week
            </span>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-2 group hover:border-rose-100 transition-all">
            <div className="flex justify-between items-start">
              <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Total Saves</span>
              <div className="bg-rose-50 p-2 rounded-xl text-rose-600"><Heart size={18} /></div>
            </div>
            <span className="text-4xl font-black">182</span>
            <span className="text-gray-400 text-xs font-bold">Interested students</span>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-2 group hover:border-emerald-100 transition-all">
            <div className="flex justify-between items-start">
              <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Profile Status</span>
              <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600"><CheckCircle2 size={18} /></div>
            </div>
            <span className="text-2xl font-black text-gray-900">Verified Pro</span>
            <span className="text-emerald-500 text-xs font-bold">Badged since 2023</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white/50 p-1.5 rounded-2xl mb-8 w-fit border border-gray-100 shadow-sm">
          <button 
            onClick={() => setActiveTab('listings')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'listings' ? 'bg-white shadow-md text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <MoreVertical size={18} />
            My Listings
          </button>
          <button 
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all relative ${activeTab === 'requests' ? 'bg-white shadow-md text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <ClipboardList size={18} />
            Booking Requests
            {myRequests.filter(r => r.status === 'pending').length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-black">
                {myRequests.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'listings' ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Chart */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                    <BarChart3 className="text-indigo-600" />
                    Overall Engagement
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">Tracking views and interactions over time</p>
                </div>
                <div className="flex gap-2">
                  <select className="bg-gray-50 border-none text-xs font-bold rounded-xl px-4 py-2 outline-none cursor-pointer">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis hide />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="views" radius={[8, 8, 8, 8]} barSize={40}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 5 ? '#4f46e5' : '#e2e8f0'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detailed Listings Table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50">
                <h3 className="text-xl font-bold">Property Insights</h3>
                <p className="text-xs text-gray-400 mt-1">Detailed performance metrics for your Dhaka rentals</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-gray-400 text-[10px] font-black uppercase tracking-[0.1em]">
                      <th className="px-8 py-5">Property</th>
                      <th className="px-8 py-5 text-center">Engagement</th>
                      <th className="px-8 py-5 text-center">Market Benchmark</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {myRooms.map(room => {
                      const rentDiff = room.price - room.areaAvg;
                      const isCompetitive = rentDiff <= 0;

                      return (
                        <tr key={room.id} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <img src={room.images[0]} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                              <div>
                                <p className="font-bold text-gray-900 text-sm">{room.title}</p>
                                <p className="text-xs text-indigo-500 font-bold uppercase tracking-wider">{room.area}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-col items-center gap-1.5">
                              <div className="flex gap-4">
                                <div className="flex items-center gap-1 text-xs font-bold text-gray-600">
                                  <Eye size={14} className="text-gray-400" /> {room.views}
                                </div>
                                <div className="flex items-center gap-1 text-xs font-bold text-rose-600">
                                  <Heart size={14} fill="currentColor" /> {room.saves}
                                </div>
                              </div>
                              {room.saves > 30 && (
                                <span className="bg-rose-50 text-rose-600 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-tighter">Highly Saved</span>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-col items-center">
                              <span className="font-black text-gray-900 text-sm">৳{room.price}</span>
                              <div className={`flex items-center gap-1 text-[10px] font-bold mt-1 ${isCompetitive ? 'text-emerald-500' : 'text-amber-500'}`}>
                                {isCompetitive ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                                {Math.abs(rentDiff).toLocaleString()} vs Area Avg
                              </div>
                              <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">Area Avg: ৳{room.areaAvg}</p>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            {room.isAvailable ? (
                              <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit tracking-wider">
                                <CheckCircle2 size={12} /> Published
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full w-fit tracking-wider">
                                <Clock size={12} /> Draft
                              </span>
                            )}
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex gap-1">
                              <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" title="Edit"><Edit3 size={18} /></button>
                              <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" title="Delete"><Trash2 size={18} /></button>
                              <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"><MoreVertical size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Area Comparison Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md"><TrendingUp size={20} /></div>
                    <h4 className="text-xl font-bold">Local Rent Trends</h4>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(areaBenchmarks).slice(0, 3).map(([area, price]) => (
                      <div key={area} className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="font-medium opacity-80">{area} Average</span>
                        <span className="font-black">৳{price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-8 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
                    View Full Market Report <ArrowRight size={14} />
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl"></div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Pricing Suggestion</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Based on student demand in <span className="text-indigo-600 font-bold">Dhanmondi</span>, rooms with 
                    <span className="font-bold text-gray-900"> Attached Bathrooms</span> are getting 40% more saves than shared ones.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-4 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                  <div className="bg-amber-400 text-white p-2 rounded-xl"><Sparkles size={18} /></div>
                  <p className="text-xs font-bold text-amber-900">Pro Tip: Consider including WiFi in the base rent to attract more verified students.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Requests Table (Same as before but with consistent padding) */
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-300">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-xl font-bold">Booking Requests</h3>
              <span className="text-sm text-gray-400 font-medium">{myRequests.length} Total Requests</span>
            </div>
            {myRequests.length === 0 ? (
              <div className="p-20 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-6">
                  <ClipboardList size={32} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">No Requests Yet</h4>
                <p className="text-gray-500 max-w-xs leading-relaxed">Booking requests from students will appear here once they find your listings.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-gray-400 text-[10px] font-black uppercase tracking-[0.1em]">
                      <th className="px-8 py-5">Student</th>
                      <th className="px-8 py-5">Property</th>
                      <th className="px-8 py-5">Details</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {myRequests.map(request => (
                      <tr key={request.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-8 py-6">
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{request.studentName}</p>
                            <p className="text-[10px] text-indigo-500 font-bold uppercase">{request.studentEmail}</p>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <p className="font-bold text-sm text-gray-700 max-w-[180px] line-clamp-1">{request.roomTitle}</p>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-[10px] font-bold space-y-1">
                            <p className="flex items-center gap-1.5 text-gray-400 uppercase tracking-tighter"><Calendar size={12} /> {request.moveInDate}</p>
                            <p className="flex items-center gap-1.5 text-gray-400 uppercase tracking-tighter"><Clock size={12} /> {request.duration}</p>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          {request.status === 'pending' ? (
                            <span className="text-[9px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full border border-amber-100">Pending</span>
                          ) : request.status === 'accepted' ? (
                            <span className="text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-100">Accepted</span>
                          ) : (
                            <span className="text-[9px] font-black uppercase tracking-widest bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full border border-rose-100">Rejected</span>
                          )}
                        </td>
                        <td className="px-8 py-6">
                          {request.status === 'pending' ? (
                            <div className="flex gap-2">
                              <button 
                                onClick={() => onUpdateStatus(request.id, 'accepted')}
                                className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                title="Accept"
                              >
                                <Check size={18} />
                              </button>
                              <button 
                                onClick={() => onUpdateStatus(request.id, 'rejected')}
                                className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                title="Reject"
                              >
                                <XIcon size={18} />
                              </button>
                            </div>
                          ) : (
                            <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">History</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
