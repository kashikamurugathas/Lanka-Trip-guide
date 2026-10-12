import React from 'react';
import { Link } from 'react-router-dom';
import { Destination } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { ArrowRight, MapPin } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <ImageWithFallback
          src={destination.coverImage}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent pointer-events-none" />

        {/* Region & Province overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 font-medium drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span>{destination.region}</span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span>{destination.province} Province</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Unboxed Metadata (Zero-Pill Rule) */}
        <div className="flex items-center gap-2 text-xs text-emerald-800 font-medium mb-1.5">
          <span>{destination.category}</span>
          {destination.localNameSinhala && (
            <>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-500 font-normal">{destination.localNameSinhala}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
          {destination.name}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-stone-600 line-clamp-2 leading-relaxed flex-1">
          {destination.summary}
        </p>

        {/* Local Budget in LKR */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div>
            <span>Est. Daily Budget: </span>
            <strong className="text-stone-900 font-semibold font-mono tabular-nums">
              Rs. {destination.estimatedBudgetLkr.budgetDaily.toLocaleString()}
            </strong>
          </div>
          <span className="text-stone-400">{destination.visitDuration}</span>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <Link
            to={`/destinations/${destination.slug}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-700 hover:text-white rounded-lg transition-colors group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
