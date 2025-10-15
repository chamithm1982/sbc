
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { NAV_LINKS } from '@/lib/constants';
import { DarkModeToggle } from '@/components/dark-mode-toggle';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      "bg-background/95 backdrop-blur-sm shadow-xl rounded-full",
      "mt-3 sm:mt-4 md:mt-5 lg:mt-6",
      "mx-auto w-11/12 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl" // Adjusted max-width
    )}>
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 text-xl sm:text-2xl font-headline font-bold text-primary hover:text-primary/80 transition-colors">
            <Image src="/SBClogoclearbg.png" alt="Salon B Curls Logo" width={28} height={28} className="h-6 w-6 sm:h-7 sm:w-7" />
            <span>Salon B Curls</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1.5 lg:space-x-1.5"> {/* Adjusted spacing */}
            {NAV_LINKS.map((link) =>
              link.isButton ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    buttonVariants({ size: 'sm' }), // Changed to size: 'sm'
                    "font-body rounded-lg shadow-md hover:shadow-lg transition-shadow" // Kept custom rounded-lg and shadow
                  )}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-2 py-1.5 rounded-md font-medium font-body hover:text-primary transition-colors text-sm", // Changed to text-sm, px-2
                    (pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href) && link.href.length > 1)) ? "text-primary font-semibold" : "text-foreground/80"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
            <DarkModeToggle /> {/* Integrated into the spaced items */}
          </nav>

          <div className="md:hidden flex items-center">
            <DarkModeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle mobile menu" className="ml-2 w-8 h-8 sm:w-9 sm:w-9">
              {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={cn(
          "md:hidden absolute top-full left-0 w-full",
          "mt-2 bg-background shadow-xl rounded-2xl border border-border"
        )}>
          <nav className="flex flex-col space-y-1 p-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-lg font-medium font-body transition-colors text-sm", // Changed to text-sm
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
