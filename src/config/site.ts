// Site metadata
export const siteConfig = {
  name: 'CoolAir',
  title: 'CoolAir - Premium Air Conditioning Solutions',
  description: 'Experience ultimate comfort with CoolAir premium air conditioning solutions. Energy-efficient cooling for your home and office.',
  url: 'https://coolair.com',
  logo: '/images/logo.webp',
  logoDark: '/images/logo-black.webp',
  favicon: '/favicon.ico',
  locale: 'en_US',
  twitter: '@coolair',
  social: {
    facebook: 'https://facebook.com/coolair',
    twitter: 'https://twitter.com/coolair',
    instagram: 'https://instagram.com/coolair',
    linkedin: 'https://linkedin.com/company/coolair',
    youtube: 'https://youtube.com/coolair',
  },
  contact: {
    phone: '+1 (123) 456-7890',
    email: 'info@coolair.com',
    address: '123 Cooling Street, Suite 101, New York, NY 10001, USA',
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM',
  },
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2152091793737!2d-73.98784492403533!3d40.75798597139034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzI4LjciTiA3M8KwNTknMTUuNSJX!5e0!3m2!1sen!2sus!4v1234567890123',
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID || '',
};

// Navigation links
export const navLinks = [
  { name: 'Home', href: '/', current: true },
  { name: 'About', href: '/about', current: false },
  { name: 'Services', href: '/services', current: false },
  { name: 'Products', href: '/all-products', current: false },
  { name: 'Pricing', href: '/pricing', current: false },
  { name: 'Blog', href: '/blog', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

// Footer navigation links
export const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
  ],
  services: [
    { name: 'AC Installation', href: '/services/installation' },
    { name: 'Repair & Maintenance', href: '/services/repair' },
    { name: 'Duct Cleaning', href: '/services/duct-cleaning' },
    { name: 'Energy Audits', href: '/services/energy-audits' },
    { name: 'Commercial HVAC', href: '/services/commercial' },
  ],
  support: [
    { name: 'FAQs', href: '/support/faqs' },
    { name: 'Warranty', href: '/support/warranty' },
    { name: 'Track Service', href: '/support/track-service' },
    { name: 'User Manuals', href: '/support/manuals' },
    { name: 'Contact Support', href: '/support/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Sitemap', href: '/sitemap' },
  ],
};

// Social media links
export const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/coolair',
    icon: 'facebook',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/coolair',
    icon: 'twitter',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/coolair',
    icon: 'instagram',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/coolair',
    icon: 'linkedin',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/coolair',
    icon: 'youtube',
  },
];

// Feature highlights
export const features = [
  {
    title: 'Energy Efficient',
    description: 'Our systems are designed to save you money on energy bills while keeping you comfortable.',
    icon: 'bolt',
  },
  {
    title: '24/7 Emergency Service',
    description: 'We\'re available around the clock to handle any HVAC emergencies.',
    icon: 'clock',
  },
  {
    title: 'Expert Technicians',
    description: 'Our certified technicians have years of experience in the HVAC industry.',
    icon: 'user-tie',
  },
  {
    title: '100% Satisfaction',
    description: 'We guarantee your satisfaction with our work and products.',
    icon: 'thumbs-up',
  },
];

// Testimonials
export const testimonials = [
  {
    name: 'John Smith',
    role: 'Homeowner',
    content: 'CoolAir installed our new AC system and the difference is incredible. Our home has never been more comfortable!',
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'Business Owner',
    content: 'Professional service from start to finish. The team was knowledgeable and completed the job on time and on budget.',
    rating: 5,
  },
  {
    name: 'Michael Brown',
    role: 'Property Manager',
    content: 'We use CoolAir for all our properties. Their maintenance plans keep our systems running efficiently.',
    rating: 4,
  },
];

// FAQ data
export const faqs = [
  {
    question: 'How often should I service my air conditioner?',
    answer: 'We recommend servicing your air conditioner at least once a year to ensure optimal performance and efficiency.',
  },
  {
    question: 'What size air conditioner do I need for my home?',
    answer: `The right size depends on various factors including your home's square footage, insulation, and climate. Contact us for a free consultation.`,
  },
  {
    question: 'How can I improve my indoor air quality?',
    answer: 'Regular maintenance, proper ventilation, and using air purifiers can significantly improve indoor air quality.',
  },
  {
    question: 'Do you offer financing options?',
    answer: 'Yes, we offer flexible financing options to help make your HVAC investment more affordable.',
  },
  {
    question: 'What brands do you work with?',
    answer: 'We work with all major HVAC brands including Carrier, Trane, Lennox, and more.',
  },
];

// Blog posts (example data)
export const blogPosts = [
  {
    title: 'Top 5 Energy-Saving Tips for Your Air Conditioner',
    excerpt: 'Learn how to reduce your energy bills while keeping your home cool and comfortable.',
    date: '2023-06-15',
    slug: 'energy-saving-tips',
    image: '/images/blog/energy-saving.jpg',
    category: 'Energy Efficiency',
  },
  {
    title: 'When to Repair vs. Replace Your HVAC System',
    excerpt: 'Not sure whether to repair or replace your aging HVAC system? This guide will help you decide.',
    date: '2023-05-22',
    slug: 'repair-vs-replace',
    image: '/images/blog/repair-replace.jpg',
    category: 'Maintenance',
  },
  {
    title: 'The Benefits of Regular HVAC Maintenance',
    excerpt: 'Regular maintenance can extend the life of your HVAC system and prevent costly repairs.',
    date: '2023-04-10',
    slug: 'hvac-maintenance-benefits',
    image: '/images/blog/maintenance.jpg',
    category: 'Maintenance',
  },
];

// Team members
export const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    bio: 'With over 20 years in the HVAC industry, John leads our team with expertise and vision.',
    image: '/images/team/john-doe.jpg',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Jane Smith',
    role: 'Service Manager',
    bio: 'Jane ensures all our service calls are handled efficiently and to the highest standards.',
    image: '/images/team/jane-smith.jpg',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Mike Johnson',
    role: 'Lead Technician',
    bio: 'Mike has been installing and repairing HVAC systems for over 15 years.',
    image: '/images/team/mike-johnson.jpg',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
];

// Service areas
export const serviceAreas = [
  'New York',
  'Brooklyn',
  'Queens',
  'Bronx',
  'Staten Island',
  'Long Island',
  'Westchester',
  'New Jersey',
  'Connecticut',
];

// Pricing plans
export const pricingPlans = [
  {
    name: 'Basic',
    price: 99,
    period: 'per month',
    description: 'Perfect for small homes or apartments',
    features: [
      '2 Annual Tune-ups',
      '10% Discount on Repairs',
      'Priority Scheduling',
      '24/7 Emergency Service',
      'No Overtime Charges',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Premium',
    price: 199,
    period: 'per month',
    description: 'Ideal for medium to large homes',
    features: [
      '4 Annual Tune-ups',
      '15% Discount on Repairs',
      'Priority Scheduling',
      '24/7 Emergency Service',
      'No Overtime Charges',
      'Duct Cleaning (Annual)',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Commercial',
    price: 499,
    period: 'per month',
    description: 'Tailored for business needs',
    features: [
      '6 Annual Tune-ups',
      '20% Discount on Repairs',
      'Priority Scheduling',
      '24/7 Emergency Service',
      'No Overtime Charges',
      'Duct Cleaning (Bi-annual)',
      'Dedicated Account Manager',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];
