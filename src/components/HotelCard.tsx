import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { ArrowRight, MapPin, Star } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <ImageWithFallback
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent pointer-events-none" />

        {/* Accommodation Type */}
        <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide">
          {hotel.type}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-stone-900 px-2 py-0.5 rounded-md text-xs font-semibold flex items-center gap-1 shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{hotel.rating.toFixed(1)}</span>
        </div>

        {/* Price tag in LKR */}
        <div className="absolute bottom-3 right-4 text-right">
          <div className="text-[10px] text-stone-300 uppercase tracking-wider">Illustrative Rate</div>
          <div className="font-mono text-base font-bold text-white tabular-nums">
            Rs. {hotel.pricePerNightLkr.toLocaleString()}
            <span className="text-xs font-normal text-stone-300"> / night</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
          {hotel.name}
        </h3>

        {/* Location */}
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-stone-500">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="line-clamp-1">{hotel.location}</span>
          <span aria-hidden="true">·</span>
          <span>{hotel.region}</span>
        </div>

        {/* Description */}
        <p className="mt-2.5 text-sm text-stone-600 line-clamp-2 leading-relaxed flex-1">
          {hotel.description}
        </p>

        {/* Key Facilities snippet */}
        <div className="mt-3.5 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5 text-[11px] text-stone-600">
          {hotel.facilities.slice(0, 3).map((facility, i) => (
            <span key={i} className="bg-stone-50 border border-stone-200/60 px-2 py-0.5 rounded-sm">
              {facility}
            </span>
          ))}
          {hotel.facilities.length > 3 && (
            <span className="text-stone-400 self-center">+{hotel.facilities.length - 3} more</span>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <Link
            to={`/hotels/${hotel.slug}`}
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
