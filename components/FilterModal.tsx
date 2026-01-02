
import React from 'react';
import { X } from 'lucide-react';
import { AREAS } from '../mockData';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: any;
  setFilters: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, filters, setFilters }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold">Filters</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Budget */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-4">Max Budget (৳{filters.budget.toLocaleString()})</label>
            <input 
              type="range" 
              min="2000" 
              max="30000" 
              step="500"
              value={filters.budget}
              onChange={(e) => setFilters({...filters, budget: parseInt(e.target.value)})}
              className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
              <span>৳2,000</span>
              <span>৳30,000+</span>
            </div>
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-4">Select Area</label>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setFilters({...filters, area: 'all'})}
                className={`px-4 py-2 rounded-xl border transition-all text-sm font-medium ${filters.area === 'all' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-600'}`}
              >
                All Dhaka
              </button>
              {AREAS.map(area => (
                <button 
                  key={area}
                  onClick={() => setFilters({...filters, area})}
                  className={`px-4 py-2 rounded-xl border transition-all text-sm font-medium ${filters.area === area ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-600'}`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-4">Room Type</label>
            <div className="grid grid-cols-3 gap-2">
              {['all', 'Single', 'Shared'].map(type => (
                <button 
                  key={type}
                  onClick={() => setFilters({...filters, type})}
                  className={`px-4 py-3 rounded-xl border transition-all text-sm font-bold capitalize ${filters.type === type ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-600'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Gender Preference */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-4">Gender Preference</label>
            <div className="grid grid-cols-4 gap-2">
              {['all', 'Male', 'Female', 'Any'].map(gender => (
                <button 
                  key={gender}
                  onClick={() => setFilters({...filters, gender})}
                  className={`px-4 py-3 rounded-xl border transition-all text-sm font-bold capitalize ${filters.gender === gender ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-600'}`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-4">
          <button 
            onClick={() => { setFilters({ budget: 20000, type: 'all', gender: 'all', area: 'all' }); onClose(); }}
            className="flex-1 py-4 font-bold text-gray-400 hover:text-gray-900 transition-colors"
          >
            Reset All
          </button>
          <button 
            onClick={onClose}
            className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
