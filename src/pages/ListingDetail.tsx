import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  MapPin,
  Calendar,
  Eye,
  MessageSquare,
  ArrowLeft,
  Share2,
  Trash2,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { listingsStore, useListings } from "@/stores/listingsStore";
import { messagesStore } from "@/stores/messagesStore";
import { Listing } from "@/components/listings/ListingCard";

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const allListings = useListings();
  const [listing, setListing] = useState<Listing | undefined>();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      const found = listingsStore.getListing(id);
      setListing(found);
      if (found) {
        listingsStore.incrementViews(id);
      }
    }
  }, [id, allListings]);

  const handleDelete = () => {
    if (id) {
      listingsStore.deleteListing(id);
      toast.success("Sludinājums izdzēsts!");
      navigate("/listings");
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || !listing || !id) {
      toast.error("Lūdzu uzraksti ziņojumu");
      return;
    }
    
    messagesStore.startConversation({
      listingId: id,
      listingTitle: listing.title,
      messageText: message.trim(),
    });
    
    toast.success("Ziņojums nosūtīts! Atver 'Ziņojumi' lai redzētu sarunu.");
    setMessage("");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Saite nokopēta!");
  };

  if (!listing) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Sludinājums nav atrasts
          </h1>
          <p className="text-muted-foreground mb-6">
            Šis sludinājums vairs nepastāv vai ir izdzēsts.
          </p>
          <Link to="/listings">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Atpakaļ uz sludinājumiem
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            to="/listings"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Atpakaļ uz sludinājumiem
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <Card className="overflow-hidden shadow-card">
                <div className="relative aspect-video bg-muted">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-full w-full object-cover"
                  />
                  <Badge
                    className={`absolute left-4 top-4 ${
                      listing.type === "lost"
                        ? "bg-lost text-lost-foreground"
                        : "bg-found text-found-foreground"
                    }`}
                  >
                    {listing.type === "lost" ? "Pazudusi" : "Atrasta"}
                  </Badge>
                </div>
              </Card>

              {/* Details */}
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {listing.category}
                      </Badge>
                      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                        {listing.title}
                      </h1>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      {listing.views} skatījumi
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {listing.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {listing.date}
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h2 className="text-lg font-semibold text-foreground mb-3">
                      Apraksts
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {listing.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Sazināties
                  </h3>
                  <Textarea
                    placeholder="Uzraksti ziņojumu..."
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mb-4"
                  />
                  <Button
                    onClick={handleSendMessage}
                    variant={listing.type === "lost" ? "lost" : "found"}
                    className="w-full gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Nosūtīt ziņojumu
                  </Button>
                </CardContent>
              </Card>

              {/* Actions Card */}
              <Card className="shadow-card">
                <CardContent className="p-6 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                    Kopīgot
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                        Dzēst sludinājumu
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Vai tiešām vēlies dzēst?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Šī darbība ir neatgriezeniska. Sludinājums tiks
                          neatgriezeniski izdzēsts.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Atcelt</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Dzēst
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListingDetail;
