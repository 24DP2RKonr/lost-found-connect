import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl mb-4">
          Gatavs sākt?
        </h2>
        <p className="text-lg text-primary-foreground/85 max-w-xl mx-auto mb-8">
          Pievienojies tūkstošiem cilvēku, kas palīdz viens otram atrast pazaudētās mantas
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link to="/listings">
            <Button variant="accent" size="xl" className="w-full sm:w-auto gap-2">
              <Search className="h-5 w-5" />
              Meklēt sludinājumus
            </Button>
          </Link>
          <Link to="/create">
            <Button variant="hero-outline" size="xl" className="w-full sm:w-auto gap-2">
              <Plus className="h-5 w-5" />
              Publicēt sludinājumu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
