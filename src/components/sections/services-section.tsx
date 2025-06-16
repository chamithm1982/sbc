"use client";

import { SERVICES_DATA, SERVICE_PACKAGES_DATA } from '@/lib/constants';
import ServiceCard from '@/components/ui/service-card';
import { Separator } from '@/components/ui/separator';

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            Explore Our World of Bespoke Beauty
          </h2>
          <p className="font-body text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Tired of one-size-fits-all beauty? At Salon B Curls, every service is a masterpiece, meticulously crafted to address your unique hair and skin aspirations. From vibrant, healthy color and precision cuts to restorative skin therapies, we combine the finest techniques and premium products for truly exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SERVICES_DATA.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              name={service.name}
              description={service.description}
              longDescription={service.longDescription}
              image={service.image}
              dataAiHint={service.dataAiHint}
              icon={service.icon}
              ctaText={service.ctaText}
              ctaLink={service.ctaLink}
              price={service.price}
            />
          ))}
        </div>

        {SERVICE_PACKAGES_DATA.length > 0 && (
          <>
            <div className="text-center my-12 md:my-16">
               <h3 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">
                Radiance Revival Packages
              </h3>
              <p className="font-body text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                Embark on a complete transformation with our specially curated packages, designed for an unforgettable pampering experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-2xl mx-auto"> {/* Changed to single column for packages to make them stand out */}
              {SERVICE_PACKAGES_DATA.map((pkg) => (
                <ServiceCard
                  key={pkg.id}
                  id={pkg.id}
                  name={pkg.name}
                  description={pkg.description}
                  longDescription={pkg.longDescription}
                  image={pkg.image}
                  dataAiHint={pkg.dataAiHint}
                  icon={pkg.icon}
                  ctaText={pkg.ctaText}
                  ctaLink={pkg.ctaLink}
                  price={pkg.price}
                  badgeText={pkg.badge}
                  includedServices={pkg.includedServices}
                  isPackage={true}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
