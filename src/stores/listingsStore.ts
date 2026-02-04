import { Listing } from "@/components/listings/ListingCard";

// Initial mock data
const initialListings: Listing[] = [
  {
    id: "1",
    title: "Melns iPhone 15 Pro ar sarkanu maciņu",
    description: "Pazaudēju telefonu Vecrīgā, pie Doma laukuma. Ekrānam ir neliela skramba stūrī.",
    type: "lost",
    category: "Elektronika",
    location: "Rīga, Vecrīga",
    date: "2024-01-28",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80",
    views: 245,
  },
  {
    id: "2",
    title: "Atrasts maks ar dokumentiem",
    description: "Atradu brūnu ādas maku ar personas dokumentiem un bankas kartēm. Atrasts pie Origo.",
    type: "found",
    category: "Maks / Somas",
    location: "Rīga, Centrs",
    date: "2024-01-28",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
    views: 189,
  },
  {
    id: "3",
    title: "Pazudis kaķis Mincis",
    description: "Pelēks kaķis ar baltām ķepiņām. Pazuda Āgenskalnā. Ļoti pietrūkst mūsu ģimenei.",
    type: "lost",
    category: "Mājdzīvnieki",
    location: "Rīga, Āgenskalns",
    date: "2024-01-27",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80",
    views: 567,
  },
  {
    id: "4",
    title: "Atrastas automašīnas atslēgas",
    description: "VW atslēgas ar melnu piekariņu. Atrastas pie Stockmann veikala ieejas.",
    type: "found",
    category: "Atslēgas",
    location: "Rīga, Centrs",
    date: "2024-01-27",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    views: 98,
  },
  {
    id: "5",
    title: "Pazaudētas airpods austiņas",
    description: "Baltas Apple AirPods Pro ar melnu maciņu. Pazaudētas Alfa centrā, pie kafejnīcas.",
    type: "lost",
    category: "Elektronika",
    location: "Rīga, Alfa",
    date: "2024-01-26",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80",
    views: 156,
  },
  {
    id: "6",
    title: "Atrasta sudraba aproce",
    description: "Skaista sudraba aproce ar sirdspuķēm. Atrasta Bastejkalnā pie soliņa.",
    type: "found",
    category: "Rotaslietas",
    location: "Rīga, Bastejkalns",
    date: "2024-01-26",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
    views: 234,
  },
  {
    id: "7",
    title: "Pazaudēts suns - Reksis",
    description: "Labradoru retrīvers, dzeltens. Pazudis Mežaparkā pastaigājoties. Draudzīgs un mīlošs.",
    type: "lost",
    category: "Mājdzīvnieki",
    location: "Rīga, Mežaparks",
    date: "2024-01-25",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    views: 892,
  },
  {
    id: "8",
    title: "Atrasts bērnu mugursoma",
    description: "Zila mugursoma ar Spiderman zīmējumu. Atrasta pie Ķengaraga skolas.",
    type: "found",
    category: "Cits",
    location: "Rīga, Ķengarags",
    date: "2024-01-25",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    views: 67,
  },
];

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
const STORAGE_KEY = "atradi_listings";

function loadListings(): Listing[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
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

  addListing: (data: {
    title: string;
    description: string;
    category: string;
    location: string;
    date: string;
    type: "lost" | "found";
    images: string[];
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
    };

    listings = [newListing, ...listings];
    saveListings(listings);
    notifyListeners();
    return newListing;
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
