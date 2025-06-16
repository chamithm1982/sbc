"use client";

import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FAQ_DATA } from '@/lib/constants';

const FaqSection = () => {
  if (!FAQ_DATA || FAQ_DATA.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="py-16 md:py-24 bg-accent/50 dark:bg-accent/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-lg md:text-xl text-accent-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Have questions? We&apos;ve got answers. Find information about our services, booking, and more.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQ_DATA.map((faqItem) => (
              <AccordionItem key={faqItem.id} value={faqItem.id} className="bg-card p-4 md:p-6 rounded-xl shadow-md border border-border">
                <AccordionTrigger className="font-headline text-lg md:text-xl text-primary hover:no-underline text-left">
                  {faqItem.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-base text-card-foreground/80 pt-3 leading-relaxed">
                  {faqItem.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
