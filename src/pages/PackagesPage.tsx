import React, { useState, useMemo } from 'react';
import { tourPackages } from '../data/packages';
import { PackageCard } from '../components/PackageCard';
import { Search, RotateCcw, Clock, Compass } from 'lucide-react';

export const PackagesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [durationFilter, setDurationFilter] = useState<'all' | '1day' | '2-4days' | '5-7days' | '8+days'>('all');
  const [budgetFilter, setBudgetFilter] = useState<'all' | 'under50k' | '50kTo120k' | 'above120k'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'duration-asc'>('popular');

  const filteredPackages = useMemo(() => {
    return tourPackages
      .filter((pkg) => {
        // Search term (name, destinations, highlights)
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchesName = pkg.name.toLowerCase().includes(term);
          const matchesDestinations = pkg.destinations.some((d) => d.toLowerCase().includes(term));
          const matchesActivities = pkg.mainActivities.some((a) => a.toLowerCase().includes(term));
          if (!matchesName && !matchesDestinations && !matchesActivities) return false;
        }

        // Duration filter
        if (durationFilter === '1day' && pkg.durationDays !== 1) return false;
        if (durationFilter === '2-4days' && (pkg.durationDays < 2 || pkg.durationDays > 4)) return false;
        if (durationFilter === '5-7days' && (pkg.durationDays < 5 || pkg.durationDays > 7)) return false;
        if (durationFilter === '8+days' && pkg.durationDays < 8) return false;

        // Budget filter (in LKR)
        if (budgetFilter === 'under50k' && pkg.estimatedPriceLkr >= 50000) return false;
        if (budgetFilter === '50kTo120k' && (pkg.estimatedPriceLkr < 50000 || pkg.estimatedPriceLkr > 120000)) return false;
        if (budgetFilter === 'above120k' && pkg.estimatedPriceLkr <= 120000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.estimatedPriceLkr - b.estimatedPriceLkr;
        if (sortBy === 'price-desc') return b.estimatedPriceLkr - a.estimatedPriceLkr;
        if (sortBy === 'duration-asc') return a.durationDays - b.durationDays;
        // default: popular first
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [searchTerm, durationFilter, budgetFilter, sortBy]);

  const handleReset = () => {
    setSearchTerm('');
    setDurationFilter('all');
    setBudgetFilter('all');
    setSortBy('popular');
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Curated Journeys</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Sri Lanka Tour Packages
          </h1>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Thoughtfully planned travel packages featuring authentic local transport, handpicked stays, cultural admissions, and scenic train adventures across the island.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search packages by title or destination (e.g., Sigiriya, Ella, Yala)..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 rounded-xl border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-800"
              />
            </div>

            {/* Duration */}
            <div>
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value as any)}
                className="w-full py-2.5 px-3 text-sm bg-stone-50 rounded-xl border border-stone-200 text-stone-800 focus:outline-hidden focus:border-emerald-600"
              >
                <option value="all">Any Duration</option>
                <option value="1day">1 Day Excursion</option>
                <option value="2-4days">2 to 4 Days (Short Break)</option>
                <option value="5-7days">5 to 7 Days (Highlights)</option>
                <option value="8+days">8+ Days (Full Island)</option>
              </select>
            </div>

            {/* Budget in LKR */}
            <div>
              <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value as any)}
                className="w-full py-2.5 px-3 text-sm bg-stone-50 rounded-xl border border-stone-200 text-stone-800 focus:outline-hidden focus:border-emerald-600"
              >
                <option value="all">Any Budget (LKR)</option>
                <option value="under50k">Under Rs. 50,000</option>
                <option value="50kTo120k">Rs. 50,000 – Rs. 120,000</option>
                <option value="above120k">Above Rs. 120,000</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs text-stone-500">
            <div>
              Showing <strong className="text-stone-900 font-semibold">{filteredPackages.length}</strong> of{' '}
              {tourPackages.length} curated tour packages
            </div>

            {(searchTerm || durationFilter !== 'all' || budgetFilter !== 'all') && (
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

        {/* Packages Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} tourPackage={pkg} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-lg mx-auto">
            <Clock className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
              No Tour Packages Found
            </h3>
            <p className="text-sm text-stone-600 mb-6">
              No packages match your specific filters. Try expanding your duration or budget range.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Show All Packages</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
