"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/lib/constants';
import { DarkModeToggle } from '@/components/dark-mode-toggle';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on pathname change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-headline font-bold text-primary hover:text-primary/80 transition-colors">
            <Waves className="h-7 w-7" />
            <span>Salon B Curls</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_LINKS.map((link) =>
              link.isButton ? (
                <Button key={link.label} asChild size="lg" className="font-body text-base rounded-lg shadow-md hover:shadow-lg transition-shadow ml-2">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-md font-medium font-body hover:text-primary transition-colors text-lg",
                    (pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href) && link.href.length > 1)) ? "text-primary font-semibold" : "text-foreground/80"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="ml-2">
              <DarkModeToggle />
            </div>
          </nav>

          <div className="md:hidden flex items-center">
            <DarkModeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle mobile menu" className="ml-2">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background shadow-lg rounded-b-xl border-t border-border">
          <nav className="flex flex-col space-y-2 p-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-lg font-medium font-body transition-colors",
                   link.isButton ? "bg-primary text-primary-foreground text-center hover:bg-primary/90" : "hover:bg-accent hover:text-accent-foreground",
                  (pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href) && link.href.length > 1)) && !link.isButton ? "bg-accent text-accent-foreground font-semibold" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
