import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tourPackages } from '../data/packages';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { saveTourEnquiry } from '../utils/storage';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Check,
  X,
  Send,
  Calendar,
  Users,
  Building,
  Info,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export const PackageDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const tourPackage = tourPackages.find((p) => p.slug === slug);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelersCount, setTravelersCount] = useState('2');
  const [notes, setNotes] = useState('');

  // Form Validation & Feedback
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  if (!tourPackage) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50 p-6 text-center">
        <Compass className="w-12 h-12 text-stone-400 mb-4" />
        <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">
          Tour Package Not Found
        </h1>
        <p className="text-stone-600 text-sm max-w-md mb-6">
          The requested tour package is not found or has been updated. Please explore our other curated itineraries.
        </p>
        <Link
          to="/packages"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tour Packages</span>
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
      errs.email = 'Please provide a valid email format (e.g. name@example.com).';
    }
    if (!travelDate) errs.travelDate = 'Please select an intended travel date.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const record = saveTourEnquiry({
      packageSlug: tourPackage.slug,
      packageName: tourPackage.name,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      travelDate,
      travelersCount: parseInt(travelersCount, 10) || 2,
      notes: notes.trim() || undefined,
    });

    setSubmittedRef(record.id);
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Cover Hero */}
      <section className="relative h-[440px] lg:h-[500px] bg-stone-950 overflow-hidden">
        <ImageWithFallback
          src={tourPackage.coverImage}
          alt={tourPackage.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-transparent" />

        {/* Back Link */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900/80 backdrop-blur-md text-stone-200 hover:text-white text-xs font-semibold border border-white/10 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-300" />
            <span>Back to Tour Packages</span>
          </Link>
        </div>

        {/* Title & Duration */}
        <div className="absolute bottom-8 left-4 sm:left-8 right-4 sm:right-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-300 mb-2">
            <Clock className="w-4 h-4" />
            <span>{tourPackage.duration}</span>
            <span aria-hidden="true">·</span>
            <span>{tourPackage.durationDays} Day Itinerary</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {tourPackage.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-stone-300">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Destinations: <strong>{tourPackage.destinations.join(' → ')}</strong></span>
          </div>

          {/* Price */}
          <div className="mt-6 pt-4 border-t border-white/15 flex items-baseline gap-2">
            <span className="text-xs text-stone-300 uppercase tracking-wider">Estimated Price:</span>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-300 tabular-nums">
              Rs. {tourPackage.estimatedPriceLkr.toLocaleString()}
            </span>
            <span className="text-xs text-stone-400 font-light">LKR / per person (est.)</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Overview, Itinerary, Inclusions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-3">
                Tour Overview
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {tourPackage.overview}
              </p>

              {/* Highlights */}
              <div className="mt-6 pt-6 border-t border-stone-100">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-3">
                  Key Journey Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {tourPackage.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 p-2.5 rounded-lg bg-stone-50"
                    >
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">
                Day-by-Day Itinerary
              </h2>

              <div className="space-y-6">
                {tourPackage.itinerary.map((day) => (
                  <div
                    key={day.dayNumber}
                    className="relative pl-6 border-l-2 border-emerald-500/40 pb-2 last:pb-0"
                  >
                    {/* Circle marker */}
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow-xs" />

                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-sm">
                        Day {day.dayNumber}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        {day.title}
                      </h3>
                    </div>

                    {/* Places */}
                    <div className="text-xs text-stone-500 mb-3 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{day.places.join(', ')}</span>
                    </div>

                    {/* Activities */}
                    <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700 mb-3">
                      {day.activities.map((act, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-stone-400 font-bold select-none">•</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Meals & Stay */}
                    <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 grid grid-cols-1 sm:grid-cols-2 gap-2 border border-stone-200/60">
                      <div>
                        <strong className="text-stone-800">Meals: </strong>
                        {day.meals}
                      </div>
                      <div>
                        <strong className="text-stone-800">Stay: </strong>
                        {day.overnightStay}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">
                What is Included & Excluded
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Included in Package</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                    {tourPackage.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-800 mb-3 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Excluded</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                    {tourPackage.exclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Accommodation & Recommendations */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2 flex items-center gap-2">
                  <Building className="w-5 h-5 text-emerald-700" />
                  <span>Sample Accommodation</span>
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {tourPackage.sampleAccommodation}
                </p>
              </div>

              <div className="pt-5 border-t border-stone-100">
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5 text-amber-500" />
                  <span>Travel Recommendations</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                  {tourPackage.travelRecommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-stone-400 font-bold select-none">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Col: Trip Enquiry Form */}
          <div>
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs sticky top-24 space-y-5">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Trip Enquiry Form
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Enquire about {tourPackage.name} for your planned travel dates.
                </p>
              </div>

              {submittedRef ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>Enquiry Saved Successfully!</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Your enquiry reference is <strong className="font-mono">{submittedRef}</strong>.
                  </p>
                  <p className="text-xs text-stone-600 italic bg-white/70 p-3 rounded-lg border border-emerald-100">
                    Notice: This is a frontend-only guide. Enquiries are stored securely in your browser’s local storage and are not transmitted to an external agency.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRef(null);
                      setFullName('');
                      setEmail('');
                      setTravelDate('');
                      setNotes('');
                    }}
                    className="w-full py-2.5 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rachel Silva"
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

                  {/* Phone (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+94 77 123 4567"
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 rounded-lg border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                    />
                  </div>

                  {/* Travel Date */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Estimated Travel Date *
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 rounded-lg border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                    />
                    {errors.travelDate && (
                      <span className="text-[11px] text-rose-600 mt-0.5 block">{errors.travelDate}</span>
                    )}
                  </div>

                  {/* Number of Travellers */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Number of Travellers
                    </label>
                    <select
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 rounded-lg border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3">3 Persons</option>
                      <option value="4">4 Persons</option>
                      <option value="6">6+ Persons</option>
                    </select>
                  </div>

                  {/* Notes / Special Requests */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Specific Interests or Inquiries
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Vegetarian meals, scenic train observation car preference..."
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 rounded-lg border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] rounded-xl shadow-xs transition-colors"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Submit Demo Enquiry</span>
                  </button>

                  <p className="text-[11px] text-stone-400 text-center leading-normal">
                    Enquiries are saved only in the current browser and are not sent to an external travel agency.
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
