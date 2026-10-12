import React, { useState, useMemo } from 'react';
import { hotels } from '../data/hotels';
import { AccommodationType } from '../types';
import { HotelCard } from '../components/HotelCard';
import { Search, RotateCcw, Building, ShieldAlert, Compass } from 'lucide-react';

export const HotelsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedPriceTier, setSelectedPriceTier] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating-desc'>('featured');

  const accommodationTypes: (AccommodationType | 'all')[] = [
    'all',
    'Luxury Resort',
    'Boutique Hotel',
    'Mid-range Hotel',
    'Eco Lodge',
    'Guesthouse & Homestay',
    'Budget Stay',
  ];

  const regions = [
    'all',
    'Cultural Triangle',
    'Central Highlands',
    'South Coast',
    'Deep South',
    'Northern Peninsula',
    'South-West Coast',
  ];

  const filteredHotels = useMemo(() => {
    return hotels
      .filter((hotel) => {
        // Search
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchesName = hotel.name.toLowerCase().includes(term);
          const matchesLocation = hotel.location.toLowerCase().includes(term);
          const matchesRegion = hotel.region.toLowerCase().includes(term);
          if (!matchesName && !matchesLocation && !matchesRegion) return false;
        }

        // Type
        if (selectedType !== 'all' && hotel.type !== selectedType) return false;

        // Region
        if (selectedRegion !== 'all' && hotel.region !== selectedRegion) return false;

        // Price Tier (LKR)
        if (selectedPriceTier !== 'all') {
          const price = hotel.pricePerNightLkr;
          if (selectedPriceTier === 'under15k' && price >= 15000) return false;
          if (selectedPriceTier === '15kTo40k' && (price < 15000 || price > 40000)) return false;
          if (selectedPriceTier === 'above40k' && price <= 40000) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.pricePerNightLkr - b.pricePerNightLkr;
        if (sortBy === 'price-desc') return b.pricePerNightLkr - a.pricePerNightLkr;
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        // default: featured first
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [searchTerm, selectedType, selectedRegion, selectedPriceTier, sortBy]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedRegion('all');
    setSelectedPriceTier('all');
    setSortBy('featured');
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Curated Accommodations</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Hotels & Resorts in Sri Lanka
          </h1>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Discover a curated spectrum of authentic island stays—from cliffside Geoffrey Bawa luxury retreats and misty high-elevation tea bungalows to warm family-run guesthouses.
          </p>
        </div>

        {/* Illustrative Price Notice */}
        <div className="mb-8 p-4 bg-amber-50/90 rounded-2xl border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900 max-w-4xl mx-auto">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Illustrative Sample Listings: </strong>
            All accommodation listings and nightly rates are illustrative sample data quoted in Sri Lankan Rupees (LKR / Rs.). Lanka Trip Guide does not process live payment transactions or claim real-time room availability.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by hotel name, city, or region..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 rounded-xl border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-800"
              />
            </div>

            {/* Type */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-2.5 px-3 text-sm bg-stone-50 rounded-xl border border-stone-200 text-stone-800 focus:outline-hidden focus:border-emerald-600"
              >
                {accommodationTypes.map((t) => (
                  <option key={t} value={t}>
                    {t === 'all' ? 'All Accommodation Types' : t}
                  </option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full py-2.5 px-3 text-sm bg-stone-50 rounded-xl border border-stone-200 text-stone-800 focus:outline-hidden focus:border-emerald-600"
              >
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r === 'all' ? 'All Regions' : r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Secondary filter & sort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-100">
            <div>
              <select
                value={selectedPriceTier}
                onChange={(e) => setSelectedPriceTier(e.target.value)}
                className="w-full py-2 px-3 text-sm bg-stone-50 rounded-lg border border-stone-200 text-stone-800 focus:outline-hidden focus:border-emerald-600"
              >
                <option value="all">Any Price Tier</option>
                <option value="under15k">Budget / Guesthouse (Under Rs. 15,000 / night)</option>
                <option value="15kTo40k">Mid-range (Rs. 15,000 – Rs. 40,000 / night)</option>
                <option value="above40k">Luxury / Boutique (Above Rs. 40,000 / night)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-stone-500 whitespace-nowrap">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2 px-3 text-sm bg-stone-50 rounded-lg border border-stone-200 text-stone-800 focus:outline-hidden focus:border-emerald-600"
              >
                <option value="featured">Featured Stays First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Guest Rating: High to Low</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs text-stone-500">
            <div>
              Showing <strong className="text-stone-900 font-semibold">{filteredHotels.length}</strong> of{' '}
              {hotels.length} sample accommodation listings
            </div>

            {(searchTerm || selectedType !== 'all' || selectedRegion !== 'all' || selectedPriceTier !== 'all' || sortBy !== 'featured') && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Hotels Grid */}
        {filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-lg mx-auto">
            <Building className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
              No Accommodations Found
            </h3>
            <p className="text-sm text-stone-600 mb-6">
              No hotels match your current filters. Try resetting the filters to view all accommodations.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Show All Hotels</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
