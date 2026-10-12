import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { hotels } from '../data/hotels';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { saveHotelEnquiry } from '../utils/storage';
import {
  ArrowLeft,
  MapPin,
  Star,
  Check,
  Building,
  ShieldAlert,
  Send,
  Calendar,
  Users,
  Compass,
} from 'lucide-react';

export const HotelDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const hotel = hotels.find((h) => h.slug === slug);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestsCount, setGuestsCount] = useState('2');
  const [selectedRoomType, setSelectedRoomType] = useState(
    hotel?.roomTypes[0]?.name || 'Standard Room'
  );
  const [specialRequests, setSpecialRequests] = useState('');

  // Validation & Feedback
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  if (!hotel) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50 p-6 text-center">
        <Compass className="w-12 h-12 text-stone-400 mb-4" />
        <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">
          Hotel Not Found
        </h1>
        <p className="text-stone-600 text-sm max-w-md mb-6">
          The requested sample accommodation is not found. Please browse our other verified sample stays.
        </p>
        <Link
          to="/hotels"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hotels</span>
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!checkInDate) errs.checkInDate = 'Select intended check-in date.';
    if (!checkOutDate) errs.checkOutDate = 'Select intended check-out date.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const record = saveHotelEnquiry({
      hotelSlug: hotel.slug,
      hotelName: hotel.name,
      fullName: fullName.trim(),
      email: email.trim(),
      checkInDate,
      checkOutDate,
      guestsCount: parseInt(guestsCount, 10) || 2,
      roomType: selectedRoomType,
      specialRequests: specialRequests.trim() || undefined,
    });

    setBookingRef(record.id);
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Cover Hero */}
      <section className="relative h-[440px] lg:h-[480px] bg-stone-950 overflow-hidden">
        <ImageWithFallback
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        {/* Back Link */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900/80 backdrop-blur-md text-stone-200 hover:text-white text-xs font-semibold border border-white/10 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-300" />
            <span>Back to Hotels</span>
          </Link>
        </div>

        {/* Title & Region */}
        <div className="absolute bottom-8 left-4 sm:left-8 right-4 sm:right-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-300 mb-2">
            <span>{hotel.type}</span>
            <span aria-hidden="true">·</span>
            <span>{hotel.province} Province</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-white">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{hotel.rating.toFixed(1)} Guest Rating</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {hotel.name}
          </h1>

          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-stone-200">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{hotel.location} · {hotel.region}</span>
          </div>

          {/* Illustrative Nightly Price */}
          <div className="mt-6 pt-4 border-t border-white/15 flex items-baseline gap-2">
            <span className="text-xs text-stone-300 uppercase tracking-wider">Illustrative Rate:</span>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-300 tabular-nums">
              Rs. {hotel.pricePerNightLkr.toLocaleString()}
            </span>
            <span className="text-xs text-stone-400 font-light">LKR / room / night</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        {/* Illustrative Disclaimer Banner */}
        <div className="mb-8 p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3 text-xs text-amber-900 shadow-xs">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Demonstration Listing Notice: </strong>
            This is an illustrative sample accommodation profile for travelers planning journeys in Sri Lanka. Lanka Trip Guide does not process real-time hotel bookings or hold room reservations.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Description, Room Types, Facilities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-3">
                About the Property
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {hotel.description}
              </p>
            </div>

            {/* Room Types */}
            {hotel.roomTypes.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-5">
                  Available Room Types
                </h2>
                <div className="space-y-4">
                  {hotel.roomTypes.map((room, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl border border-stone-200/90 bg-stone-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="font-serif text-base font-bold text-stone-900">
                          {room.name}
                        </div>
                        <div className="text-xs text-stone-500">
                          Max Occupancy: <strong>{room.occupancy}</strong>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {room.features.map((feat, fIdx) => (
                            <span
                              key={fIdx}
                              className="text-[11px] bg-white border border-stone-200 px-2 py-0.5 rounded-sm text-stone-600"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200">
                        <div className="text-[10px] text-stone-400 uppercase">Est. Rate</div>
                        <div className="font-mono text-lg font-bold text-emerald-800 tabular-nums">
                          Rs. {room.pricePerNightLkr.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-stone-500">per night (LKR)</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Facilities */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-5">
                Property Amenities & Facilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hotel.facilities.map((fac, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Attractions */}
            {hotel.nearbyAttractions.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-700" />
                  <span>Nearby Attractions</span>
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                  {hotel.nearbyAttractions.map((att, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-stone-400 font-bold select-none">•</span>
                      <span>{att}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gallery */}
            {hotel.gallery.length > 1 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-4">
                  Property Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hotel.gallery.map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden aspect-4/3 bg-stone-100">
                      <ImageWithFallback
                        src={img}
                        alt={`${hotel.name} gallery image ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Col: Booking Enquiry Form */}
          <div>
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs sticky top-24 space-y-5">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Sample Booking Enquiry
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Enquire about dates and availability for {hotel.name}.
                </p>
              </div>

              {bookingRef ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>Booking Enquiry Saved!</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Demo reference code: <strong className="font-mono">{bookingRef}</strong>.
                  </p>
                  <p className="text-xs text-stone-600 italic bg-white/70 p-3 rounded-lg border border-emerald-100">
                    Reminder: Enquiries are saved exclusively in your browser’s local storage and are not emailed to external hotels.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setBookingRef(null);
                      setFullName('');
                      setEmail('');
                      setCheckInDate('');
                      setCheckOutDate('');
                      setSpecialRequests('');
                    }}
                    className="w-full py-2.5 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    Send Another Demo Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. David Miller"
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 rounded-lg border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-rose-600 mt-0.5 block">{errors.fullName}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 rounded-lg border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                    />
                    {errors.email && (
                      <span className="text-[11px] text-rose-600 mt-0.5 block">{errors.email}</span>
                    )}
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Check-in *
                      </label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                      />
                      {errors.checkInDate && (
                        <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.checkInDate}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Check-out *
                      </label>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                      />
                      {errors.checkOutDate && (
                        <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.checkOutDate}</span>
                      )}
                    </div>
                  </div>

                  {/* Guests & Room Type */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Guests
                      </label>
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 focus:outline-hidden focus:border-emerald-600 text-stone-900"
                      >
                        <option value="1">1 Adult</option>
                        <option value="2">2 Adults</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Room Type
                      </label>
                      <select
                        value={selectedRoomType}
                        onChange={(e) => setSelectedRoomType(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 focus:outline-hidden focus:border-emerald-600 text-stone-900"
                      >
                        {hotel.roomTypes.map((r, i) => (
                          <option key={i} value={r.name}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Special Requests / Notes
                    </label>
                    <textarea
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Airport pickup request, high floor, dietary preferences..."
                      className="w-full px-3 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] rounded-xl shadow-xs transition-colors"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Send Demo Enquiry</span>
                  </button>

                  <p className="text-[11px] text-stone-400 text-center leading-normal">
                    This is an illustrative form. Submissions are saved to localStorage only.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
