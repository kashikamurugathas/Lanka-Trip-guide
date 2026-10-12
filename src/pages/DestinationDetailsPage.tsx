import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { destinations } from '../data/destinations';
import { tourPackages } from '../data/packages';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { PackageCard } from '../components/PackageCard';
import { getDraftPlan, saveDraftPlan } from '../utils/storage';
import {
  ArrowLeft,
  CalendarCheck,
  MapPin,
  Clock,
  Compass,
  AlertTriangle,
  Lightbulb,
  Bus,
  CheckCircle,
  Coins,
  ChevronRight,
  SunMedium,
} from 'lucide-react';

export const DestinationDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [addedNotice, setAddedNotice] = useState(false);

  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50 p-6 text-center">
        <Compass className="w-12 h-12 text-stone-400 mb-4" />
        <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">
          Destination Not Found
        </h1>
        <p className="text-stone-600 text-sm max-w-md mb-6">
          Information for this destination is either unavailable or to be confirmed. Please explore our other authentic Sri Lankan destinations.
        </p>
        <Link
          to="/destinations"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Destinations</span>
        </Link>
      </div>
    );
  }

  // Find nearby destinations & related tour packages
  const nearbyDestinations = destinations.filter((d) =>
    destination.nearbySlugs.includes(d.slug)
  );

  const relatedPackages = tourPackages.filter((pkg) =>
    destination.relatedPackageSlugs.includes(pkg.slug)
  );

  const handleAddToTrip = () => {
    const draft = getDraftPlan() || {
      title: 'My Sri Lanka Journey',
      items: [],
      travelersCount: 2,
      totalBudgetLkr: 0,
      generalNotes: '',
    };

    const existingItems = draft.items || [];
    const alreadyInItinerary = existingItems.some(
      (item) => item.destinationSlug === destination.slug
    );

    if (!alreadyInItinerary) {
      existingItems.push({
        id: 'ITN-' + Math.random().toString(36).substring(2, 9),
        destinationSlug: destination.slug,
        destinationName: destination.name,
        days: 1,
        notes: `Exploring ${destination.name}. Highlights: ${destination.thingsToDo[0] || ''}`,
        estimatedDailyBudgetLkr: destination.estimatedBudgetLkr.budgetDaily,
      });

      draft.items = existingItems;
      saveDraftPlan(draft);
    }

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 4000);
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Hero Cover Image & Title */}
      <section className="relative h-[480px] lg:h-[540px] bg-stone-950 overflow-hidden">
        <ImageWithFallback
          src={destination.coverImage}
          alt={destination.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        {/* Floating Top Nav / Back button */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900/80 backdrop-blur-md text-stone-200 hover:text-white text-xs font-semibold border border-white/10 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-300" />
            <span>Back to Destinations</span>
          </Link>
        </div>

        {/* Hero Title & Region */}
        <div className="absolute bottom-8 left-4 sm:left-8 right-4 sm:right-8 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-amber-300 mb-2">
            <span>{destination.category}</span>
            <span aria-hidden="true">·</span>
            <span>{destination.province} Province</span>
            {destination.localNameSinhala && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-stone-300">{destination.localNameSinhala}</span>
              </>
            )}
            {destination.localNameTamil && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-stone-300">{destination.localNameTamil}</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {destination.name}
          </h1>

          <p className="mt-2 text-sm sm:text-base text-stone-200 max-w-2xl font-light">
            {destination.summary}
          </p>

          {/* Quick Stats Strip */}
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-white/15 text-xs text-white">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Recommended Duration: <strong>{destination.visitDuration}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>
                Est. Daily Budget:{' '}
                <strong className="font-mono tabular-nums">
                  Rs. {destination.estimatedBudgetLkr.budgetDaily.toLocaleString()} LKR
                </strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Detailed Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Detailed Introduction */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-4">
                Overview & History
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Main Attractions */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-5">
                Key Attractions & Sites
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {destination.attractions.map((attraction, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col"
                  >
                    <h3 className="font-semibold text-stone-900 text-sm mb-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{attraction.title}</span>
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed flex-1">
                      {attraction.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Things to Do & Suggested Activities */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-5">
                Things to Do & Suggested Activities
              </h2>
              <ul className="space-y-3">
                {destination.thingsToDo.map((todo, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-stone-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{todo}</span>
                  </li>
                ))}
              </ul>

              {destination.suggestedActivities.length > 0 && (
                <div className="mt-6 pt-5 border-t border-stone-100">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
                    Popular Activity Ideas:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {destination.suggestedActivities.map((act, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-emerald-50 text-emerald-900 font-medium px-3 py-1 rounded-md border border-emerald-100"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Practical Travel Tips & Etiquette */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <span>Travel Tips & Etiquette</span>
              </h2>
              <ul className="space-y-2.5">
                {destination.travelTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <span className="text-stone-400 font-bold select-none">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Gallery */}
            {destination.gallery && destination.gallery.length > 1 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-4">
                  Destination Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {destination.gallery.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl overflow-hidden aspect-4/3 bg-stone-100 shadow-xs"
                    >
                      <ImageWithFallback
                        src={imgUrl}
                        alt={`${destination.name} gallery image ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Actions, Seasons, Budget, Nearby */}
          <div className="space-y-6">
            {/* Add to Trip Action Box */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4 sticky top-24">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Plan Your Visit
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Add {destination.name} directly into your custom itinerary planner to estimate days, travel notes, and budgets.
              </p>

              <button
                type="button"
                onClick={handleAddToTrip}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] rounded-xl shadow-xs transition-colors"
              >
                <CalendarCheck className="w-4 h-4 text-amber-300" />
                <span>Add to My Trip Planner</span>
              </button>

              {addedNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between animate-in fade-in">
                  <span>Added to your Trip Planner!</span>
                  <button
                    onClick={() => navigate('/trip-planner')}
                    className="font-semibold underline ml-2 hover:text-emerald-950"
                  >
                    View Plan
                  </button>
                </div>
              )}

              {/* Best Season & Weather Box */}
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <div className="flex items-start gap-2.5">
                  <SunMedium className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-stone-900 block">
                      Best Time to Visit
                    </span>
                    <span className="text-xs text-stone-600">
                      {destination.bestTimeToVisit}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-amber-50/70 p-3 rounded-xl border border-amber-200/60">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-semibold text-amber-900 block">
                      Seasonal Caveat
                    </span>
                    <span className="text-xs text-amber-800 leading-relaxed">
                      {destination.seasonCaveats}
                    </span>
                  </div>
                </div>
              </div>

              {/* Estimated Local Travel Budget */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-800">Budget Traveler:</span>
                  <span className="font-mono font-bold text-stone-900 tabular-nums">
                    Rs. {destination.estimatedBudgetLkr.budgetDaily.toLocaleString()} / day
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-800">Mid-Range Traveler:</span>
                  <span className="font-mono font-bold text-stone-900 tabular-nums">
                    Rs. {destination.estimatedBudgetLkr.midRangeDaily.toLocaleString()} / day
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 leading-normal pt-1">
                  {destination.estimatedBudgetLkr.note}
                </p>
              </div>

              {/* Transport & Accessibility */}
              <div className="pt-4 border-t border-stone-100">
                <div className="flex items-start gap-2">
                  <Bus className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-stone-900 block">
                      Transport & How to Get There
                    </span>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                      {destination.accessibilityTransport}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Destinations */}
            {nearbyDestinations.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-3">
                  Nearby Destinations
                </h3>
                <div className="space-y-3">
                  {nearbyDestinations.map((nearby) => (
                    <Link
                      key={nearby.id}
                      to={`/destinations/${nearby.slug}`}
                      className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                          <ImageWithFallback
                            src={nearby.coverImage}
                            alt={nearby.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors">
                            {nearby.name}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {nearby.region}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Tour Packages */}
        {relatedPackages.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Tour Packages Featuring {destination.name}
                </h2>
                <p className="text-sm text-stone-600 mt-1">
                  Pre-planned itineraries including transport, accommodation, and guided tours.
                </p>
              </div>
              <Link
                to="/packages"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900"
              >
                View All Packages
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg.id} tourPackage={pkg} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
