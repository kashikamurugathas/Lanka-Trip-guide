import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { destinations } from '../data/destinations';
import { DestinationCategory, Province } from '../types';
import { DestinationCard } from '../components/DestinationCard';
import { Search, Filter, RotateCcw, Compass, MapPin } from 'lucide-react';

export const DestinationsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedBudgetTier, setSelectedBudgetTier] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc' | 'budget-asc' | 'budget-desc'>('featured');

  // Keep search input in sync if URL param changes
  useEffect(() => {
    if (initialSearch && initialSearch !== searchTerm) {
      setSearchTerm(initialSearch);
    }
  }, [initialSearch]);

  const categories: (DestinationCategory | 'all')[] = [
    'all',
    'Cultural & Heritage',
    'Hill Country & Nature',
    'Beaches & Coastal',
    'Wildlife & Safari',
    'Adventure & Hiking',
  ];

  const provinces: (Province | 'all')[] = [
    'all',
    'Central',
    'Southern',
    'Eastern',
    'Northern',
    'North Central',
    'Uva',
    'Sabaragamuwa',
  ];

  // Filtering & Sorting
  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((dest) => {
        // Search filter
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchesName = dest.name.toLowerCase().includes(term);
          const matchesRegion = dest.region.toLowerCase().includes(term);
          const matchesSummary = dest.summary.toLowerCase().includes(term);
          const matchesProvince = dest.province.toLowerCase().includes(term);
          if (!matchesName && !matchesRegion && !matchesSummary && !matchesProvince) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'all' && dest.category !== selectedCategory) {
          return false;
        }

        // Province filter
        if (selectedProvince !== 'all' && dest.province !== selectedProvince) {
          return false;
        }

        // Budget tier filter (in LKR daily budget)
        if (selectedBudgetTier !== 'all') {
          const daily = dest.estimatedBudgetLkr.budgetDaily;
          if (selectedBudgetTier === 'under12k' && daily >= 12000) return false;
          if (selectedBudgetTier === '12kTo16k' && (daily < 12000 || daily > 16000)) return false;
          if (selectedBudgetTier === 'above16k' && daily <= 16000) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (sortBy === 'budget-asc') return a.estimatedBudgetLkr.budgetDaily - b.estimatedBudgetLkr.budgetDaily;
        if (sortBy === 'budget-desc') return b.estimatedBudgetLkr.budgetDaily - a.estimatedBudgetLkr.budgetDaily;
        // default: featured first
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [searchTerm, selectedCategory, selectedProvince, selectedBudgetTier, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedProvince('all');
    setSelectedBudgetTier('all');
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Discover The Wonders</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Sri Lanka Destinations
          </h1>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            From the soaring heights of Sigiriya Lion Rock to the misty tea terraces of Ella, ancient royal kingdoms, and wild southern leopard sanctuaries.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs mb-10 space-y-5">
          {/* Top row: Search input & Sort */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by destination name, region, or attraction..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 rounded-xl border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden transition-colors text-stone-800"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-stone-500 whitespace-nowrap">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 text-sm bg-stone-50 rounded-xl border border-stone-200 text-stone-800 focus:outline-hidden focus:border-emerald-600"
              >
                <option value="featured">Featured First</option>
                <option value="name-asc">Name (A to Z)</option>
                <option value="name-desc">Name (Z to A)</option>
                <option value="budget-asc">Budget: Low to High</option>
                <option value="budget-desc">Budget: High to Low</option>
              </select>
            </div>
          </div>

          {/* Secondary Row: Category, Province, Budget tier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2 px-3 text-sm bg-stone-50 rounded-lg border border-stone-200 text-stone-800 focus:outline-hidden focus:border-emerald-600"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Province */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Province / Region
              </label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full py-2 px-3 text-sm bg-stone-50 rounded-lg border border-stone-200 text-stone-800 focus:outline-hidden focus:border-emerald-600"
              >
                {provinces.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov === 'all' ? 'All Provinces' : `${prov} Province`}
                  </option>
                ))}
              </select>
            </div>

            {/* Daily Local Budget (LKR) */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Est. Daily Budget (LKR)
              </label>
              <select
                value={selectedBudgetTier}
                onChange={(e) => setSelectedBudgetTier(e.target.value)}
                className="w-full py-2 px-3 text-sm bg-stone-50 rounded-lg border border-stone-200 text-stone-800 focus:outline-hidden focus:border-emerald-600"
              >
                <option value="all">Any Daily Budget</option>
                <option value="under12k">Under Rs. 12,000 / day</option>
                <option value="12kTo16k">Rs. 12,000 – Rs. 16,000 / day</option>
                <option value="above16k">Above Rs. 16,000 / day (Safaris & Permits)</option>
              </select>
            </div>
          </div>

          {/* Active filters status & reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs text-stone-500">
            <div>
              Showing <strong className="text-stone-900 font-semibold">{filteredDestinations.length}</strong> of{' '}
              {destinations.length} Sri Lankan destinations
            </div>

            {(searchTerm || selectedCategory !== 'all' || selectedProvince !== 'all' || selectedBudgetTier !== 'all' || sortBy !== 'featured') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-lg mx-auto">
            <MapPin className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
              No Destinations Match Your Filter
            </h3>
            <p className="text-sm text-stone-600 mb-6">
              We couldn't find any destinations matching “{searchTerm || selectedCategory}”. Try adjusting your filters or resetting the search.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Show All Destinations</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
