"use client";

import { TEAM_DATA } from '@/lib/constants';
import TeamMemberCard from '@/components/ui/team-member-card';

const TeamSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            Meet Our Passionate Team
          </h2>
          <p className="font-body text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Beyond a Salon: Your Personal Sanctuary for Beauty and Well-being. At Salon B Curls, our passionate team of highly skilled stylists and beauty therapists is dedicated to creating an unparalleled guest experience. We invite you to unwind, find solace, and emerge not just beautiful, but profoundly confident and re-energized.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_DATA.map((member) => (
            <TeamMemberCard
              key={member.id}
              name={member.name}
              title={member.title}
              bio={member.bio}
              image={member.image}
              dataAiHint={member.dataAiHint}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
