
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Vibrant Hair Coloring | Balayage, Highlights & More | Salon B Curls',
  description: 'Transform your look with professional hair coloring at Salon B Curls. From full tints and highlights to balayage, our experts tailor every color to you. Book your consultation today.',
};

const hairColoringService = {
  name: 'Vibrant Hair Coloring',
  breadcrumb: 'Services > Hair Coloring',
  heroImage: '/service2.png',
  dataAiHint: 'vibrant hair color',
  mainDescription: "Transform your look with our professional color services, tailored to your unique style and hair needs. Our expert colorists use premium products to achieve stunning, long-lasting results while maintaining the health and integrity of your hair. Discover the perfect shade and technique to express your individuality.",
  price: {
    short: 'From $120',
    long: 'Up to $200+'
  },
  duration: '2–4 hours',
  features: [
    {
      title: 'Personalized Color Consultation',
      description: 'A detailed discussion to select the right shade, tone, and technique based on your skin tone, lifestyle, and preferences.',
    },
    {
      title: 'Advanced Coloring Techniques',
      description: 'Including Full Tint, Highlights & Lowlights, Balayage, Babylights, and Ombre for dimensional, beautiful results.',
    },
    {
      title: 'Demi-Permanent & Permanent Options',
      description: 'Choose between softer, temporary color or long-lasting coverage, ideal for grey blending or a complete change.',
    },
    {
      title: 'Toning & Glossing Treatment',
      description: 'We refine undertones, boost shine, and refresh faded color to perfect your final look.',
    },
     {
      title: 'After-Color Care & Styling',
      description: 'Your service is completed with a gentle wash and conditioning to lock in color, followed by a professional blow-wave finish.',
    },
  ],
  galleryImages: [
    { src: 'https://picsum.photos/seed/color1/600/400', alt: 'Rich brunette balayage', dataAiHint: 'brunette balayage' },
    { src: 'https://picsum.photos/seed/color2/600/400', alt: 'Bright blonde highlights', dataAiHint: 'blonde highlights' },
    { src: 'https://picsum.photos/seed/color3/600/400', alt: 'Vibrant red hair color', dataAiHint: 'red hair' },
    { src: 'https://picsum.photos/seed/color4/600/400', alt: 'Subtle and natural babylights', dataAiHint: 'natural highlights' },
  ],
};

export default function HairColoringServicePage() {
  return (
    <div className="bg-background font-body">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center text-white">
        <Image
          src={hairColoringService.heroImage}
          alt={hairColoringService.name}
          fill
          style={{ objectFit: 'cover' }}
          quality={90}
          priority
          className="brightness-50"
          data-ai-hint={hairColoringService.dataAiHint}
        />
        <div className="relative z-10 text-center p-4">
          <p className="text-sm md:text-base uppercase tracking-widest text-white/80 mb-2">{hairColoringService.breadcrumb}</p>
          <h1 className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-lg">
            {hairColoringService.name}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Left Column: Description & Features */}
          <div className="lg:col-span-2">
            <h2 className="font-headline text-3xl md:text-4xl text-primary mb-6">The Art of Custom Color</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              {hairColoringService.mainDescription}
            </p>
            <div className="space-y-6">
              {hairColoringService.features.map((feature, index) => (
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
                <CardTitle className="font-headline text-2xl text-center text-primary">Ready for a New Hue?</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                    <p className="text-2xl font-bold font-headline text-foreground">{hairColoringService.price.short}</p>
                    <p className="text-sm text-muted-foreground">(Short Hair)</p>
                </div>
                <div className="mb-4">
                    <p className="text-2xl font-bold font-headline text-foreground">{hairColoringService.price.long}</p>
                    <p className="text-sm text-muted-foreground">(Long/Thick Hair)</p>
                </div>
                <p className="text-muted-foreground mb-6">Duration: {hairColoringService.duration}</p>
                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg">
                  <Link href="/#book">Book Your Appointment</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-16 md:mt-24">
          <h2 className="font-headline text-3xl md:text-4xl text-primary text-center mb-10">Color Inspiration</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hairColoringService.galleryImages.map((image, index) => (
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
