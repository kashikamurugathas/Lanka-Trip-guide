import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, PhoneCall, ShieldAlert, Heart, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-white">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                <Compass className="w-5 h-5 text-amber-300" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Lanka Trip Guide
              </span>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Your premier, independent guide to exploring the wonders of Sri Lanka. From the misty heights of central tea country to ancient UNESCO citadels and pristine golden beaches.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400 pt-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sri Lanka Tourism Hotline: <strong className="text-white font-mono">1912</strong> (Toll-free locally)</span>
            </div>
          </div>

          {/* Quick Routes */}
          <div>
            <h4 className="text-xs font-semibold text-stone-100 uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/destinations" className="hover:text-emerald-400 transition-colors">
                  All Destinations
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-emerald-400 transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-emerald-400 transition-colors">
                  Hotels & Resorts
                </Link>
              </li>
              <li>
                <Link to="/trip-planner" className="hover:text-emerald-400 transition-colors">
                  Interactive Trip Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Guide Links */}
          <div>
            <h4 className="text-xs font-semibold text-stone-100 uppercase tracking-wider mb-4">
              Practical Advice
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/travel-guide" className="hover:text-emerald-400 transition-colors">
                  Weather & Best Seasons
                </Link>
              </li>
              <li>
                <Link to="/travel-guide" className="hover:text-emerald-400 transition-colors">
                  Scenic Mountain Trains
                </Link>
              </li>
              <li>
                <Link to="/travel-guide" className="hover:text-emerald-400 transition-colors">
                  Sacred Temple Etiquette
                </Link>
              </li>
              <li>
                <Link to="/travel-guide" className="hover:text-emerald-400 transition-colors">
                  Useful Sinhala & Tamil Phrases
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Contact */}
          <div>
            <h4 className="text-xs font-semibold text-stone-100 uppercase tracking-wider mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  About Our Guide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link to="/trip-planner" className="hover:text-emerald-400 transition-colors">
                  Custom Itinerary Builder
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Currency & Sample Data Notice */}
        <div className="mt-8 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              All prices shown in Sri Lankan Rupees (LKR / Rs.). Sample itinerary data and accommodation rates are illustrative. Form submissions are safely stored locally in your browser.
            </span>
          </div>
          <div className="flex items-center gap-1 text-stone-400 shrink-0">
            <span>Crafted for travelers exploring Sri Lanka</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
