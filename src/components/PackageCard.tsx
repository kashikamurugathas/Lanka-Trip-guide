import React from 'react';
import { Link } from 'react-router-dom';
import { TourPackage } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { ArrowRight, Clock, MapPin } from 'lucide-react';

interface PackageCardProps {
  tourPackage: TourPackage;
}

export const PackageCard: React.FC<PackageCardProps> = ({ tourPackage }) => {
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
        <ImageWithFallback
          src={tourPackage.coverImage}
          alt={tourPackage.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/15 to-transparent pointer-events-none" />

        {/* Duration badge */}
        <div className="absolute top-3 left-4 flex items-center gap-1.5 px-3 py-1 bg-stone-900/80 backdrop-blur-sm text-white rounded-full text-xs font-medium">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          <span>{tourPackage.duration}</span>
        </div>

        {/* Pricing overlay in LKR */}
        <div className="absolute bottom-3 right-4 text-right">
          <div className="text-[11px] text-stone-300 uppercase tracking-wider">From</div>
          <div className="font-mono text-lg font-bold text-white tabular-nums">
            Rs. {tourPackage.estimatedPriceLkr.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
          {tourPackage.name}
        </h3>

        {/* Destinations list */}
        <div className="mt-2.5 flex items-start gap-1.5 text-xs text-stone-500">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <span className="line-clamp-1">
            {tourPackage.destinations.join(' · ')}
          </span>
        </div>

        {/* Highlights */}
        <p className="mt-3 text-sm text-stone-600 line-clamp-2 leading-relaxed flex-1">
          {tourPackage.overview}
        </p>

        {/* Main Activities */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5">
          {tourPackage.mainActivities.slice(0, 3).map((act, i) => (
            <span
              key={i}
              className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-sm"
            >
              {act}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-5">
          <Link
            to={`/packages/${tourPackage.slug}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-700 hover:text-white rounded-lg transition-colors group/btn"
          >
            <span>View Package Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
