"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TeamMemberCardProps {
  name: string;
  title: string;
  bio: string;
  image: string;
  dataAiHint?: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, title, bio, image, dataAiHint }) => {
  return (
    <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden text-center bg-card">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-square">
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={dataAiHint || 'person portrait'}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="font-headline text-2xl text-primary mb-1">{name}</CardTitle>
        <p className="font-body text-base text-muted-foreground font-medium mb-3">{title}</p>
        <CardDescription className="font-body text-sm text-foreground/80 leading-relaxed">{bio}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
