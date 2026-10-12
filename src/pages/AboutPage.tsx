import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Target, Eye, Sparkles, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>About Lanka Trip Guide</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Guiding Your Journey Through Sri Lanka
          </h1>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            An independent digital travel resource dedicated to connecting global travellers with authentic Sri Lankan destinations, reliable local travel insights, and realistic planning tools.
          </p>
        </div>

        {/* Hero Visual & Purpose Split */}
        <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-[460px]">
            <ImageWithFallback
              src="/src/assets/images/hero_sri_lanka_landscape_1791818335061.jpg"
              alt="Sigiriya landscape at dawn"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs uppercase tracking-widest font-semibold text-amber-300">
                Cultural Triangle
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1">
                Preserving Heritage & Celebrating Wonder
              </h3>
            </div>
          </div>

          <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Our Purpose
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              Honest, Transparent & Respectful Travel Guidance
            </h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              Sri Lanka is an extraordinary island: a land where misty highlands producing world-renowned Ceylon tea sit just hours away from ancient UNESCO brick stupas and sun-drenched Indian Ocean waves.
            </p>
            <p className="text-stone-700 text-sm leading-relaxed">
              Lanka Trip Guide was designed to cut through confusion. We present realistic prices strictly in Sri Lankan Rupees (LKR), clarify how the island’s dual monsoon system works, and provide clear temple etiquette to ensure every visitor travels respectfully.
            </p>

            <div className="pt-2">
              <Link
                to="/trip-planner"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors"
              >
                <span>Try the Trip Planner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mission & Vision Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Our Mission
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              To provide travellers from across the globe with transparent, accurate, and accessible Sri Lankan travel information, enabling independent, culturally mindful, and memorable journeys throughout the island.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Our Vision
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              A vibrant tourism ecosystem where international travelers experience the true depth of Sri Lankan warmth and hospitality while respecting ancient sacred monuments, fragile wildlife habitats, and local livelihoods.
            </p>
          </div>
        </div>

        {/* Why Travellers Use Lanka Trip Guide */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs space-y-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Why Travellers Use This Guide
            </h2>
            <p className="mt-2 text-stone-600 text-sm">
              We focus on practical details that make an authentic difference on the ground.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
              <h4 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Local LKR Pricing</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Clear price references exclusively in Sri Lankan Rupees, ensuring you always know local rates for tickets, trains, meals, and tuk-tuks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
              <h4 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Seasonal Clarity</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Guidance on the Yala and Maha monsoons so you know when to visit the Southern Coast versus the East Coast beaches.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
              <h4 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cultural Respect</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Clear rules on dress code for Buddhist stupas and Hindu kovils, sacred gestures, and respectful wildlife observation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
              <h4 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Interactive Trip Planner</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                A browser-based itinerary builder allowing you to customize days, add stop notes, calculate budgets, and print your itinerary without accounts or logins.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
              <h4 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Scenic Railway Advice</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tips on securing reserved seats on the blue mountain train between Kandy and Ella and understanding train timetables.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
              <h4 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Language Phrasebook</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Basic greetings and courtesy expressions in Sinhala and Tamil to warmly connect with community members wherever you travel.
              </p>
            </div>
          </div>
        </div>

        {/* Sri Lanka Tourism Highlights summary */}
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              Island Snapshot
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Sri Lankan Tourism at a Glance
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              Sri Lanka is home to 8 UNESCO World Heritage Sites (6 cultural and 2 natural), over 1,340 kilometers of tropical coastline, 26 national wildlife parks, and centuries of tea plucking tradition in the misty central peaks.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 text-xs font-medium text-emerald-200">
              <span className="bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-800">
                8 UNESCO World Heritage Sites
              </span>
              <span className="bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-800">
                26 National Wildlife Parks
              </span>
              <span className="bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-800">
                World’s Oldest Recorded Tree (Jaya Sri Maha Bodhi)
              </span>
              <span className="bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-800">
                Globally Renowned Ceylon Tea
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
