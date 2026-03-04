import { Listing } from "@/components/listings/ListingCard";

// Initial mock data
const initialListings: Listing[] = [];

// Category mapping
const categoryMap: Record<string, string> = {
  electronics: "Elektronika",
  documents: "Dokumenti",
  keys: "Atslēgas",
  wallet: "Maks / Somas",
  clothing: "Apģērbs",
  jewelry: "Rotaslietas",
  pets: "Mājdzīvnieki",
  other: "Cits",
};

// Simple in-memory store with localStorage persistence
const STORAGE_KEY = "atradi_listings_v3";

function loadListings(): Listing[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: Listing[] = JSON.parse(stored);
      // If any initial listing is missing userId, reset to fresh data
      const hasStaleData = parsed.some(
        (l) => initialListings.find((il) => il.id === l.id) && !l.userId
      );
      if (hasStaleData) {
        saveListings(initialListings);
        return initialListings;
      }
      return parsed;
    }
  } catch (e) {
    console.error("Failed to load listings from localStorage", e);
  }
  return initialListings;
}

function saveListings(listings: Listing[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  } catch (e) {
    console.error("Failed to save listings to localStorage", e);
  }
}

// Store state
let listings: Listing[] = loadListings();
let listeners: (() => void)[] = [];

export const listingsStore = {
  getListings: (): Listing[] => listings,

  getListing: (id: string): Listing | undefined => {
    return listings.find((l) => l.id === id);
  },

  addListing: (data: {
    title: string;
    description: string;
    category: string;
    location: string;
    date: string;
    type: "lost" | "found";
    images: string[];
    userId?: string;
  }): Listing => {
    const newListing: Listing = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      type: data.type,
      category: categoryMap[data.category] || data.category,
      location: data.location,
      date: data.date || new Date().toISOString().split("T")[0],
      image: data.images[0] || "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400&q=80",
      views: 0,
      userId: data.userId,
    };

    listings = [newListing, ...listings];
    saveListings(listings);
    notifyListeners();
    return newListing;
  },

  deleteListing: (id: string): void => {
    listings = listings.filter((l) => l.id !== id);
    saveListings(listings);
    notifyListeners();
  },

  incrementViews: (id: string): void => {
    listings = listings.map((l) =>
      l.id === id ? { ...l, views: l.views + 1 } : l
    );
    saveListings(listings);
    notifyListeners();
  },

  subscribe: (listener: () => void): (() => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

// Hook for React components
export function useListings(): Listing[] {
  const [, forceUpdate] = React.useState({});

  React.useEffect(() => {
    return listingsStore.subscribe(() => forceUpdate({}));
  }, []);

  return listingsStore.getListings();
}

import * as React from "react";
