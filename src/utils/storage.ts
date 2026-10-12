import { SavedTripPlan, TourEnquiry, HotelEnquiry, ContactMessage } from '../types';

const STORAGE_KEYS = {
  TRIP_PLANS: 'lanka_trip_guide_plans_v1',
  CURRENT_DRAFT_PLAN: 'lanka_trip_guide_draft_plan_v1',
  TOUR_ENQUIRIES: 'lanka_trip_guide_tour_enquiries_v1',
  HOTEL_ENQUIRIES: 'lanka_trip_guide_hotel_enquiries_v1',
  CONTACT_MESSAGES: 'lanka_trip_guide_contact_messages_v1',
};

// --- Trip Plans ---
export function getSavedTripPlans(): SavedTripPlan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRIP_PLANS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading saved trip plans:', e);
    return [];
  }
}

export function saveTripPlan(plan: SavedTripPlan): void {
  try {
    const plans = getSavedTripPlans();
    const existingIndex = plans.findIndex((p) => p.id === plan.id);
    if (existingIndex >= 0) {
      plans[existingIndex] = { ...plan, updatedAt: new Date().toISOString() };
    } else {
      plans.unshift({ ...plan, updatedAt: new Date().toISOString() });
    }
    localStorage.setItem(STORAGE_KEYS.TRIP_PLANS, JSON.stringify(plans));
  } catch (e) {
    console.error('Error saving trip plan:', e);
  }
}

export function deleteSavedTripPlan(id: string): void {
  try {
    const plans = getSavedTripPlans().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.TRIP_PLANS, JSON.stringify(plans));
  } catch (e) {
    console.error('Error deleting trip plan:', e);
  }
}

export function getDraftPlan(): Partial<SavedTripPlan> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_DRAFT_PLAN);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveDraftPlan(plan: Partial<SavedTripPlan>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_DRAFT_PLAN, JSON.stringify(plan));
  } catch (e) {
    console.error('Error saving draft plan:', e);
  }
}

// --- Tour Enquiries ---
export function getTourEnquiries(): TourEnquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TOUR_ENQUIRIES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveTourEnquiry(enquiry: Omit<TourEnquiry, 'id' | 'submittedAt'>): TourEnquiry {
  const newEnquiry: TourEnquiry = {
    ...enquiry,
    id: 'ENQ-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    submittedAt: new Date().toISOString(),
  };
  try {
    const list = getTourEnquiries();
    list.unshift(newEnquiry);
    localStorage.setItem(STORAGE_KEYS.TOUR_ENQUIRIES, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving enquiry:', e);
  }
  return newEnquiry;
}

// --- Hotel Enquiries ---
export function getHotelEnquiries(): HotelEnquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HOTEL_ENQUIRIES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveHotelEnquiry(enquiry: Omit<HotelEnquiry, 'id' | 'submittedAt'>): HotelEnquiry {
  const newEnquiry: HotelEnquiry = {
    ...enquiry,
    id: 'HTL-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    submittedAt: new Date().toISOString(),
  };
  try {
    const list = getHotelEnquiries();
    list.unshift(newEnquiry);
    localStorage.setItem(STORAGE_KEYS.HOTEL_ENQUIRIES, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving hotel enquiry:', e);
  }
  return newEnquiry;
}

// --- Contact Messages ---
export function getContactMessages(): ContactMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTACT_MESSAGES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveContactMessage(msg: Omit<ContactMessage, 'id' | 'submittedAt'>): ContactMessage {
  const newMsg: ContactMessage = {
    ...msg,
    id: 'MSG-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    submittedAt: new Date().toISOString(),
  };
  try {
    const list = getContactMessages();
    list.unshift(newMsg);
    localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving contact message:', e);
  }
  return newMsg;
}
