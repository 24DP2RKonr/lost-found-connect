import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ListingCard, { Listing } from "@/components/listings/ListingCard";

// Mock data
const recentListings: Listing[] = [
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
];

const RecentListingsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-2">
              Jaunākie sludinājumi
            </h2>
            <p className="text-muted-foreground">
              Pārskati pēdējos publicētos sludinājumus
            </p>
          </div>
          <Link to="/listings">
            <Button variant="outline" className="gap-2">
              Skatīt visus
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recentListings.map((listing, index) => (
            <div
              key={listing.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentListingsSection;
