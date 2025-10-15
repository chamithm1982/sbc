
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { NAV_LINKS, CONTACT_DETAILS, SOCIAL_LINKS, OPENING_HOURS } from '@/lib/constants';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const quickLinks = NAV_LINKS.filter(link => !link.isButton);

  return (
    <footer className="bg-secondary text-secondary-foreground pt-12 pb-8 font-body">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo and About */}
          <div>
            <Link href="/" className="flex items-center space-x-2 text-2xl font-headline font-bold text-primary hover:text-primary/80 transition-colors mb-4">
              <Image src="/SBClogoclearbg.png" alt="Salon B Curls Logo" width={28} height={28} />
              <span>Salon B Curls</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Your personal sanctuary for beauty and well-being in Dandenong. We are dedicated to creating an unparalleled guest experience.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-headline font-semibold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-headline font-semibold text-primary mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 shrink-0 text-primary" />
                <span>{CONTACT_DETAILS.addressLine1},<br />{CONTACT_DETAILS.addressLine2}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 shrink-0 text-primary" />
                <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">{CONTACT_DETAILS.phone}</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 shrink-0 text-primary" />
                <a href={`mailto:${CONTACT_DETAILS.email}`} className="hover:text-primary transition-colors">{CONTACT_DETAILS.email}</a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Opening Hours & Social */}
          <div>
            <h3 className="text-lg font-headline font-semibold text-primary mb-4">Opening Hours</h3>
            <ul className="space-y-1 text-sm mb-4">
              {OPENING_HOURS.map(item => (
                <li key={item.day} className="flex justify-between">
                  <span>{item.day}</span>
                  <span>{item.hours}</span>
                </li>
              ))}
            </ul>
             <h3 className="text-lg font-headline font-semibold text-primary mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-secondary-foreground hover:text-primary transition-colors"
                >
                  {social.icon === 'facebook' && <Facebook className="h-6 w-6" />}
                  {social.icon === 'instagram' && <Instagram className="h-6 w-6" />}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <Separator className="bg-primary/20 my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Salon B Curls. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
