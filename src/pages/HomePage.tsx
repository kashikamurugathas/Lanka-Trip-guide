import React from 'react';
import { Link } from 'react-router-dom';
import { destinations } from '../data/destinations';
import { tourPackages } from '../data/packages';
import { SearchBar } from '../components/SearchBar';
import { DestinationCard } from '../components/DestinationCard';
import { PackageCard } from '../components/PackageCard';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  Compass,
  MapPin,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Quote,
  Train,
  CheckCircle2,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const featuredDestinations = destinations.filter((d) => d.isFeatured).slice(0, 6);
  const popularPackages = tourPackages.filter((p) => p.isPopular).slice(0, 3);

  const sampleTestimonials = [
    {
      quote:
        'Climbing Sigiriya at dawn followed by the scenic train ride to Ella was the most magical travel experience of our lives. The local transport and etiquette advice on Lanka Trip Guide made every step effortless.',
      author: 'Elena & Marcus Vance',
      origin: 'Melbourne, Australia',
      trip: '7-Day Sri Lanka Highlights Journey',
    },
    {
      quote:
        'Tracking wild leopards in Yala and relaxing along Mirissa’s coconut groves was unforgettable. The LKR budgeting breakdowns were completely realistic and helped us plan our honeymoon perfectly.',
      author: 'Sophia Chen',
      origin: 'Singapore',
      trip: 'Southern Coast & Wild Safari Tour',
    },
    {
      quote:
        'The sacred Temple of the Tooth ceremony in Kandy brought tears to my eyes. Lanka Trip Guide’s cultural guidance and temple dress recommendations ensured our family felt welcome and respectful everywhere.',
      author: 'David & Hannah Davies',
      origin: 'Bristol, United Kingdom',
      trip: 'Hill Country & Cultural Triangle',
    },
  ];

  const travelInspirations = [
    {
      title: 'The World’s Most Scenic Railway',
      subtitle: 'Main Line Hill Country Journey',
      description: 'Wind through mist-draped emerald tea plantations, deep ravines, and eucalyptus forests between Kandy, Nanu Oya, and Ella.',
      image: '/src/assets/images/ella_nine_arch_bridge_1791818360231.jpg',
      link: '/travel-guide',
      actionText: 'Read Train Guide',
    },
    {
      title: 'UNESCO Ancient Citadels',
      subtitle: 'The Sacred Cultural Triangle',
      description: 'Walk in the footsteps of ancient kings across Sigiriya Rock, Dambulla cave sanctuaries, and the royal city of Polonnaruwa.',
      image: '/src/assets/images/sigiriya_rock_fortress_1791818347997.jpg',
      link: '/destinations',
      actionText: 'Explore Citadels',
    },
    {
      title: 'Untamed Wildlife Expeditions',
      subtitle: 'Leopards, Elephants & Whales',
      description: 'From one of Earth’s densest leopard territories in Yala to the migration corridors of giant blue whales off Mirissa.',
      image: '/src/assets/images/yala_leopard_safari_1791818380419.jpg',
      link: '/destinations/yala-national-park',
      actionText: 'Discover Wildlife',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center bg-stone-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/src/assets/images/hero_sri_lanka_landscape_1791818335061.jpg"
            alt="Sri Lanka landscape at sunrise"
            className="w-full h-full object-cover object-center opacity-85"
          />
          {/* Measured Scrim (Frontend Design Constitution) */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/25" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-semibold tracking-wide uppercase mb-6 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Pearl of the Indian Ocean</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl [text-wrap:balance]">
            Discover the Beauty of Sri Lanka
          </h1>

          <p className="mt-5 text-base sm:text-lg lg:text-xl text-stone-200 max-w-2xl font-light leading-relaxed [text-wrap:balance]">
            Explore breathtaking destinations, plan unforgettable journeys, and experience the island like never before.
          </p>

          {/* Search Bar Widget */}
          <div className="w-full mt-10">
            <SearchBar />
          </div>

          {/* Quick Anchor Badges / Metrics */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>16 Handpicked Destinations</span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline opacity-40">·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Authentic Local LKR Pricing</span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline opacity-40">·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free Interactive Trip Planner</span>
            </span>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
                Iconic Sights & Wonders
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                Featured Destinations
              </h2>
              <p className="mt-2 text-stone-600 text-sm max-w-xl">
                From 5th-century royal rock citadels to misty tea estates and turquoise surf bays.
              </p>
            </div>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-900 transition-colors whitespace-nowrap"
            >
              <span>View All 16 Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tour Packages Section */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
                Curated Travel Itineraries
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                Popular Tour Packages
              </h2>
              <p className="mt-2 text-stone-600 text-sm max-w-xl">
                Carefully designed journeys featuring scenic train journeys, wildlife safaris, and heritage stays.
              </p>
            </div>
            <Link
              to="/packages"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-900 transition-colors whitespace-nowrap"
            >
              <span>View All Tour Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularPackages.map((pkg) => (
              <PackageCard key={pkg.id} tourPackage={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Lanka Trip Guide */}
      <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              Authentic Local Insights
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Why Choose Lanka Trip Guide
            </h2>
            <p className="mt-3 text-stone-300 text-sm leading-relaxed">
              We empower travelers with unbiased, transparent information, realistic Sri Lankan Rupee pricing, and cultural understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-stone-800/60 rounded-2xl p-8 border border-stone-700/60">
              <div className="w-12 h-12 rounded-xl bg-emerald-700/40 text-emerald-400 flex items-center justify-center mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Authentic Island Knowledge
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Clear seasonal advice detailing the island’s dual monsoon system, optimal times for blue whale migrations, and cultural etiquette for sacred temples.
              </p>
            </div>

            <div className="bg-stone-800/60 rounded-2xl p-8 border border-stone-700/60">
              <div className="w-12 h-12 rounded-xl bg-amber-700/30 text-amber-400 flex items-center justify-center mb-5">
                <Train className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Transparent Local Budgets (LKR)
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                All pricing is quoted directly in Sri Lankan Rupees (LKR / Rs.) reflecting real local transport, park entrance fees, train tickets, and meal costs without inflated markups.
              </p>
            </div>

            <div className="bg-stone-800/60 rounded-2xl p-8 border border-stone-700/60">
              <div className="w-12 h-12 rounded-xl bg-teal-700/30 text-teal-300 flex items-center justify-center mb-5">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Custom Interactive Planner
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Build your personalized day-by-day itinerary, reorder stops, calculate estimated LKR expenses, save plans locally in your browser, and print or export as PDF.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Inspiration Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
              Island Stories & Journeys
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Travel Inspiration
            </h2>
            <p className="mt-2 text-stone-600 text-sm">
              Discover the experiences that make Sri Lanka one of the world’s most captivating travel destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {travelInspirations.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all flex flex-col"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-4 text-xs font-medium text-amber-300">
                    {item.subtitle}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed flex-1">
                    {item.description}
                  </p>
                  <div className="mt-5 pt-4 border-t border-stone-100">
                    <Link
                      to={item.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
              Sample Feedback & Stories
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Traveler Experiences
            </h2>
            <p className="mt-2 text-stone-500 text-xs italic">
              (Sample illustrative testimonials representing typical traveler journeys across Sri Lanka)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-stone-50 rounded-2xl p-7 border border-stone-200/80 flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-8 h-8 text-emerald-700/30 mb-4" />
                  <p className="text-sm text-stone-700 leading-relaxed italic mb-6">
                    “{t.quote}”
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-200">
                  <div className="font-semibold text-stone-900 text-sm">{t.author}</div>
                  <div className="text-xs text-stone-500">{t.origin}</div>
                  <div className="mt-1 text-[11px] font-medium text-emerald-800">{t.trip}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Primary CTA Block */}
      <section className="py-16 bg-gradient-to-r from-emerald-800 to-teal-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold max-w-2xl mx-auto [text-wrap:balance]">
            Ready to Begin Your Sri Lankan Journey?
          </h2>
          <p className="mt-3 text-stone-200 text-base max-w-xl mx-auto font-light leading-relaxed">
            Create your custom day-by-day travel plan, review estimated budgets in Sri Lankan Rupees, and save your itinerary for free.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/trip-planner"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-all active:scale-[0.98]"
            >
              <CalendarCheck className="w-4.5 h-4.5 text-stone-950" />
              <span>Start Planning Your Trip</span>
            </Link>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-white/15 hover:bg-white/25 rounded-xl border border-white/25 transition-all"
            >
              <MapPin className="w-4.5 h-4.5 text-emerald-300" />
              <span>Browse All Destinations</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
