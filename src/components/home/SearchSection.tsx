import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchSection = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (location) params.set("location", location);
    if (category) params.set("category", category);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative -mt-8 z-10 px-4">
      <div className="container mx-auto">
        <div className="mx-auto max-w-4xl rounded-2xl bg-card p-6 shadow-xl border border-border/50">
          <form onSubmit={handleSearch}>
            <div className="grid gap-4 md:grid-cols-4">
              {/* Keyword Search */}
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Ko meklējat? (piem., telefons, atslēgas...)"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="h-12 pl-10"
                />
              </div>

              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Vieta"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-12 pl-10"
                />
              </div>

              {/* Category */}
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Kategorija" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Elektronika</SelectItem>
                  <SelectItem value="documents">Dokumenti</SelectItem>
                  <SelectItem value="keys">Atslēgas</SelectItem>
                  <SelectItem value="wallet">Maks / Somas</SelectItem>
                  <SelectItem value="clothing">Apģērbs</SelectItem>
                  <SelectItem value="jewelry">Rotaslietas</SelectItem>
                  <SelectItem value="pets">Mājdzīvnieki</SelectItem>
                  <SelectItem value="other">Cits</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="secondary" size="sm" className="gap-1">
                  <Calendar className="h-4 w-4" />
                  Pēdējās 24h
                </Button>
                <Button type="button" variant="secondary" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Pazudušas
                </Button>
                <Button type="button" variant="secondary" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Atrastas
                </Button>
              </div>
              <Button type="submit" className="gap-2" size="lg">
                <Search className="h-4 w-4" />
                Meklēt
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
