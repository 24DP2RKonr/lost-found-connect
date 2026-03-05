import * as React from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Listing {
  id: string;
  title: string;
  description: string;
  type: "lost" | "found";
  category: string;
  location: string;
  date: string;
  image: string;
  views: number;
  userId?: string;
  created_at?: string;
}

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

function mapRow(row: any): Listing {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    type: row.type as "lost" | "found",
    category: row.category,
    location: row.location,
    date: row.date,
    image: row.image,
    views: row.views,
    userId: row.user_id,
    created_at: row.created_at,
  };
}

let listings: Listing[] = [];
let listeners: (() => void)[] = [];
let loaded = false;

function notifyListeners() {
  listeners.forEach((l) => l());
}

async function loadFromDb() {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });
  if (!error && data) {
    listings = data.map(mapRow);
    loaded = true;
    notifyListeners();
  }
}

// Initial load
loadFromDb();

export const listingsStore = {
  getListings: (): Listing[] => listings,

  getListing: (id: string): Listing | undefined => {
    return listings.find((l) => l.id === id);
  },

  reload: loadFromDb,

  addListing: async (data: {
    title: string;
    description: string;
    category: string;
    location: string;
    date: string;
    type: "lost" | "found";
    images: string[];
    userId?: string;
  }): Promise<Listing | null> => {
    const row = {
      title: data.title,
      description: data.description,
      type: data.type,
      category: categoryMap[data.category] || data.category,
      location: data.location,
      date: data.date || new Date().toISOString().split("T")[0],
      image: data.images[0] || "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400&q=80",
      views: 0,
      user_id: data.userId!,
    };

    const { data: inserted, error } = await supabase
      .from("listings")
      .insert(row)
      .select()
      .single();

    if (error || !inserted) {
      console.error("Failed to insert listing", error);
      return null;
    }

    const newListing = mapRow(inserted);
    listings = [newListing, ...listings];
    notifyListeners();
    return newListing;
  },

  deleteListing: async (id: string): Promise<void> => {
    const { error } = await supabase.from("listings").delete().eq("id", id);
    if (!error) {
      listings = listings.filter((l) => l.id !== id);
      notifyListeners();
    }
  },

  incrementViews: async (id: string): Promise<void> => {
    const listing = listings.find((l) => l.id === id);
    if (!listing) return;
    const newViews = listing.views + 1;
    // Optimistic update
    listings = listings.map((l) => (l.id === id ? { ...l, views: newViews } : l));
    notifyListeners();
    await supabase.from("listings").update({ views: newViews }).eq("id", id);
  },

  subscribe: (listener: () => void): (() => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};

export function useListings(): Listing[] {
  const [, forceUpdate] = React.useState({});

  React.useEffect(() => {
    if (!loaded) loadFromDb();
    return listingsStore.subscribe(() => forceUpdate({}));
  }, []);

  return listingsStore.getListings();
}
