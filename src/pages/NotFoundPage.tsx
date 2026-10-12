import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, MapPin, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 text-center shadow-xs space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
            Page Not Found · 404
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900 mt-3">
            Lost on the Island?
          </h1>
          <p className="mt-2 text-stone-600 text-xs sm:text-sm leading-relaxed">
            The trail you were following does not exist or may have shifted. Return to our verified paths to continue exploring Sri Lanka.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <Link
            to="/destinations"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
          >
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>Destinations</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
