import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import Service from './models/Service.js';
import Package from './models/Package.js';
import Testimonial from './models/Testimonial.js';
import Portfolio from './models/Portfolio.js';

dotenv.config();

const services = [
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    category: 'Social Media',
    shortDescription: 'Dominate social platforms with data-driven marketing campaigns.',
    description:
      'We craft powerful social media strategies that grow your audience and convert followers into customers. From Facebook and Instagram to TikTok and YouTube, we handle every platform with precision.',
    features: [
      'Facebook Ads Management',
      'Instagram Ads Management',
      'Page Management',
      'Instagram Growth',
      'TikTok Management',
      'YouTube Management',
    ],
    benefits: ['More leads', 'Higher engagement', 'ROI-driven campaigns'],
    icon: 'fa-solid fa-share-nodes',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80',
    priceFrom: 15000,
    featured: true,
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design & Creative',
    category: 'Design',
    shortDescription: 'Stunning visuals that make your brand unforgettable.',
    description:
      'From logos to full brand identities, we design premium visuals that stand out. Our creative team brings your vision to life with pixel-perfect designs.',
    features: [
      'Graphic Designing',
      'Logo Designing',
      'Video Editing',
      'Reels & Shorts',
      'Canva Design',
      'Content Creation',
    ],
    benefits: ['Brand recall', 'Premium visuals', 'Fast delivery'],
    icon: 'fa-solid fa-pen-nib',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
    priceFrom: 5000,
    featured: true,
  },
  {
    slug: 'web-development',
    title: 'Website Development',
    category: 'Web',
    shortDescription: 'WordPress, Shopify & custom e-commerce websites.',
    description:
      'Professional, fast, and SEO-friendly websites that convert visitors into customers. We build custom solutions tailored to your business needs.',
    features: [
      'WordPress Development',
      'E-commerce Development',
      'Shopify Store Development',
    ],
    benefits: ['Mobile responsive', 'SEO optimized', 'Secure'],
    icon: 'fa-solid fa-code',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=80',
    priceFrom: 25000,
    featured: true,
  },
  {
    slug: 'ai-digital-services',
    title: 'AI & Digital Services',
    category: 'AI',
    shortDescription: 'AI tools, Daraz management, consulting & more.',
    description:
      'Leverage cutting-edge AI tools and consulting to grow your digital business. From automation to strategy, we help you stay ahead.',
    features: [
      'AI Tools & Services',
      'Digital Marketing',
      'Business Consulting',
      'Daraz Store Management',
      'MS Office Services',
    ],
    benefits: ['Automation', 'Expert guidance', 'Time saving'],
    icon: 'fa-solid fa-robot',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    priceFrom: 10000,
    featured: true,
  },
];

const packages = [
  {
    name: 'Starter',
    tier: 'Basic',
    price: 15000,
    features: ['1 Platform', '4 Posts/month', 'Basic Support', '1 Revision'],
    popular: false,
  },
  {
    name: 'Growth',
    tier: 'Standard',
    price: 35000,
    features: [
      '3 Platforms',
      '12 Posts/month',
      'Priority Support',
      '3 Revisions',
      'Monthly Report',
    ],
    popular: true,
  },
  {
    name: 'Elite',
    tier: 'Premium',
    price: 75000,
    features: [
      '5 Platforms',
      '30 Posts/month',
      '24/7 Support',
      'Unlimited Revisions',
      'Weekly Reports',
      'Dedicated Manager',
    ],
    popular: false,
  },
];

const testimonials = [
  {
    clientName: 'Ahmed Khan',
    clientTitle: 'E-commerce Founder',
    company: 'ShopEase',
    content:
      'Ali Hamza Digital Hub transformed our social media presence. Sales increased 280% in 3 months! Absolutely incredible team to work with.',
    rating: 5,
    approved: true,
  },
  {
    clientName: 'Sara Malik',
    clientTitle: 'Boutique Owner',
    company: 'StyleNest',
    content:
      'Our Shopify store exceeded expectations. Professional, fast, and stunning design! Will definitely work with them again.',
    rating: 5,
    approved: true,
  },
  {
    clientName: 'Usman Raza',
    clientTitle: 'Startup CEO',
    company: 'TechLaunch',
    content:
      "Best graphic design team I've worked with. World-class quality at fair prices. Highly recommended!",
    rating: 5,
    approved: true,
  },
  {
    clientName: 'Fatima Zahra',
    clientTitle: 'Marketing Manager',
    company: 'GreenLeaf',
    content:
      'Their Facebook ads campaign brought us 500+ qualified leads in one month. ROI was exceptional.',
    rating: 5,
    approved: true,
  },
  {
    clientName: 'Bilal Ahmed',
    clientTitle: 'Restaurant Owner',
    company: 'Spice Garden',
    content:
      'The video editing work for our Instagram reels was phenomenal. Views went up 400% after working with them.',
    rating: 5,
    approved: true,
  },
  {
    clientName: 'Hira Shahid',
    clientTitle: 'Fashion Designer',
    company: 'Hira Couture',
    content:
      'Professional, creative, and always on time. They understand the fashion industry deeply.',
    rating: 5,
    approved: true,
  },
];

const portfolio = [
  {
    title: 'E-commerce Store Redesign',
    category: 'Web Development',
    description: 'Complete Shopify redesign with 40% conversion increase for a fashion brand.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80',
    projectUrl: '',
    featured: true,
  },
  {
    title: 'Restaurant Social Campaign',
    category: 'Social Media',
    description: 'Viral Instagram campaign with 2M+ reach for a local restaurant.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=80',
    projectUrl: '',
    featured: true,
  },
  {
    title: 'Brand Identity Design',
    category: 'Graphic Design',
    description: 'Complete brand identity package for a tech startup.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
    projectUrl: '',
    featured: true,
  },
  {
    title: 'Mobile App UI Design',
    category: 'Graphic Design',
    description: 'Modern mobile app UI for a fintech startup.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
    projectUrl: '',
    featured: true,
  },
  {
    title: 'YouTube Video Editing',
    category: 'Video Editing',
    description: 'Cinematic video editing for a popular YouTube channel.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
    projectUrl: '',
    featured: true,
  },
  {
    title: 'Facebook Ads Campaign',
    category: 'Social Media',
    description: 'High-converting Facebook ad campaign for local business.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80',
    projectUrl: '',
    featured: true,
  },
  {
    title: 'WordPress Business Site',
    category: 'Web Development',
    description: 'Professional WordPress website for a consulting firm.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop&q=80',
    projectUrl: '',
    featured: true,
  },
  {
    title: 'Product Photography',
    category: 'Graphic Design',
    description: 'Product photography and editing for an e-commerce store.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80',
    projectUrl: '',
    featured: true,
  },
  {
    title: 'TikTok Marketing',
    category: 'Social Media',
    description: 'Complete TikTok account management and growth campaign.',
    image: 'https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=800&auto=format&fit=crop&q=80',
    projectUrl: '',
    featured: true,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to DB');

    await Promise.all([
      Admin.deleteMany({}),
      Service.deleteMany({}),
      Package.deleteMany({}),
      Testimonial.deleteMany({}),
      Portfolio.deleteMany({}),
    ]);

    await Admin.create({
      name: 'Ali Hamza',
      email: 'admin@alihamzadigital.com',
      password: 'admin123',
      role: 'superadmin',
    });

    await Service.insertMany(services);
    await Package.insertMany(packages);
    await Testimonial.insertMany(testimonials);
    await Portfolio.insertMany(portfolio);

    console.log('✅ Database seeded successfully!');
    console.log('\n📧 Admin Login:');
    console.log('   Email: admin@alihamzadigital.com');
    console.log('   Password: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedDB();