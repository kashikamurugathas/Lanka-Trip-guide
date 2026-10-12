# Lanka Trip Guide — Sri Lanka Tourism & Itinerary Guide

A complete, modern, responsive travel guide website for visitors exploring Sri Lanka, built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **8 Dedicated Routes & Pages:**
  - **Home (`/`)**: Breathtaking hero landscape photography, destination search bar, featured sights, popular packages, island inspirations, and sample testimonials.
  - **Destinations (`/destinations`)**: Comprehensive discovery of 16 Sri Lankan destinations (Sigiriya, Ella, Galle Fort, Mirissa, Nuwara Eliya, Kandy, Anuradhapura, Polonnaruwa, Trincomalee, Jaffna, Yala, Horton Plains, Arugam Bay, Dambulla, Bentota, Adam’s Peak) with real-time search, category filters, province filters, and LKR budget filters.
  - **Destination Details (`/destinations/:slug`)**: In-depth individual guide for each destination covering history, main attractions, things to do, seasonal caveats, visit durations, local travel budgets in LKR, tips, gallery, nearby destinations, and an "Add to My Trip" action.
  - **Tour Packages (`/packages`)**: Curated travel packages across the island with filters for duration and budget.
  - **Tour Package Details (`/packages/:slug`)**: Full day-by-day itineraries, inclusions, exclusions, sample accommodations, and a validated trip enquiry form saved to `localStorage`.
  - **Trip Planner (`/trip-planner`)**: Interactive client-side trip planner with date pickers, traveller count, target budget, destination add/remove, up/down reordering, personal notes, day-by-day itinerary summary, `localStorage` save/load, and print/PDF export (`window.print()`).
  - **Hotels (`/hotels`)**: Curated spectrum of accommodations across luxury resorts, boutique hotels, mid-range stays, eco-lodges, and budget guesthouses.
  - **Hotel Details (`/hotels/:slug`)**: Detailed room types, nightly rates in LKR, property amenities, and a validated booking enquiry form saved to `localStorage`.
  - **Travel Guide (`/travel-guide`)**: Practical advice covering weather and dual monsoons, mountain trains, local food, sacred temple etiquette, packing checklists, LKR currency & tipping, safety hotlines (1912 & 1990), and useful Sinhala & Tamil phrasebooks.
  - **About Us (`/about`)**: Island mission, vision, and tourism highlights.
  - **Contact Us (`/contact`)**: Validated contact form with client-side persistence and official tourist assistance hotlines.
  - **404 Not Found (`*`)**: Thoughtful not-found page with recovery links.

- **Authentic Local LKR Currency:**
  - All pricing is strictly displayed in Sri Lankan Rupees (LKR / Rs.) with realistic local rates for tickets, transport, and meals. No USD or dollar prices.

- **Frontend-Only Architecture:**
  - No external backend, API keys, or databases required. All data is structured statically in TypeScript files, with enquiries and itineraries stored locally in the user's browser via `localStorage`.

## Getting Started Locally

### Prerequisites
- Node.js (version 18 or newer recommended)
- npm

### Installation

1. Clone or download the repository to your local machine.
2. Open a terminal in the project directory.
3. Install project dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

To launch the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the URL displayed in your terminal).

### Building for Production

To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

### Checking Types & Linting

```bash
npm run lint
```
