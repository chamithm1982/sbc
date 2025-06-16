import { MapPin, ParkingCircle, Route } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CONTACT_DETAILS, OPENING_HOURS } from '@/lib/constants';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Visit Salon B Curls | Location & Directions - Dandenong, VIC',
  description: 'Find Salon B Curls at 123 Curl Street, Dandenong. Get directions, parking information, and see our opening hours. Your journey to radiance starts here!',
};

export default function LocationPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            Visit Salon B Curls in Dandenong
          </h1>
          <p className="font-body text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            We are conveniently located in the heart of Dandenong, Victoria. Find us easily and plan your visit for an exceptional salon experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <Card className="lg:col-span-2 rounded-xl shadow-lg overflow-hidden bg-card p-2 md:p-4">
            <div className="aspect-w-16 aspect-h-9 md:aspect-h-10 lg:aspect-h-[6.5]">
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

          <div className="space-y-8">
            <Card className="rounded-xl shadow-lg bg-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary flex items-center">
                  <MapPin className="h-6 w-6 mr-3" /> Our Address
                </CardTitle>
              </CardHeader>
              <CardContent className="font-body text-card-foreground/90 space-y-1">
                <p>{CONTACT_DETAILS.addressLine1}</p>
                <p>{CONTACT_DETAILS.addressLine2}</p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_DETAILS.addressLine1 + ", " + CONTACT_DETAILS.addressLine2)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline mt-2 font-medium"
                >
                  Get Directions <Route className="h-4 w-4 ml-1.5" />
                </a>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-lg bg-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary flex items-center">
                  <ParkingCircle className="h-6 w-6 mr-3" /> Parking Information
                </CardTitle>
              </CardHeader>
              <CardContent className="font-body text-card-foreground/90 space-y-2">
                <p>Ample on-street parking is available along Curl Street and surrounding areas.</p>
                <p>There are also several public parking lots within a short walking distance from the salon.</p>
                <p className="text-sm text-muted-foreground">Please check local signage for time limits and any applicable fees.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12 md:my-16 bg-border" />

        <div className="text-center">
            <h3 className="font-headline text-3xl text-primary mb-6">Nearby Landmarks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-body text-foreground/80">
                <p>Dandenong Plaza (5 min walk)</p>
                <p>Dandenong Market (10 min walk)</p>
                <p>Local cafes and shops on Lonsdale Street</p>
            </div>
        </div>
        
        <Separator className="my-12 md:my-16 bg-border" />

        <Card className="rounded-xl shadow-lg bg-card max-w-lg mx-auto">
            <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary text-center">
                    Opening Hours
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-base font-body text-card-foreground/90">
                {OPENING_HOURS.map(item => (
                    <li key={item.day} className="flex justify-between">
                    <span>{item.day}</span>
                    <span className="font-medium">{item.hours}</span>
                    </li>
                ))}
                </ul>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
