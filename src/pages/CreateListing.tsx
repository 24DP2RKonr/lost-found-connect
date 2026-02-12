import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Upload, Calendar, Tag, FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { listingsStore } from "@/stores/listingsStore";

const CreateListing = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const initialType = searchParams.get("type") as "lost" | "found" | null;

  const [listingType, setListingType] = useState<"lost" | "found">(initialType || "lost");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    contact: "",
  });
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.category || !formData.location) {
      toast.error("Lūdzu aizpildiet visus obligātos laukus");
      return;
    }

    // Add listing to store
    listingsStore.addListing({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      date: formData.date,
      type: listingType,
      images: images,
      userId: user?.id,
    });

    toast.success("Sludinājums veiksmīgi publicēts!");
    navigate("/listings");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImages].slice(0, 5));
    }
  };

  return (
    <Layout>
      <div className="bg-muted/30 py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Publicēt sludinājumu
              </h1>
              <p className="text-muted-foreground">
                Aizpildi informāciju par pazaudēto vai atrasto mantu
              </p>
            </div>

            {/* Type Selection */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setListingType("lost")}
                className={`rounded-xl border-2 p-6 text-center transition-all ${
                  listingType === "lost"
                    ? "border-lost bg-lost/5 shadow-md"
                    : "border-border hover:border-lost/50"
                }`}
              >
                <div
                  className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${
                    listingType === "lost" ? "bg-lost text-lost-foreground" : "bg-muted"
                  }`}
                >
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground">Pazaudēju mantu</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Es meklēju savu pazaudēto lietu
                </p>
              </button>

              <button
                type="button"
                onClick={() => setListingType("found")}
                className={`rounded-xl border-2 p-6 text-center transition-all ${
                  listingType === "found"
                    ? "border-found bg-found/5 shadow-md"
                    : "border-border hover:border-found/50"
                }`}
              >
                <div
                  className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${
                    listingType === "found" ? "bg-found text-found-foreground" : "bg-muted"
                  }`}
                >
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground">Atradu mantu</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Es atradu svešu lietu
                </p>
              </button>
            </div>

            {/* Form */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Sludinājuma informācija
                </CardTitle>
                <CardDescription>
                  Jo detalizētāk aprakstīsi mantu, jo lielāka iespēja to atrast
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Nosaukums <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="Piem., Melns iPhone ar sarkanu maciņu"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, title: e.target.value }))
                      }
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Apraksts <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Detalizēts apraksts - krāsa, izmērs, īpašas pazīmes, kas varētu palīdzēt identificēt lietu..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, description: e.target.value }))
                      }
                    />
                  </div>

                  {/* Category & Location Row */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>
                        Kategorija <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Izvēlies kategoriju" />
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

                    <div className="space-y-2">
                      <Label htmlFor="location">
                        Vieta <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="Piem., Rīga, Vecrīga"
                          className="pl-9"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, location: e.target.value }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <Label htmlFor="date">
                      {listingType === "lost" ? "Pazušanas datums" : "Atrašanas datums"}
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        className="pl-9"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, date: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  {/* Images */}
                  <div className="space-y-2">
                    <Label>Fotogrāfijas</Label>
                    <div className="rounded-xl border-2 border-dashed border-border p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium text-foreground">
                          Noklikšķini, lai augšupielādētu
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG līdz 5MB (maks. 5 attēli)
                        </p>
                      </label>
                    </div>
                    {images.length > 0 && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {images.map((img, i) => (
                          <div key={i} className="relative h-20 w-20 rounded-lg overflow-hidden border border-border">
                            <img src={img} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                              className="absolute top-1 right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant={listingType === "lost" ? "lost" : "found"}
                    size="lg"
                    className="w-full gap-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    Publicēt sludinājumu
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateListing;
