import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, MapPin, HandHeart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur-sm animate-fade-in">
            <HandHeart className="h-4 w-4" />
            <span>Kopiena, kas palīdz cits citam</span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Palīdzēsim atrast
            <br />
            <span className="relative inline-block">
              pazaudēto
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C50 3 150 3 198 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-50" />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="mb-10 text-lg text-primary-foreground/85 sm:text-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Droša un uzticama platforma, kur cilvēki palīdz viens otram atrast 
            pazaudētas mantas. Publicē sludinājumu vai meklē, ko citi ir atraduši.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/create?type=lost">
              <Button variant="accent" size="xl" className="w-full sm:w-auto gap-2">
                <Search className="h-5 w-5" />
                Pazaudēju mantu
              </Button>
            </Link>
            <Link to="/create?type=found">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto gap-2">
                <MapPin className="h-5 w-5" />
                Atradu mantu
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-foreground sm:text-4xl">2,500+</p>
              <p className="mt-1 text-sm text-primary-foreground/70">Atrastas mantas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-foreground sm:text-4xl">15,000+</p>
              <p className="mt-1 text-sm text-primary-foreground/70">Lietotāji</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-foreground sm:text-4xl">95%</p>
              <p className="mt-1 text-sm text-primary-foreground/70">Pozitīvas atsauksmes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
