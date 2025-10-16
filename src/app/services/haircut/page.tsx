
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Precision Haircuts & Styling | Salon B Curls',
  description: 'Discover bespoke haircuts and styling at Salon B Curls. Our experts craft personalized looks that enhance your features and suit your lifestyle, from chic bobs to elegant updos.',
};

const haircutService = {
  name: 'Precision Haircuts & Styling',
  breadcrumb: 'Services > Haircuts & Styling',
  heroImage: '/service1.png',
  dataAiHint: 'hair styling salon',
  mainDescription: "At Salon B Curls, a haircut is more than just a trim—it's a personalized art form. Our philosophy centers on creating a look that not only complements your features and hair type, but also seamlessly integrates with your lifestyle. We believe a great haircut is the foundation of confidence, empowering you to look and feel your best every single day.",
  price: 'From $80',
  features: [
    {
      title: 'Personalized Consultation',
      description: 'Every appointment begins with a thorough consultation to understand your desires, hair texture, and daily routine.',
    },
    {
      title: 'Expert Technique',
      description: 'Our stylists are masters of precision cutting, using advanced techniques to create shape, volume, and movement.',
    },
    {
      title: 'Luxurious Wash & Condition',
      description: 'Relax with a soothing scalp massage and a professional wash using premium products suited for your hair type.',
    },
    {
      title: 'Professional Blowout & Styling',
      description: 'We finish every cut with a beautiful blowout and styling, providing tips on how to recreate the look at home.',
    },
  ],
  galleryImages: [
    { src: '/hair1.jpg', alt: 'Chic bob haircut', dataAiHint: 'bob haircut' },
    { src: '/hair 2.jpg', alt: 'Long layered hairstyle', dataAiHint: 'long hairstyle' },
    { src: 'https://picsum.photos/seed/style3/600/400', alt: 'Elegant updo for a special occasion', dataAiHint: 'elegant updo' },
    { src: 'https://picsum.photos/seed/style4/600/400', alt: "Men's stylish haircut", dataAiHint: 'mens haircut' },
  ],
};

export default function HaircutServicePage() {
  return (
    <div className="bg-background font-body">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center text-white">
        <Image
          src={haircutService.heroImage}
          alt={haircutService.name}
          fill
          style={{ objectFit: 'cover' }}
          quality={90}
          priority
          className="brightness-50"
          data-ai-hint={haircutService.dataAiHint}
        />
        <div className="relative z-10 text-center p-4">
          <p className="text-sm md:text-base uppercase tracking-widest text-white/80 mb-2">{haircutService.breadcrumb}</p>
          <h1 className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-lg">
            {haircutService.name}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Left Column: Description & Features */}
          <div className="lg:col-span-2">
            <h2 className="font-headline text-3xl md:text-4xl text-primary mb-6">The Art of the Perfect Cut</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              {haircutService.mainDescription}
            </p>
            <div className="space-y-6">
              {haircutService.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full mr-4">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-headline text-xl text-primary mb-1">{feature.title}</h3>
                    <p className="text-foreground/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-1">
            <Card className="rounded-xl shadow-lg bg-card sticky top-32">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-center text-primary">Ready for a Change?</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold font-headline text-foreground mb-2">{haircutService.price}</p>
                <p className="text-muted-foreground mb-6">Includes consultation, wash, cut, and professional styling.</p>
                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg">
                  <Link href="/#book">Book Your Appointment</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-16 md:mt-24">
          <h2 className="font-headline text-3xl md:text-4xl text-primary text-center mb-10">Style Inspiration</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {haircutService.galleryImages.map((image, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-md group">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={image.dataAiHint}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
