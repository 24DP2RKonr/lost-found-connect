import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, MessageSquare, Eye } from "lucide-react";

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
}

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <div className="group overflow-hidden rounded-xl bg-card border border-border shadow-card card-hover h-full flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted flex-shrink-0">
        <img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Status Badge */}
        <Badge
          className={`absolute left-3 top-3 ${
            listing.type === "lost"
              ? "bg-lost text-lost-foreground"
              : "bg-found text-found-foreground"
          }`}
        >
          {listing.type === "lost" ? "Pazudusi" : "Atrasta"}
        </Badge>
        {/* Views */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-foreground/70 px-2 py-1 text-xs text-background backdrop-blur-sm">
          <Eye className="h-3 w-3" />
          {listing.views}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {listing.category}
          </Badge>
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors min-h-[3.5rem]">
          <Link to={`/listing/${listing.id}`}>{listing.title}</Link>
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground min-h-[2.5rem]">
          {listing.description}
        </p>

        {/* Meta Info */}
        <div className="mb-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {listing.location}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {listing.date}
          </div>
        </div>

        {/* Action - pushed to bottom */}
        <div className="mt-auto">
          <Link to={`/listing/${listing.id}`}>
            <Button variant="outline" className="w-full gap-2">
              <MessageSquare className="h-4 w-4" />
              Sazināties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
