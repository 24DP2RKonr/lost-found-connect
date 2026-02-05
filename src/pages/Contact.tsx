import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ziņojums nosūtīts!",
      description: "Mēs ar jums sazināsimies tuvākajā laikā.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Sazināties ar mums
            </h1>
            <p className="mt-2 text-muted-foreground">
              Mēs esam šeit, lai palīdzētu! Sazinieties ar mums jebkurā jautājumā.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-foreground">
                Nosūtiet mums ziņojumu
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Vārds</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Jūsu vārds"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-pasts</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="jusu@epasts.lv"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Tēma</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Par ko vēlaties sazināties?"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Ziņojums</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Jūsu ziņojums..."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Nosūtīt ziņojumu
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-foreground">
                  Kontaktinformācija
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">E-pasts</p>
                      <p className="text-muted-foreground">info@atradums.lv</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Tālrunis</p>
                      <p className="text-muted-foreground">+371 20 123 456</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Adrese</p>
                      <p className="text-muted-foreground">
                        Brīvības iela 1, Rīga, LV-1010
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  Darba laiks
                </h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>Pirmdiena - Piektdiena: 9:00 - 18:00</p>
                  <p>Sestdiena: 10:00 - 14:00</p>
                  <p>Svētdiena: Slēgts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
