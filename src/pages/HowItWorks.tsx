import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Search, 
  PlusCircle, 
  MessageSquare, 
  CheckCircle, 
  Shield, 
  Users, 
  Clock,
  ArrowRight
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Meklē vai publicē",
    description: "Ja esi pazaudējis kaut ko, meklē mūsu datubāzē. Ja esi atradis - publicē sludinājumu, lai īpašnieks var to atrast.",
  },
  {
    icon: PlusCircle,
    title: "Izveido detalizētu sludinājumu",
    description: "Pievieno attēlus, aprakstu, atrašanās vietu un datumu. Jo vairāk informācijas, jo lielāka iespēja atrast īpašnieku vai priekšmetu.",
  },
  {
    icon: MessageSquare,
    title: "Sazinies droši",
    description: "Izmanto mūsu iekšējo ziņojumu sistēmu, lai sazinātos ar citiem lietotājiem, neizpaužot personīgo informāciju.",
  },
  {
    icon: CheckCircle,
    title: "Atdod vai saņem atpakaļ",
    description: "Vienojies par tikšanās vietu un laiku. Priecājies par laimīgu iznākumu!",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Droša platforma",
    description: "Mēs rūpējamies par tavu privātumu un drošību. Personīgā informācija netiek publiski rādīta.",
  },
  {
    icon: Users,
    title: "Aktīva kopiena",
    description: "Tūkstošiem cilvēku palīdz viens otram atrast pazaudētās mantas.",
  },
  {
    icon: Clock,
    title: "Ātra reakcija",
    description: "Jaunie sludinājumi parādās uzreiz, un tu saņemsi paziņojumus par jaunumiem.",
  },
];

const HowItWorks = () => {
  return (
    <Layout>
      <div className="bg-muted/30">
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4 lg:text-5xl">
              Kā tas strādā?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Atradums ir vienkārša platforma, kas palīdz cilvēkiem atrast pazaudētās mantas 
              un atdot atrastās lietas to īpašniekiem.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              4 vienkārši soļi
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative p-6 rounded-xl bg-background border border-border shadow-card"
                >
                  <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <div className="mt-4 mb-4">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Kāpēc izvēlēties mūs?
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border shadow-card text-center"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Gatavs sākt?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Pievienojies mūsu kopienai un palīdzi atrast pazaudētās lietas!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/listings">
                <Button variant="outline" size="lg" className="gap-2">
                  <Search className="h-5 w-5" />
                  Skatīt sludinājumus
                </Button>
              </Link>
              <Link to="/create">
                <Button size="lg" className="gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Publicēt sludinājumu
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HowItWorks;
