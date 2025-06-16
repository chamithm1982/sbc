import HeroSection from '@/components/sections/hero-section';
import ServicesSection from '@/components/sections/services-section';
import WhyChooseUsSection from '@/components/sections/why-choose-us-section';
import TeamSection from '@/components/sections/team-section';
import ContactSection from '@/components/sections/contact-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}
