import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User, MessageSquare, Plus, LogIn, Shield } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { isAdmin } = useAdmin();

  const navLinks = [
    { path: "/listings", label: "Sludinājumi" },
    { path: "/create", label: "Publicēt" },
    { path: "/how-it-works", label: "Kā tas strādā" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero shadow-md transition-transform group-hover:scale-105">
            <Search className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden text-xl font-bold text-foreground sm:block">Atradums</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button variant={isActive(link.path) ? "secondary" : "ghost"} className={isActive(link.path) ? "font-semibold" : ""}>
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="ghost" size="icon" title="Admin panelis">
                    <Shield className="h-5 w-5" />
                  </Button>
                </Link>
              )}
              <Link to="/messages">
                <Button variant="ghost" size="icon" className="relative">
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">3</span>
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
              </Link>
              <Link to="/create">
                <Button variant="accent" className="gap-2"><Plus className="h-4 w-4" />Publicēt</Button>
              </Link>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="accent" className="gap-2"><LogIn className="h-4 w-4" />Ielogoties</Button>
            </Link>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 right-0 border-b border-border bg-card p-4 shadow-lg md:hidden animate-fade-in">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)}>
                <Button variant={isActive(link.path) ? "secondary" : "ghost"} className="w-full justify-start">{link.label}</Button>
              </Link>
            ))}
            <div className="my-2 border-t border-border" />
            {user ? (
              <>
                <Link to="/messages" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <MessageSquare className="h-4 w-4" />Ziņojumi
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">3</span>
                  </Button>
                </Link>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2"><User className="h-4 w-4" />Profils</Button>
                </Link>
                <Link to="/create" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="accent" className="w-full gap-2"><Plus className="h-4 w-4" />Publicēt sludinājumu</Button>
                </Link>
              </>
            ) : (
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                <Button variant="accent" className="w-full gap-2"><LogIn className="h-4 w-4" />Ielogoties</Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
