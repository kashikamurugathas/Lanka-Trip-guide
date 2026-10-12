import React, { useState, useEffect } from 'react';
import { destinations } from '../data/destinations';
import { ItineraryItem, SavedTripPlan } from '../types';
import {
  getSavedTripPlans,
  saveTripPlan,
  deleteSavedTripPlan,
  getDraftPlan,
  saveDraftPlan,
} from '../utils/storage';
import {
  Calendar,
  Users,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Printer,
  Save,
  FolderOpen,
  CheckCircle2,
  AlertCircle,
  Coins,
  MapPin,
  Clock,
  FileText,
  Compass,
} from 'lucide-react';

export const TripPlannerPage: React.FC = () => {
  // Plan metadata
  const [tripTitle, setTripTitle] = useState('My Sri Lanka Journey');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [targetBudgetLkr, setTargetBudgetLkr] = useState<number>(150000);
  const [generalNotes, setGeneralNotes] = useState('');

  // Itinerary Items
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>([]);

  // Selected destination from dropdown
  const [selectedDestinationSlug, setSelectedDestinationSlug] = useState(
    destinations[0]?.slug || ''
  );
  const [daysToAdd, setDaysToAdd] = useState<number>(1);

  // Saved plans management
  const [savedPlans, setSavedPlans] = useState<SavedTripPlan[]>([]);
  const [currentPlanId, setCurrentPlanId] = useState<string>('PLAN-' + Date.now());
  const [saveStatusMessage, setSaveStatusMessage] = useState<string | null>(null);

  // Initialize draft and saved plans
  useEffect(() => {
    setSavedPlans(getSavedTripPlans());

    const draft = getDraftPlan();
    if (draft && draft.items && draft.items.length > 0) {
      if (draft.title) setTripTitle(draft.title);
      if (draft.startDate) setStartDate(draft.startDate);
      if (draft.endDate) setEndDate(draft.endDate);
      if (draft.travelersCount) setTravelersCount(draft.travelersCount);
      if (draft.totalBudgetLkr) setTargetBudgetLkr(draft.totalBudgetLkr);
      if (draft.generalNotes) setGeneralNotes(draft.generalNotes);
      setItineraryItems(draft.items);
    } else {
      // Default initial itinerary: Sigiriya, Kandy, Ella
      const initialStops: ItineraryItem[] = [
        {
          id: 'item-1',
          destinationSlug: 'sigiriya',
          destinationName: 'Sigiriya Rock Fortress',
          days: 2,
          notes: 'Climb Sigiriya at dawn, visit Dambulla cave temple in afternoon.',
          estimatedDailyBudgetLkr: 16000,
        },
        {
          id: 'item-2',
          destinationSlug: 'kandy',
          destinationName: 'Kandy',
          days: 2,
          notes: 'Temple of the Tooth puja ceremony and Peradeniya Botanical Gardens.',
          estimatedDailyBudgetLkr: 12000,
        },
        {
          id: 'item-3',
          destinationSlug: 'ella',
          destinationName: 'Ella',
          days: 2,
          notes: 'Board scenic mountain train from Nanu Oya. Hike Nine Arch Bridge.',
          estimatedDailyBudgetLkr: 12000,
        },
      ];
      setItineraryItems(initialStops);
    }
  }, []);

  // Sync draft to storage on changes
  useEffect(() => {
    saveDraftPlan({
      id: currentPlanId,
      title: tripTitle,
      startDate,
      endDate,
      travelersCount,
      totalBudgetLkr: targetBudgetLkr,
      items: itineraryItems,
      generalNotes,
    });
  }, [tripTitle, startDate, endDate, travelersCount, targetBudgetLkr, itineraryItems, generalNotes, currentPlanId]);

  // Add destination to itinerary
  const handleAddDestination = () => {
    const dest = destinations.find((d) => d.slug === selectedDestinationSlug);
    if (!dest) return;

    const newItem: ItineraryItem = {
      id: 'item-' + Date.now(),
      destinationSlug: dest.slug,
      destinationName: dest.name,
      days: daysToAdd,
      notes: `Visit attractions in ${dest.name} (${dest.region}).`,
      estimatedDailyBudgetLkr: dest.estimatedBudgetLkr.budgetDaily,
    };

    setItineraryItems((prev) => [...prev, newItem]);
  };

  // Remove destination
  const handleRemoveItem = (id: string) => {
    setItineraryItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Reorder controls
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setItineraryItems((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === itineraryItems.length - 1) return;
    setItineraryItems((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  // Update item notes or days
  const handleItemDaysChange = (id: string, days: number) => {
    setItineraryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, days: Math.max(1, days) } : item))
    );
  };

  const handleItemNotesChange = (id: string, notes: string) => {
    setItineraryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  };

  // Calculations
  const totalDays = itineraryItems.reduce((acc, item) => acc + item.days, 0);

  // Total estimated budget: sum of (item.days * item.estimatedDailyBudgetLkr * travelersCount)
  const estimatedCostLkr = itineraryItems.reduce((acc, item) => {
    return acc + item.days * item.estimatedDailyBudgetLkr * (travelersCount || 1);
  }, 0);

  // Save current plan
  const handleSavePlan = () => {
    const plan: SavedTripPlan = {
      id: currentPlanId,
      title: tripTitle.trim() || 'My Sri Lanka Journey',
      startDate,
      endDate,
      travelersCount,
      totalBudgetLkr: targetBudgetLkr,
      items: itineraryItems,
      generalNotes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveTripPlan(plan);
    setSavedPlans(getSavedTripPlans());
    setSaveStatusMessage('Plan saved to browser local storage!');
    setTimeout(() => setSaveStatusMessage(null), 3500);
  };

  // Load a saved plan
  const handleLoadPlan = (plan: SavedTripPlan) => {
    setCurrentPlanId(plan.id);
    setTripTitle(plan.title);
    setStartDate(plan.startDate || '');
    setEndDate(plan.endDate || '');
    setTravelersCount(plan.travelersCount || 2);
    setTargetBudgetLkr(plan.totalBudgetLkr || 150000);
    setItineraryItems(plan.items || []);
    setGeneralNotes(plan.generalNotes || '');
    setSaveStatusMessage(`Loaded plan: "${plan.title}"`);
    setTimeout(() => setSaveStatusMessage(null), 3500);
  };

  // Delete saved plan
  const handleDeletePlan = (id: string) => {
    deleteSavedTripPlan(id);
    setSavedPlans(getSavedTripPlans());
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-1">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Interactive Travel Tool</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Sri Lanka Trip Planner
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-600">
              Customize stops, manage days, estimate budgets in Sri Lankan Rupees (LKR), and print or save your travel itinerary.
            </p>
          </div>

          {/* Action Buttons: Save & Print */}
          <div className="flex items-center gap-3 no-print">
            <button
              type="button"
              onClick={handleSavePlan}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] rounded-xl shadow-xs transition-colors"
            >
              <Save className="w-4 h-4 text-amber-300" />
              <span>Save Plan</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-800 bg-white border border-stone-300 hover:bg-stone-100 rounded-xl shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4 text-emerald-700" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Status Message */}
        {saveStatusMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2 animate-in fade-in no-print">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveStatusMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Trip Settings & Destination Adder */}
          <div className="space-y-6 no-print">
            {/* Trip Details Card */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h2 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>Trip Overview</span>
              </h2>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Trip Plan Title
                </label>
                <input
                  type="text"
                  value={tripTitle}
                  onChange={(e) => setTripTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 rounded-lg border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-stone-50 rounded-lg border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-stone-50 rounded-lg border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                  />
                </div>
              </div>

              {/* Travellers & Target Budget */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Travellers
                  </label>
                  <select
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(parseInt(e.target.value, 10))}
                    className="w-full px-2.5 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 text-stone-900 focus:outline-hidden focus:border-emerald-600"
                  >
                    <option value={1}>1 Solo Explorer</option>
                    <option value={2}>2 Travellers</option>
                    <option value={3}>3 Travellers</option>
                    <option value={4}>4 Travellers</option>
                    <option value={6}>6+ Travellers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Target Budget (LKR)
                  </label>
                  <input
                    type="number"
                    step="5000"
                    value={targetBudgetLkr}
                    onChange={(e) => setTargetBudgetLkr(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-2.5 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 text-stone-900 focus:outline-hidden focus:border-emerald-600 font-mono tabular-nums"
                  />
                </div>
              </div>

              {/* General Notes */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  General Trip Notes
                </label>
                <textarea
                  rows={2}
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  placeholder="e.g. Remember warm fleece for Nuwara Eliya; book scenic train tickets 30 days ahead..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                />
              </div>
            </div>

            {/* Add Destination Card */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h2 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-700" />
                <span>Add Destination</span>
              </h2>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Choose Destination
                </label>
                <select
                  value={selectedDestinationSlug}
                  onChange={(e) => setSelectedDestinationSlug(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 text-stone-900 focus:outline-hidden focus:border-emerald-600"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.slug}>
                      {d.name} ({d.region})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Days to Spend
                </label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={daysToAdd}
                  onChange={(e) => setDaysToAdd(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 text-stone-900 focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <button
                type="button"
                onClick={handleAddDestination}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Itinerary</span>
              </button>
            </div>

            {/* Saved Plans Browser */}
            {savedPlans.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
                <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-emerald-700" />
                  <span>My Saved Plans ({savedPlans.length})</span>
                </h3>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {savedPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="p-2.5 rounded-xl border border-stone-200/80 bg-stone-50 hover:bg-stone-100 transition-colors flex items-center justify-between text-xs"
                    >
                      <button
                        type="button"
                        onClick={() => handleLoadPlan(plan)}
                        className="text-left font-medium text-stone-900 hover:text-emerald-800 truncate mr-2"
                      >
                        <div className="font-semibold truncate">{plan.title}</div>
                        <div className="text-[10px] text-stone-500">
                          {plan.items?.length || 0} stops · {new Date(plan.updatedAt).toLocaleDateString()}
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                        title="Delete plan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right 2 Columns: Itinerary List & Estimated Budget Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header summary strip */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  {tripTitle}
                </h2>
                <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                  <span>{totalDays} Total Days</span>
                  <span aria-hidden="true">·</span>
                  <span>{itineraryItems.length} Destinations</span>
                  <span aria-hidden="true">·</span>
                  <span>{travelersCount} Travellers</span>
                </div>
              </div>

              {/* Budget Badge */}
              <div className="text-right">
                <div className="text-[11px] text-stone-500 uppercase tracking-wider">
                  Estimated Travel Cost
                </div>
                <div className="font-mono text-xl font-bold text-emerald-800 tabular-nums">
                  Rs. {estimatedCostLkr.toLocaleString()}
                  <span className="text-xs font-normal text-stone-500"> LKR</span>
                </div>
              </div>
            </div>

            {/* Budget Estimate Warning Disclaimer */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/70 flex items-start gap-3 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Budget Disclaimer: </strong>
                All budget figures are realistic estimates based on local entrance fees, transport, and meal costs in Sri Lankan Rupees (LKR). Actual expenses vary depending on your choice of accommodation, private chauffeur options, and personal spending.
              </div>
            </div>

            {/* Itinerary Items List */}
            <div className="space-y-4">
              {itineraryItems.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">
                  <MapPin className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                    Your Itinerary is Empty
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                    Use the destination picker on the left to start adding stops to your Sri Lankan journey.
                  </p>
                </div>
              ) : (
                itineraryItems.map((item, idx) => {
                  const destInfo = destinations.find((d) => d.slug === item.destinationSlug);

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-emerald-300 transition-colors space-y-3"
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <h3 className="font-serif text-lg font-bold text-stone-900">
                              {item.destinationName}
                            </h3>
                            {destInfo && (
                              <div className="text-xs text-stone-500">
                                {destInfo.region} · {destInfo.category}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Reorder and Delete controls */}
                        <div className="flex items-center gap-1 no-print">
                          <button
                            type="button"
                            onClick={() => handleMoveUp(idx)}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-100 disabled:opacity-20"
                            title="Move Up"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveDown(idx)}
                            disabled={idx === itineraryItems.length - 1}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-100 disabled:opacity-20"
                            title="Move Down"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Remove Stop"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Days & Estimated Cost */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-100 text-xs">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-stone-400" />
                          <label className="font-medium text-stone-700">Days to Spend:</label>
                          <input
                            type="number"
                            min="1"
                            max="14"
                            value={item.days}
                            onChange={(e) =>
                              handleItemDaysChange(item.id, parseInt(e.target.value, 10) || 1)
                            }
                            className="w-16 px-2 py-1 text-xs bg-stone-50 rounded border border-stone-200 text-stone-900 font-mono text-center"
                          />
                        </div>

                        <div className="flex items-center sm:justify-end gap-1.5 text-stone-600">
                          <Coins className="w-4 h-4 text-emerald-600" />
                          <span>Est. Stop Cost: </span>
                          <strong className="font-mono text-stone-900 tabular-nums">
                            Rs. {(item.days * item.estimatedDailyBudgetLkr * travelersCount).toLocaleString()} LKR
                          </strong>
                        </div>
                      </div>

                      {/* Notes Input */}
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-500 mb-1">
                          Personal Stop Notes
                        </label>
                        <input
                          type="text"
                          value={item.notes}
                          onChange={(e) => handleItemNotesChange(item.id, e.target.value)}
                          placeholder="e.g. Remember to buy train tickets, climb Pidurangala at dawn..."
                          className="w-full px-3 py-1.5 text-xs bg-stone-50 rounded-lg border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-800"
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Printable summary footer (visible on print) */}
            <div className="hidden print:block pt-8 border-t border-stone-300 text-xs text-stone-600 space-y-2">
              <div className="font-bold text-stone-900">Lanka Trip Guide — Custom Itinerary</div>
              <div>Generated on {new Date().toLocaleDateString()} for {travelersCount} traveller(s).</div>
              <div>All budgets estimated in Sri Lankan Rupees (LKR). For assistance, call the Sri Lanka Tourism Hotline at 1912.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
