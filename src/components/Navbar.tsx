import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, CalendarCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Tour Packages', path: '/packages' },
    { label: 'Trip Planner', path: '/trip-planner' },
    { label: 'Hotels', path: '/hotels' },
    { label: 'Travel Guide', path: '/travel-guide' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-stone-900 group whitespace-nowrap shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-800 transition-colors">
              <Compass className="w-5 h-5 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-emerald-950 leading-tight">
                Lanka Trip Guide
              </span>
              <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-semibold">
                Explore Sri Lanka
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `transition-colors py-1 whitespace-nowrap ${
                    isActive
                      ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                      : 'hover:text-stone-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action / CTA & Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/trip-planner"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs hover:shadow-md transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <CalendarCheck className="w-4 h-4 text-amber-300" />
              <span>Plan Your Trip</span>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden inline-flex items-center justify-center p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors focus:outline-hidden"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="pt-4 border-t border-stone-200">
            <Link
              to="/trip-planner"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
            >
              <CalendarCheck className="w-4 h-4 text-amber-300" />
              <span>Plan Your Trip</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
