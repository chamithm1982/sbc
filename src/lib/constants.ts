
import { Leaf, Scissors, Sparkles, Users, Star, Crown, Check, MessageSquareQuote, HelpCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavLinkItem {
  href: string;
  label: string;
  isButton?: boolean;
}

export const NAV_LINKS: NavLinkItem[] = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/#about', label: 'About Us' },
  { href: '/location', label: 'Visit Us' },
  { href: '/#contact', label: 'Contact' },
  { href: '/#book', label: 'Book Now', isButton: true },
];

export interface Service {
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
}

export interface ServicePackage extends Service {
  badge?: "NEW" | "SPECIAL";
  includedServices?: string[];
}

export const SERVICES_DATA: Service[] = [
  {
    id: 'haircut',
    name: 'Precision Haircuts & Styling',
    description: 'Bespoke cuts and styling to perfectly suit your features and lifestyle.',
    longDescription: 'Our expert stylists begin with a thorough consultation to understand your hair type, face shape, and personal style. We then craft a precision cut that enhances your natural beauty and is easy to manage. Whether you desire a classic look or a modern trend, we deliver exceptional results. Styling services range from blowouts to elegant updos for special occasions.',
    icon: Scissors,
    image: '/service1.png',
    dataAiHint: 'hair styling',
    ctaText: 'Book Haircut',
    ctaLink: '#book',
    price: 'From $80'
  },
  {
    id: 'haircolor',
    name: 'Vibrant Hair Coloring',
    description: 'From rich brunettes to radiant blondes, achieve your dream hair color.',
    longDescription: 'Experience the art of hair coloring with our skilled colorists. We use premium, gentle products to achieve vibrant, long-lasting color while maintaining the health of your hair. Services include full color, highlights, balayage, ombre, and color correction. We specialize in creating natural-looking dimension and shine.',
    icon: Sparkles,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'hair color',
    ctaText: 'Book Coloring',
    ctaLink: '#book',
    price: 'From $120'
  },
  {
    id: 'skintreatment',
    name: 'Rejuvenating Skin Therapies',
    description: 'Restore your skin\'s glow with our advanced, personalized skin treatments.',
    longDescription: 'Our licensed estheticians provide a range of rejuvenating skin therapies tailored to your specific skin concerns. Whether you\'re looking to address aging, acne, dryness, or sensitivity, we offer facials, peels, and advanced treatments using high-quality, effective skincare products to leave your skin feeling refreshed, renewed, and radiant.',
    icon: Leaf,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'skin treatment',
    ctaText: 'Book Skin Therapy',
    ctaLink: '#book',
    price: 'From $95'
  },
];

export const SERVICE_PACKAGES_DATA: ServicePackage[] = [
  {
    id: 'radiance-revival',
    name: 'Radiance Revival Package',
    description: 'A complete transformation journey for your hair and skin.',
    longDescription: 'Embark on a holistic beauty experience with our Radiance Revival Package. This curated journey includes a personalized hair consultation, precision cut, custom color service, and a signature rejuvenating facial. It\'s designed to leave you feeling completely pampered, confident, and radiant from head to toe.',
    icon: Users, // Consider a more "package" or "luxury" icon if available
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'beauty package',
    badge: 'SPECIAL',
    ctaText: 'Discover Package',
    ctaLink: '#book',
    price: '$350',
    includedServices: ['Personalized Hair Consultation', 'Precision Cut & Style', 'Custom Color Service (e.g., Balayage or Full Color)', 'Signature Rejuvenating Facial']
  },
];

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  dataAiHint?: string;
}

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'justin-pace',
    name: 'Justin Pace',
    title: 'Lead Stylist & Founder',
    bio: 'With over 15 years of experience and multiple awards, Justin brings passion and precision to every client interaction, specializing in transformative hair artistry.',
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'hairstylist portrait',
  },
  {
    id: 'emily-carter',
    name: 'Emily Carter',
    title: 'Senior Colourist & Stylist',
    bio: 'Emily is a creative force, known for her beautiful balayage work and ability to craft personalized color that enhances natural beauty.',
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'woman portrait',
  },
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    title: 'Lead Beauty Therapist',
    bio: 'Sarah is dedicated to holistic skin health, offering customized treatments that address concerns and promote a radiant, youthful complexion.',
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'therapist portrait',
  },
];

export interface WhyChooseUsPoint {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const WHY_CHOOSE_US_POINTS: WhyChooseUsPoint[] = [
  {
    id: 'craftsmanship',
    title: 'Masterful Craftsmanship',
    description: "Our award-winning stylists and certified beauty therapists don't just perform services; they create art, bringing unparalleled skill and passion to every detail of your transformation.",
    icon: Crown,
  },
  {
    id: 'bespoke-journey',
    title: 'Your Bespoke Beauty Journey',
    description: "Forget generic solutions. We begin with an in-depth consultation to understand your unique aspirations, customizing every treatment to perfectly match your hair and skin needs for results that truly reflect you.",
    icon: Star,
  },
  {
    id: 'sanctuary',
    title: 'A Sanctuary of Serenity',
    description: "Escape the bustle. Our tranquil salon provides a luxurious haven where you can truly relax, unwind, and indulge in a pampering experience designed for your complete well-being.",
    icon: Leaf,
  },
  {
    id: 'confidence',
    title: 'Confidence That Lasts',
    description: "We're committed to not just achieving your desired look and feel, but ensuring it's easily maintained. Walk out with vibrant, healthy hair and radiant skin that empowers your confidence every single day.",
    icon: Check,
  },
];

export const CONTACT_DETAILS = {
  phone: '(03) 9876 5432',
  email: 'bookings@salonbcurls.com.au',
  addressLine1: '123 Curl Street',
  addressLine2: 'Dandenong, VIC 3175, Australia',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20100.86872580875!2d145.20165039401777!3d-37.98200055278451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad615a1a0b3f8a7%3A0x5045675218cd0e0!2sDandenong%20VIC%203175%2C%20Australia!5e0!3m2!1sen!2sus!4v1626891000000!5m2!1sen!2sus'
};

export const OPENING_HOURS = [
  { day: 'Monday', hours: 'Closed' },
  { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Thursday', hours: '10:00 AM - 8:00 PM (Late Night)' },
  { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '8:30 AM - 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

export const SOCIAL_LINKS = [
  { name: 'Facebook', url: 'https://facebook.com/salonbcurls', icon: 'facebook' },
  { name: 'Instagram', url: 'https://instagram.com/salonbcurls', icon: 'instagram' },
];

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  image?: string;
  dataAiHint?: string;
  stars: number;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'jane-d',
    quote: "Salon B Curls is my absolute go-to! Justin is a hair magician, and I always leave feeling like a new woman. The atmosphere is so relaxing and luxurious.",
    name: "Jane D.",
    image: "https://placehold.co/100x100.png",
    dataAiHint: "woman smiling",
    stars: 5,
  },
  {
    id: 'sarah-p',
    quote: "I had the Radiance Revival Package and it was divine. My skin is glowing and my hair has never looked better. Highly recommend for a proper pampering session!",
    name: "Sarah P.",
    image: "https://placehold.co/100x100.png",
    dataAiHint: "happy client",
    stars: 5,
  },
  {
    id: 'lisa-m',
    quote: "The team is so professional and truly listens to what you want. I love my new color, and the salon itself is beautiful. A wonderful experience every time.",
    name: "Lisa M.",
    image: "https://placehold.co/100x100.png",
    dataAiHint: "satisfied customer",
    stars: 5,
  }
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq1',
    question: 'What are your opening hours?',
    answer: 'We are open Tuesday to Friday from 9 AM to 6 PM (Thursdays late night until 8 PM), and Saturdays from 8:30 AM to 4 PM. We are closed on Mondays and Sundays.'
  },
  {
    id: 'faq2',
    question: 'Do I need to book an appointment?',
    answer: 'Yes, we highly recommend booking an appointment in advance to ensure availability, especially for longer services or specific stylists. You can book by calling us or using the "Book Now" button on our website.'
  },
  {
    id: 'faq3',
    question: 'What is your cancellation policy?',
    answer: 'We kindly request at least 24 hours notice for any cancellations or rescheduling. This allows us to offer the appointment slot to other clients. Late cancellations or no-shows may be subject to a fee.'
  },
  {
    id: 'faq4',
    question: 'Where are you located and is there parking?',
    answer: 'We are located at 123 Curl Street, Dandenong, VIC 3175. There is on-street parking available, as well as nearby public parking lots. Please refer to our "Visit Us" page for more detailed directions and parking information.'
  },
  {
    id: 'faq5',
    question: 'What products do you use?',
    answer: 'We use a curated selection of premium, professional-grade hair and skin care products known for their quality and effectiveness, ensuring the best results while prioritizing the health of your hair and skin.'
  }
];

    
