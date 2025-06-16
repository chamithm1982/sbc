"use client";

import Image from 'next/image';
import { Star, MessageSquareQuote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TESTIMONIALS_DATA } from '@/lib/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TestimonialsSection = () => {
  if (!TESTIMONIALS_DATA || TESTIMONIALS_DATA.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <MessageSquareQuote className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            Words of Radiance
          </h2>
          <p className="font-body text-lg md:text-xl text-secondary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Hear what our cherished clients have to say about their transformations at Salon B Curls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col rounded-xl shadow-lg bg-card p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="p-0 mb-4 flex-row items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                  <AvatarFallback>{testimonial.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="font-headline text-xl text-primary">{testimonial.name}</CardTitle>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.stars ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow">
                <p className="font-body text-base text-card-foreground/80 leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
