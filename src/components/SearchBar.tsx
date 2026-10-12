import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import { destinations } from '../data/destinations';

interface SearchBarProps {
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState('2');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedDestination) params.set('search', selectedDestination);
    if (travelers) params.set('travelers', travelers);
    if (travelDate) params.set('date', travelDate);
    navigate(`/destinations?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-white rounded-2xl shadow-xl border border-stone-200/80 p-3 sm:p-4 grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 items-center ${className}`}
    >
      {/* Destination Picker */}
      <div className="relative">
        <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
          Where to in Sri Lanka?
        </label>
        <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-xl border border-stone-200 focus-within:border-emerald-600 focus-within:bg-white transition-colors">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
          <input
            type="text"
            list="sri-lanka-destinations"
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            placeholder="e.g. Sigiriya, Ella, Galle..."
            className="w-full bg-transparent text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden"
          />
          <datalist id="sri-lanka-destinations">
            {destinations.map((d) => (
              <option key={d.id} value={d.name} />
            ))}
          </datalist>
        </div>
      </div>

      {/* Travel Date */}
      <div className="relative">
        <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
          Approx. Travel Date
        </label>
        <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-xl border border-stone-200 focus-within:border-emerald-600 focus-within:bg-white transition-colors">
          <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
          <input
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="w-full bg-transparent text-sm text-stone-800 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Travellers count */}
      <div className="relative">
        <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
          Travellers
        </label>
        <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-xl border border-stone-200 focus-within:border-emerald-600 focus-within:bg-white transition-colors">
          <Users className="w-4 h-4 text-emerald-600 shrink-0" />
          <select
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            className="w-full bg-transparent text-sm text-stone-800 focus:outline-hidden"
          >
            <option value="1">1 Solo Explorer</option>
            <option value="2">2 Travellers (Couple / Pair)</option>
            <option value="3">3 Travellers</option>
            <option value="4">4 Travellers (Family / Group)</option>
            <option value="6">6+ Travellers (Large Group)</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="md:pt-5">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <Search className="w-4 h-4 text-amber-300" />
          <span>Search Destinations</span>
        </button>
      </div>
    </form>
  );
};
