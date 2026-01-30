import { Link } from "react-router-dom";
import { Search, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero shadow-md">
                <Search className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Atradums</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Droša un uzticama platforma pazudušu mantu meklēšanai un atrasto mantu publicēšanai.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Ātrās saites</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/listings" className="hover:text-primary transition-colors">
                Sludinājumi
              </Link>
              <Link to="/create" className="hover:text-primary transition-colors">
                Publicēt sludinājumu
              </Link>
              <Link to="/how-it-works" className="hover:text-primary transition-colors">
                Kā tas strādā
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Atbalsts</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/faq" className="hover:text-primary transition-colors">
                Bieži uzdotie jautājumi
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Sazināties ar mums
              </Link>
              <Link to="/safety" className="hover:text-primary transition-colors">
                Drošības padomi
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Juridiskā informācija</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privātuma politika
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Lietošanas noteikumi
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 Atradums. Visas tiesības aizsargātas.
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Veidots ar <Heart className="h-4 w-4 text-lost" /> Latvijā
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
