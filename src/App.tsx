/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailsPage } from './pages/DestinationDetailsPage';
import { PackagesPage } from './pages/PackagesPage';
import { PackageDetailsPage } from './pages/PackageDetailsPage';
import { TripPlannerPage } from './pages/TripPlannerPage';
import { HotelsPage } from './pages/HotelsPage';
import { HotelDetailsPage } from './pages/HotelDetailsPage';
import { TravelGuidePage } from './pages/TravelGuidePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:slug" element={<DestinationDetailsPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/:slug" element={<PackageDetailsPage />} />
            <Route path="/trip-planner" element={<TripPlannerPage />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/hotels/:slug" element={<HotelDetailsPage />} />
            <Route path="/travel-guide" element={<TravelGuidePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
