import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useListings } from "@/stores/listingsStore";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  MapPin,
  Calendar,
  Star,
  FileText,
  Settings,
  Edit,
  Bell,
  Eye,
  LogOut,
} from "lucide-react";
import ListingCard, { Listing } from "@/components/listings/ListingCard";



const reviews = [
  {
    id: "1",
    author: "Anna K.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
    text: "Ļoti atsaucīgs un godīgs cilvēks!",
    date: "2024-01-15",
  },
];

const Profile = () => {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const allListings = useListings();
  const userListings = allListings.filter((l) => l.userId === user?.id);

  const [profile, setProfile] = useState({ name: "", phone: "", location: "", avatar_url: "" });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", phone: "", location: "" });
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    showEmail: false,
    showPhone: true,
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (data) {
        setProfile(data);
        setEditForm({ name: data.name, phone: data.phone || "", location: data.location || "" });
      }
    };
    fetchProfile();
  }, [user, navigate]);

  const handleEditSave = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ name: editForm.name, phone: editForm.phone, location: editForm.location })
      .eq("user_id", user.id);
    if (error) {
      toast({ title: "Kļūda", description: error.message, variant: "destructive" });
    } else {
      setProfile({ ...profile, ...editForm });
      setIsEditOpen(false);
      toast({ title: "Profils atjaunināts!", description: "Izmaiņas saglabātas." });
    }
  };

  const handleSettingsSave = () => {
    setIsSettingsOpen(false);
    toast({ title: "Iestatījumi saglabāti!" });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!user) return null;

  const joinDate = user.created_at ? new Date(user.created_at).toLocaleDateString("lv-LV", { year: "numeric", month: "long" }) : "";

  return (
    <Layout>
      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rediģēt profilu</DialogTitle>
            <DialogDescription>Atjauniniet savu profila informāciju</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Vārds</Label>
              <Input id="name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Tālrunis</Label>
              <Input id="phone" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Atrašanās vieta</Label>
              <Input id="location" value={editForm.location} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Atcelt</Button>
            <Button onClick={handleEditSave}>Saglabāt</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Iestatījumi</DialogTitle>
            <DialogDescription>Pārvaldiet savus konta iestatījumus</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 font-medium text-foreground"><Bell className="h-4 w-4" />Paziņojumi</h4>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notif" className="font-normal">E-pasta paziņojumi</Label>
                <Switch id="email-notif" checked={settings.emailNotifications} onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notif" className="font-normal">Push paziņojumi</Label>
                <Switch id="push-notif" checked={settings.pushNotifications} onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })} />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 font-medium text-foreground"><Eye className="h-4 w-4" />Privātums</h4>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-email" className="font-normal">Rādīt e-pastu profilā</Label>
                <Switch id="show-email" checked={settings.showEmail} onCheckedChange={(checked) => setSettings({ ...settings, showEmail: checked })} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-phone" className="font-normal">Rādīt tālruni profilā</Label>
                <Switch id="show-phone" checked={settings.showPhone} onCheckedChange={(checked) => setSettings({ ...settings, showPhone: checked })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>Atcelt</Button>
            <Button onClick={handleSettingsSave}>Saglabāt</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-muted/30 py-8 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <Card className="mb-8 overflow-hidden shadow-card">
            <div className="h-32 bg-gradient-hero" />
            <CardContent className="relative pt-0">
              <div className="flex flex-col items-center -mt-16 sm:flex-row sm:items-end sm:gap-6">
                <Avatar className="h-32 w-32 border-4 border-card shadow-lg">
                  <AvatarImage src={profile.avatar_url} alt={profile.name} />
                  <AvatarFallback className="text-2xl">
                    {profile.name ? profile.name.split(" ").map((n) => n[0]).join("") : "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4 flex-1 text-center sm:mt-0 sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">{profile.name || "Lietotājs"}</h1>
                      <div className="mt-1 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground sm:justify-start">
                        {profile.location && (
                          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{profile.location}</span>
                        )}
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Kopš {joinDate}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                    </div>
                    <div className="flex gap-2 justify-center sm:justify-end">
                      <Button variant="outline" size="sm" className="gap-1" onClick={() => setIsEditOpen(true)}>
                        <Edit className="h-4 w-4" />Rediģēt
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => setIsSettingsOpen(true)}>
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1 text-destructive" onClick={handleSignOut}>
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="listings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
              <TabsTrigger value="listings" className="gap-2"><FileText className="h-4 w-4" />Mani sludinājumi</TabsTrigger>
              <TabsTrigger value="reviews" className="gap-2"><Star className="h-4 w-4" />Atsauksmes</TabsTrigger>
            </TabsList>

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
                    <h3 className="text-lg font-semibold text-foreground mb-2">Nav sludinājumu</h3>
                    <p className="text-muted-foreground mb-4">Tu vēl neesi publicējis nevienu sludinājumu</p>
                    <Button variant="accent">Publicēt sludinājumu</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

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
                            <h4 className="font-semibold text-foreground">{review.author}</h4>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex gap-0.5 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? "text-accent fill-accent" : "text-muted"}`} />
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
