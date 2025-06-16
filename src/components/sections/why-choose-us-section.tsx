"use client";

import { WHY_CHOOSE_US_POINTS } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WhyChooseUsSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            Why Salon B Curls is Dandenong&apos;s Choice
          </h2>
          <p className="font-body text-lg md:text-xl text-secondary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            What sets Salon B Curls apart? It&apos;s our unwavering commitment to your beauty journey and well-being, focusing on the needs of discerning women.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {WHY_CHOOSE_US_POINTS.map((point) => (
            <Card key={point.id} className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card flex flex-col">
              <CardHeader className="flex flex-row items-center space-x-4 pb-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <point.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-primary">{point.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="font-body text-base text-card-foreground/80 leading-relaxed">
                  {point.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
