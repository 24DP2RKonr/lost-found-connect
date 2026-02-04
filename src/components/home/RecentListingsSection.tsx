import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ListingCard from "@/components/listings/ListingCard";
import { useListings } from "@/stores/listingsStore";

const RecentListingsSection = () => {
  const allListings = useListings();
  const recentListings = allListings.slice(0, 4);

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
