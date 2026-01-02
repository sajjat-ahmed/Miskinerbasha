
import React from 'react';
import { Link } from 'react-router-dom';
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
  Clock
} from 'lucide-react';
import { Room } from '../types';
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
}

const Dashboard: React.FC<DashboardProps> = ({ rooms }) => {
  // Mock analytics data
  const data = [
    { name: 'Mon', views: 400 },
    { name: 'Tue', views: 300 },
    { name: 'Wed', views: 600 },
    { name: 'Thu', views: 800 },
    { name: 'Fri', views: 700 },
    { name: 'Sat', views: 900 },
    { name: 'Sun', views: 500 },
  ];

  const myRooms = rooms.filter(r => r.ownerId === 'owner1' || r.ownerId === 'owner2');

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 custom-scrollbar p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Owner Dashboard</h1>
            <p className="text-gray-500 font-medium">Welcome back, Managing 4 active listings.</p>
          </div>
          <Link to="/create" className="bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
            <Plus size={20} />
            Add New Listing
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-2">
            <span className="text-gray-400 font-bold uppercase text-xs">Total Views</span>
            <span className="text-4xl font-black">4,281</span>
            <span className="text-emerald-500 text-xs font-bold">+12% from last week</span>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-2">
            <span className="text-gray-400 font-bold uppercase text-xs">Interested Leads</span>
            <span className="text-4xl font-black">28</span>
            <span className="text-indigo-600 text-xs font-bold">WhatsApp/Calls</span>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-2">
            <span className="text-gray-400 font-bold uppercase text-xs">Profile Status</span>
            <div className="flex items-center gap-2 text-xl font-bold text-emerald-600">
              <CheckCircle2 />
              Verified Pro
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <BarChart3 className="text-indigo-600" />
              Listing Impressions
            </h3>
            <select className="bg-gray-50 border-none text-sm font-bold rounded-xl px-4 py-2 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="views" radius={[8, 8, 8, 8]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#4f46e5' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50">
            <h3 className="text-xl font-bold">Your Listings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-gray-400 text-xs font-black uppercase tracking-widest">
                  <th className="px-8 py-5">Property</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Price</th>
                  <th className="px-8 py-5">Views</th>
                  <th className="px-8 py-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {myRooms.map(room => (
                  <tr key={room.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={room.images[0]} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-gray-900">{room.title}</p>
                          <p className="text-xs text-gray-400">{room.area}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {room.isAvailable ? (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                          <CheckCircle2 size={12} /> Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full w-fit">
                          <Clock size={12} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-black text-gray-900">৳{room.price}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-medium text-gray-500">1.2k</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Edit3 size={18} /></button>
                        <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"><MoreVertical size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
