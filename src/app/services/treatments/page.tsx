
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Sparkles, Wind } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Hair Treatments & Skincare | Keratin, Facials & More | Salon B Curls',
  description: 'Revitalize your hair and skin with our expert treatments at Salon B Curls. We offer keratin smoothing, deep-conditioning masks, and rejuvenating facials tailored to your needs.',
};

const treatmentsService = {
  name: 'Advanced Treatments & Skincare',
  breadcrumb: 'Services > Treatments & Skincare',
  heroImage: '/service3.png',
  dataAiHint: 'serene spa facial',
  mainDescription: "Nourish, repair, and transform your hair and skin with our professional in-salon treatments. Our experts will assess your unique needs to recommend the perfect service, designed to improve texture, shine, and overall health.",
  hairTreatments: {
    title: 'Hair Treatments',
    price: 'From $150',
    duration: '1.5–3 hours',
    features: [
      { title: 'Consultation & Hair Assessment', description: 'Your stylist will assess your hair type, texture, and concerns to recommend the best treatment.' },
      { title: 'Keratin Smoothing', description: 'Infuses hair with keratin to smooth frizz, enhance shine, and make styling easier. Results last 3–5 months.' },
      { title: 'Permanent Hair Straightening', description: 'Chemical straightening for sleek, long-lasting results and a polished look.' },
      { title: 'Moisture & Repair Masks', description: 'Deep-conditioning treatments to restore hydration, strengthen strands, and repair damage.' },
    ],
  },
  skincareServices: {
    title: 'Beauty & Skincare',
    express: {
      name: 'Express Facial',
      price: 'From $45',
      duration: '~30 minutes',
      description: 'A quick refresh designed to restore radiance in minimal time.',
      features: ['Gentle Cleansing & Exfoliation', 'Steam & Toning', 'Relaxing Facial Massage & Moisturise'],
    },
    deluxe: {
      name: 'Deluxe Rejuvenating Facial',
      price: '$60–$80',
      duration: '~60 minutes',
      description: 'An indulgent, in-depth treatment targeting hydration, repair, and deep relaxation.',
      features: ['Personalized Skin Consultation', 'Deep Cleansing & Exfoliation', 'Steam & Extraction (if required)', 'Rejuvenating Facial Massage', 'Custom Mask & Treatment Serums', 'Moisturise & Protect'],
    },
  },
  galleryImages: [
    { src: 'https://picsum.photos/seed/treat1/600/400', alt: 'Woman receiving a relaxing facial', dataAiHint: 'relaxing facial' },
    { src: 'https://picsum.photos/seed/treat2/600/400', alt: 'Smooth and shiny keratin treated hair', dataAiHint: 'keratin hair' },
    { src: 'https://picsum.photos/seed/treat3/600/400', alt: 'Application of a face mask', dataAiHint: 'face mask' },
    { src: 'https://picsum.photos/seed/treat4/600/400', alt: 'Healthy, deep-conditioned hair', dataAiHint: 'healthy hair' },
  ],
};

export default function TreatmentsServicePage() {
  return (
    <div className="bg-background font-body">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center text-white">
        <Image
          src={treatmentsService.heroImage}
          alt={treatmentsService.name}
          fill
          style={{ objectFit: 'cover' }}
          quality={90}
          priority
          className="brightness-50"
          data-ai-hint={treatmentsService.dataAiHint}
        />
        <div className="relative z-10 text-center p-4">
          <p className="text-sm md:text-base uppercase tracking-widest text-white/80 mb-2">{treatmentsService.breadcrumb}</p>
          <h1 className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-lg">
            {treatmentsService.name}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Left Column: Descriptions */}
          <div className="lg:col-span-2 space-y-12">
            <p className="text-lg text-foreground/80 leading-relaxed">
              {treatmentsService.mainDescription}
            </p>

            {/* Hair Treatments Section */}
            <section>
              <h2 className="font-headline text-3xl md:text-4xl text-primary mb-6 flex items-center">
                <Wind className="h-8 w-8 mr-3" /> {treatmentsService.hairTreatments.title}
              </h2>
              <div className="space-y-6">
                {treatmentsService.hairTreatments.features.map((feature, index) => (
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
            </section>
            
            {/* Skincare Section */}
            <section>
              <h2 className="font-headline text-3xl md:text-4xl text-primary mb-6 flex items-center">
                <Sparkles className="h-8 w-8 mr-3" /> {treatmentsService.skincareServices.title}
              </h2>
              <div className="space-y-8">
                {/* Express Facial */}
                <Card className="rounded-xl shadow-md bg-card/50">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">{treatmentsService.skincareServices.express.name}</CardTitle>
                    <p className="font-body text-muted-foreground">{treatmentsService.skincareServices.express.description}</p>
                  </CardHeader>
                  <CardContent>
                     <ul className="space-y-2 text-foreground/80 list-disc list-inside">
                      {treatmentsService.skincareServices.express.features.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </CardContent>
                </Card>
                {/* Deluxe Facial */}
                <Card className="rounded-xl shadow-md bg-card/50">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">{treatmentsService.skincareServices.deluxe.name}</CardTitle>
                    <p className="font-body text-muted-foreground">{treatmentsService.skincareServices.deluxe.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-foreground/80 list-disc list-inside">
                      {treatmentsService.skincareServices.deluxe.features.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-1">
            <Card className="rounded-xl shadow-lg bg-card sticky top-32">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-center text-primary">Book Your Treatment</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                 <div>
                    <p className="text-xl font-bold font-headline text-foreground">{treatmentsService.hairTreatments.price}</p>
                    <p className="text-sm text-muted-foreground">Hair Treatments ({treatmentsService.hairTreatments.duration})</p>
                </div>
                 <div>
                    <p className="text-xl font-bold font-headline text-foreground">{treatmentsService.skincareServices.express.price}</p>
                    <p className="text-sm text-muted-foreground">Express Facial ({treatmentsService.skincareServices.express.duration})</p>
                </div>
                 <div>
                    <p className="text-xl font-bold font-headline text-foreground">{treatmentsService.skincareServices.deluxe.price}</p>
                    <p className="text-sm text-muted-foreground">Deluxe Facial ({treatmentsService.skincareServices.deluxe.duration})</p>
                </div>

                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg mt-4">
                  <Link href="/#book">Request Appointment</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-16 md:mt-24">
          <h2 className="font-headline text-3xl md:text-4xl text-primary text-center mb-10">Treatment Inspiration</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatmentsService.galleryImages.map((image, index) => (
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
