import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ListingCard from "@/components/listings/ListingCard";
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
import { Search, Grid, List } from "lucide-react";
import { useListings } from "@/stores/listingsStore";

const Listings = () => {
  const allListings = useListings();
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
