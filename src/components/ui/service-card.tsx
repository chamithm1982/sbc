
"use client";

import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  image?: string;
  dataAiHint?: string;
  icon?: LucideIcon;
  ctaText?: string;
  ctaLink?: string;
  price?: string;
  badgeText?: "NEW" | "SPECIAL";
  includedServices?: string[];
  isPackage?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  description,
  image,
  dataAiHint,
  icon: Icon,
  ctaText = "Learn More",
  ctaLink = "#",
  price,
  badgeText,
  includedServices,
  isPackage = false,
}) => {
  return (
    <Card className="flex flex-col h-full rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-card group">
      {image && (
        <div className="relative w-full h-48">
          <Image 
            src={image} 
            alt={name} 
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={dataAiHint || 'service beauty'}
          />
          {badgeText && (
            <Badge variant="destructive" className="absolute top-2 right-2 text-sm py-1 px-3 rounded-full shadow-md bg-primary text-primary-foreground">
              {badgeText}
            </Badge>
          )}
        </div>
      )}
      <CardHeader className="pb-3">
        {Icon && <Icon className="h-10 w-10 text-primary mb-3" />}
        <CardTitle className="font-headline text-2xl text-primary">{name}</CardTitle>
        {price && <p className="font-body text-lg text-muted-foreground font-semibold">{price}</p>}
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="font-body text-base text-foreground/80 mb-4">{description}</CardDescription>
        
        {isPackage && includedServices && includedServices.length > 0 && (
          <div className="mb-4">
            <h4 className="font-body font-semibold text-foreground mb-1">Package Includes:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-foreground/70">
              {includedServices.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-body text-base py-3 shadow-md hover:shadow-lg transition-shadow">
          <Link href={ctaLink}>{ctaText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
