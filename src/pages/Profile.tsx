import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  MapPin,
  Calendar,
  Star,
  FileText,
  MessageSquare,
  Settings,
  Edit,
} from "lucide-react";
import ListingCard, { Listing } from "@/components/listings/ListingCard";

// Mock user data
const userData = {
  name: "Jānis Bērziņš",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
  location: "Rīga, Latvija",
  joinDate: "2023-06",
  rating: 4.8,
  reviewCount: 24,
  listingsCount: 8,
  successfulReturns: 5,
};

const userListings: Listing[] = [
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
];

const reviews = [
  {
    id: "1",
    author: "Anna K.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
    text: "Ļoti atsaucīgs un godīgs cilvēks! Atdeva manu pazaudēto maku ar visiem dokumentiem.",
    date: "2024-01-15",
  },
  {
    id: "2",
    author: "Pēteris L.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
    text: "Ātri atbildēja uz ziņojumu un noorganizēja tikšanos ērtā vietā. Paldies!",
    date: "2024-01-10",
  },
  {
    id: "3",
    author: "Līga M.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    rating: 4,
    text: "Draudzīga saziņa, viss notika gludi.",
    date: "2023-12-28",
  },
];

const Profile = () => {
  return (
    <Layout>
      <div className="bg-muted/30 py-8 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <Card className="mb-8 overflow-hidden shadow-card">
            <div className="h-32 bg-gradient-hero" />
            <CardContent className="relative pt-0">
              <div className="flex flex-col items-center -mt-16 sm:flex-row sm:items-end sm:gap-6">
                <Avatar className="h-32 w-32 border-4 border-card shadow-lg">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback className="text-2xl">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="mt-4 flex-1 text-center sm:mt-0 sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">
                        {userData.name}
                      </h1>
                      <div className="mt-1 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground sm:justify-start">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {userData.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Kopš {userData.joinDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-center sm:justify-end">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit className="h-4 w-4" />
                        Rediģēt
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl bg-secondary/50 p-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-foreground">
                    <Star className="h-5 w-5 text-accent" />
                    {userData.rating}
                  </div>
                  <p className="text-sm text-muted-foreground">Vērtējums</p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {userData.reviewCount}
                  </p>
                  <p className="text-sm text-muted-foreground">Atsauksmes</p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {userData.listingsCount}
                  </p>
                  <p className="text-sm text-muted-foreground">Sludinājumi</p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-4 text-center">
                  <p className="text-2xl font-bold text-found">
                    {userData.successfulReturns}
                  </p>
                  <p className="text-sm text-muted-foreground">Atgrieztas mantas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="listings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
              <TabsTrigger value="listings" className="gap-2">
                <FileText className="h-4 w-4" />
                Mani sludinājumi
              </TabsTrigger>
              <TabsTrigger value="reviews" className="gap-2">
                <Star className="h-4 w-4" />
                Atsauksmes
              </TabsTrigger>
            </TabsList>

            {/* Listings Tab */}
            <TabsContent value="listings">
              {userListings.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {userListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Nav sludinājumu
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Tu vēl neesi publicējis nevienu sludinājumu
                    </p>
                    <Button variant="accent">Publicēt sludinājumu</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="shadow-card">
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={review.avatar} alt={review.author} />
                          <AvatarFallback>{review.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-foreground">
                              {review.author}
                            </h4>
                            <span className="text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <div className="flex gap-0.5 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-accent fill-accent"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.text}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
