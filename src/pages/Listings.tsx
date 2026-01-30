import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ListingCard, { Listing } from "@/components/listings/ListingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, MapPin, Grid, List } from "lucide-react";

// Mock data
const allListings: Listing[] = [
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

const Listings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredListings = allListings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || listing.type === typeFilter;
    const matchesCategory =
      categoryFilter === "all" || listing.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const categories = [...new Set(allListings.map((l) => l.category))];

  return (
    <Layout>
      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Sludinājumi
            </h1>
            <p className="text-muted-foreground">
              Meklē pazaudušās mantas vai apskatiet, ko citi ir atraduši
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6 rounded-xl bg-card border border-border p-4 shadow-card">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Meklēt pēc atslēgvārdiem..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Type Filter */}
              <div className="flex gap-2">
                <Button
                  variant={typeFilter === "all" ? "default" : "secondary"}
                  onClick={() => setTypeFilter("all")}
                  size="sm"
                >
                  Visi
                </Button>
                <Button
                  variant={typeFilter === "lost" ? "lost" : "secondary"}
                  onClick={() => setTypeFilter("lost")}
                  size="sm"
                >
                  Pazudušas
                </Button>
                <Button
                  variant={typeFilter === "found" ? "found" : "secondary"}
                  onClick={() => setTypeFilter("found")}
                  size="sm"
                >
                  Atrastas
                </Button>
              </div>

              {/* Category */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="Kategorija" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Visas kategorijas</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex gap-1 border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Atrasti <span className="font-semibold text-foreground">{filteredListings.length}</span> sludinājumi
            </p>
            <div className="flex gap-2">
              {typeFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {typeFilter === "lost" ? "Pazudušas" : "Atrastas"}
                  <button
                    onClick={() => setTypeFilter("all")}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {categoryFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {categoryFilter}
                  <button
                    onClick={() => setCategoryFilter("all")}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          </div>

          {/* Listings Grid */}
          {filteredListings.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "flex flex-col gap-4"
              }
            >
              {filteredListings.map((listing, index) => (
                <div
                  key={listing.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Nav atrasts neviens sludinājums
              </h3>
              <p className="text-muted-foreground">
                Mēģini mainīt meklēšanas kritērijus
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Listings;
