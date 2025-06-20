
"use client";

import { CONTACT_DETAILS, OPENING_HOURS } from '@/lib/constants';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-accent/50 dark:bg-accent/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="font-body text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            We&apos;re here to answer any questions you may have. Reach out to us and we&apos;ll respond as soon as we can.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details & Opening Hours Card */}
          <Card className="lg:col-span-1 rounded-xl shadow-lg bg-card">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary flex items-center">
                <MapPin className="h-6 w-6 mr-2" /> Visit Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 font-body text-card-foreground/80">
              <p>{CONTACT_DETAILS.addressLine1}</p>
              <p>{CONTACT_DETAILS.addressLine2}</p>
              <div className="flex items-center mt-2">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                  {CONTACT_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <a href={`mailto:${CONTACT_DETAILS.email}`} className="hover:text-primary transition-colors">
                  {CONTACT_DETAILS.email}
                </a>
              </div>

              <div className="pt-4 mt-4 border-t border-border">
                <h3 className="font-headline text-xl text-primary flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2" /> Opening Hours
                </h3>
                <ul className="space-y-1 text-sm">
                  {OPENING_HOURS.map(item => (
                    <li key={item.day} className="flex justify-between">
                      <span>{item.day}</span>
                      <span>{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild size="lg" className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">
                <Link href="#book">Book Appointment</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Map Card */}
          <Card className="lg:col-span-2 rounded-xl shadow-lg overflow-hidden bg-card p-2 md:p-4">
            <div className="aspect-w-16 aspect-h-9 md:aspect-h-10 lg:aspect-h-[6.5]"> {/* Adjusted aspect ratio for better height */}
              <iframe
                src={CONTACT_DETAILS.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Salon B Curls Location Map"
              ></iframe>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
