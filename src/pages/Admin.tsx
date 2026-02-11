import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useListings, listingsStore } from "@/stores/listingsStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useToast } from "@/hooks/use-toast";
import { Listing } from "@/components/listings/ListingCard";
import {
  Shield,
  FileText,
  Users,
  Trash2,
  Edit,
  Search,
} from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  name: string;
  phone: string | null;
  location: string | null;
  avatar_url: string | null;
  created_at: string;
}

const Admin = () => {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const allListings = useListings();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Edit listing
  const [editListing, setEditListing] = useState<Listing | null>(null);
  const [editListingForm, setEditListingForm] = useState({ title: "", description: "", location: "" });

  // Edit profile
  const [editProfile, setEditProfile] = useState<Profile | null>(null);
  const [editProfileForm, setEditProfileForm] = useState({ name: "", phone: "", location: "" });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
    if (!adminLoading && !isAdmin && !authLoading) {
      navigate("/");
    }
  }, [authLoading, adminLoading, user, isAdmin, navigate]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (data) setProfiles(data);
    };
    if (isAdmin) fetchProfiles();
  }, [isAdmin]);

  if (authLoading || adminLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Ielādē...</p>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) return null;

  // Listing actions
  const openEditListing = (listing: Listing) => {
    setEditListing(listing);
    setEditListingForm({ title: listing.title, description: listing.description, location: listing.location });
  };

  const saveEditListing = () => {
    if (!editListing) return;
    // Update in local store (mock data)
    const listings = listingsStore.getListings();
    const idx = listings.findIndex((l) => l.id === editListing.id);
    if (idx !== -1) {
      listings[idx] = { ...listings[idx], ...editListingForm };
      localStorage.setItem("atradi_listings", JSON.stringify(listings));
      window.location.reload(); // force refresh store
    }
    setEditListing(null);
    toast({ title: "Sludinājums atjaunināts!" });
  };

  const deleteListing = (id: string) => {
    listingsStore.deleteListing(id);
    toast({ title: "Sludinājums dzēsts!" });
  };

  // Profile actions
  const openEditProfile = (profile: Profile) => {
    setEditProfile(profile);
    setEditProfileForm({ name: profile.name, phone: profile.phone || "", location: profile.location || "" });
  };

  const saveEditProfile = async () => {
    if (!editProfile) return;
    const { error } = await supabase
      .from("profiles")
      .update({ name: editProfileForm.name, phone: editProfileForm.phone, location: editProfileForm.location })
      .eq("id", editProfile.id);
    if (error) {
      toast({ title: "Kļūda", description: error.message, variant: "destructive" });
    } else {
      setProfiles(profiles.map((p) => (p.id === editProfile.id ? { ...p, ...editProfileForm } : p)));
      setEditProfile(null);
      toast({ title: "Profils atjaunināts!" });
    }
  };

  const deleteProfile = async (id: string) => {
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) {
      toast({ title: "Kļūda", description: error.message, variant: "destructive" });
    } else {
      setProfiles(profiles.filter((p) => p.id !== id));
      toast({ title: "Profils dzēsts!" });
    }
  };

  const filteredListings = allListings.filter(
    (l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProfiles = profiles.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.location || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* Edit Listing Dialog */}
      <Dialog open={!!editListing} onOpenChange={() => setEditListing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rediģēt sludinājumu</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Nosaukums</Label>
              <Input value={editListingForm.title} onChange={(e) => setEditListingForm({ ...editListingForm, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Apraksts</Label>
              <Input value={editListingForm.description} onChange={(e) => setEditListingForm({ ...editListingForm, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Atrašanās vieta</Label>
              <Input value={editListingForm.location} onChange={(e) => setEditListingForm({ ...editListingForm, location: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditListing(null)}>Atcelt</Button>
            <Button onClick={saveEditListing}>Saglabāt</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={!!editProfile} onOpenChange={() => setEditProfile(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rediģēt profilu</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Vārds</Label>
              <Input value={editProfileForm.name} onChange={(e) => setEditProfileForm({ ...editProfileForm, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Tālrunis</Label>
              <Input value={editProfileForm.phone} onChange={(e) => setEditProfileForm({ ...editProfileForm, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Atrašanās vieta</Label>
              <Input value={editProfileForm.location} onChange={(e) => setEditProfileForm({ ...editProfileForm, location: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditProfile(null)}>Atcelt</Button>
            <Button onClick={saveEditProfile}>Saglabāt</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-muted/30 py-8 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-md">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin panelis</h1>
              <p className="text-sm text-muted-foreground">Pārvaldiet sludinājumus un lietotājus</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{allListings.length}</p>
                  <p className="text-sm text-muted-foreground">Sludinājumi</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{profiles.length}</p>
                  <p className="text-sm text-muted-foreground">Lietotāji</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Meklēt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="listings">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid mb-6">
              <TabsTrigger value="listings" className="gap-2">
                <FileText className="h-4 w-4" />Sludinājumi ({filteredListings.length})
              </TabsTrigger>
              <TabsTrigger value="profiles" className="gap-2">
                <Users className="h-4 w-4" />Lietotāji ({filteredProfiles.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="listings">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nosaukums</TableHead>
                        <TableHead className="hidden sm:table-cell">Tips</TableHead>
                        <TableHead className="hidden md:table-cell">Kategorija</TableHead>
                        <TableHead className="hidden md:table-cell">Vieta</TableHead>
                        <TableHead className="text-right">Darbības</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredListings.map((listing) => (
                        <TableRow key={listing.id}>
                          <TableCell className="font-medium max-w-[200px] truncate">{listing.title}</TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge variant={listing.type === "lost" ? "destructive" : "default"}>
                              {listing.type === "lost" ? "Pazudusi" : "Atrasta"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{listing.category}</TableCell>
                          <TableCell className="hidden md:table-cell">{listing.location}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" onClick={() => openEditListing(listing)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Dzēst sludinājumu?</AlertDialogTitle>
                                    <AlertDialogDescription>Šī darbība ir neatgriezeniska.</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Atcelt</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteListing(listing.id)} className="bg-destructive text-destructive-foreground">
                                      Dzēst
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredListings.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            Nav sludinājumu
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profiles">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vārds</TableHead>
                        <TableHead className="hidden sm:table-cell">Tālrunis</TableHead>
                        <TableHead className="hidden md:table-cell">Vieta</TableHead>
                        <TableHead className="hidden md:table-cell">Reģistrēts</TableHead>
                        <TableHead className="text-right">Darbības</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProfiles.map((profile) => (
                        <TableRow key={profile.id}>
                          <TableCell className="font-medium">{profile.name || "—"}</TableCell>
                          <TableCell className="hidden sm:table-cell">{profile.phone || "—"}</TableCell>
                          <TableCell className="hidden md:table-cell">{profile.location || "—"}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(profile.created_at).toLocaleDateString("lv-LV")}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" onClick={() => openEditProfile(profile)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Dzēst profilu?</AlertDialogTitle>
                                    <AlertDialogDescription>Šī darbība ir neatgriezeniska.</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Atcelt</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteProfile(profile.id)} className="bg-destructive text-destructive-foreground">
                                      Dzēst
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredProfiles.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            Nav lietotāju
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
