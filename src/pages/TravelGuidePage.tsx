import React, { useState } from 'react';
import { travelGuideSections } from '../data/travelGuide';
import {
  Sun,
  Train,
  Utensils,
  Building,
  CreditCard,
  Briefcase,
  ShieldCheck,
  Languages,
  Leaf,
  Compass,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

export const TravelGuidePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(travelGuideSections[0]?.id || 'best-time-weather');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-5 h-5" />;
      case 'Train':
        return <Train className="w-5 h-5" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5" />;
      case 'Building':
        return <Building className="w-5 h-5" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Languages':
        return <Languages className="w-5 h-5" />;
      case 'Leaf':
        return <Leaf className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  const currentSection = travelGuideSections.find((s) => s.id === activeTab) || travelGuideSections[0];

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Essential Tourist Handbook</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Sri Lanka Travel Guide
          </h1>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Everything you need for an unforgettable, safe, and culturally respectful journey across the island—from monsoon climate patterns to sacred temple etiquette and local transport.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="bg-white rounded-2xl p-2 sm:p-3 border border-stone-200 shadow-xs mb-10 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 min-w-max">
            {travelGuideSections.map((sec) => {
              const isActive = sec.id === activeTab;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveTab(sec.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <span className={isActive ? 'text-amber-300' : 'text-stone-400'}>
                    {getIcon(sec.iconName)}
                  </span>
                  <span>{sec.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Section Content */}
        {currentSection && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-8 animate-in fade-in duration-200">
            {/* Title & Subtitle */}
            <div className="border-b border-stone-100 pb-6">
              <div className="flex items-center gap-3 text-emerald-800 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  {getIcon(currentSection.iconName)}
                </div>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                    {currentSection.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 font-medium">
                    {currentSection.shortDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Introductory Paragraphs */}
            <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
              {currentSection.content.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Key Guidance Points */}
            {currentSection.content.bulletPoints && currentSection.content.bulletPoints.length > 0 && (
              <div className="space-y-4 pt-2">
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Key Insights & Practical Advice
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentSection.content.bulletPoints.map((bp, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5"
                    >
                      <h4 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{bp.label}</span>
                      </h4>
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed pl-6">
                        {bp.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Table (e.g., Useful Sinhala & Tamil Phrases) */}
            {currentSection.content.tables && (
              <div className="pt-4 space-y-4">
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Language & Essential Phrasebook
                </h3>
                <div className="overflow-x-auto rounded-xl border border-stone-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-stone-100 text-stone-800 font-semibold border-b border-stone-200">
                      <tr>
                        {currentSection.content.tables.headers.map((h, i) => (
                          <th key={i} className="p-3.5">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 bg-white">
                      {currentSection.content.tables.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-stone-50/70 transition-colors">
                          <td className="p-3.5 font-semibold text-stone-900">{row[0]}</td>
                          <td className="p-3.5 text-emerald-900 font-medium">{row[1]}</td>
                          <td className="p-3.5 text-teal-900 font-medium">{row[2]}</td>
                          <td className="p-3.5 text-stone-600 text-xs">{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Key Highlights & Callouts */}
            {currentSection.content.highlights && currentSection.content.highlights.length > 0 && (
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-emerald-700" />
                  <span>Important Traveler Advisory</span>
                </div>
                {currentSection.content.highlights.map((h, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-emerald-950 font-medium">
                    {h}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
