import HeroSection from '@/components/sections/hero-section';
import ServicesSection from '@/components/sections/services-section';
import WhyChooseUsSection from '@/components/sections/why-choose-us-section';
import TeamSection from '@/components/sections/team-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import FaqSection from '@/components/sections/faq-section';
import ContactSection from '@/components/sections/contact-section';
import BookingSection from '@/components/sections/booking-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TeamSection />
      <TestimonialsSection />
      <BookingSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
