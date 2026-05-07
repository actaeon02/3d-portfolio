import { Project } from '../types/portfolio';

// Import Video Assets
import anugerahVideo from '../assets/videos/anugerah_abadi_ban_demo.mp4';
import dimensiVideo from '../assets/videos/dimensi_sinergi_demo.mp4';
import kopiVideo from '../assets/videos/kopi_nusantara_demo.mp4';

// Import Image Assets
import portfolioImg from '../assets/images/portfolio_main_landing.png';
import kopiImg from '../assets/images/kopi_nusantara_landing.png';
import dimensiImg from '../assets/images/dimensi_sinergi_landing.png';
import anugerahImg from '../assets/images/anugerah_abadi_ban_landing.png';

export const freelanceProjects: Project[] = [
  {
    id: 1,
    title: 'Personal Portfolio',
    role: 'Creator & Developer',
    description: 'A high-end 3D portfolio showcasing digital craftsmanship through interactive experiences, editorial typography, and cutting-edge web technologies.',
    image: portfolioImg,
    tags: ['3D', 'Motion', 'Creative'],
    featured: true,
    themeColor: '#d0d0eeff', // Indigo
    link: 'https://mikaelandrew.netlify.app',
    // Fallback if no video yet
    overview: 'A personal creative laboratory built to showcase the intersection of Data Engineering and Immersive Design. The site functions as a digital museum of "Artifacts," utilizing Three.js and Framer Motion to create a cinematic, narrative-driven browsing experience that prioritizes technical mastery and atmospheric engagement.',
    features: [
      'Immersive 3D background with dynamic parallax depth',
      'Custom GLSL shaders for ambient particle systems',
      'Responsive typography with editorial negative leading',
      'Scroll-triggered interaction system for featured projects',
      'Integrated Case Study engine with media archive support'
    ]
  },
  {
    id: 2,
    title: 'Kopi Nusantara',
    role: 'UI/UX Design & Web Developer',
    description: 'A high-end, mobile-first digital experience for a premium specialty coffee brand in Bandung. Prioritizing atmospheric design and digital minimalism.',
    image: kopiImg,
    tags: ['F&B', 'Motion', 'Design'],
    featured: true,
    themeColor: '#c69a89ff', // Coffee Brown
    link: 'https://kopinusantarademo.netlify.app/',
    // video: kopiVideo,
    overview: 'Kopi Nusantara is designed to elevate brand perception beyond a standard menu. The site leverages immersive parallax storytelling and a grainy editorial aesthetic to create a tactile, high-quality digital space. It features a custom loading sequence, scroll-linked product showcases for "Gayo Wine" coffee, and a sophisticated adaptive navigation system.',
    features: [
      'Immersive intro sequence establishing brand identity',
      'Parallax brand storytelling with depth scaling',
      'Interactive menu system with smooth transitions',
      'Grainy texture overlay for tactile feel',
      'Focused "Gayo Wine" process showcase'
    ]
  },
  {
    id: 3,
    title: 'Dimensi Sinergi',
    role: 'Web Developer',
    description: 'A corporate engineering and architecture consultancy website. Focused on professional credibility and B2B communication.',
    image: dimensiImg,
    tags: ['B2B', 'Corporate', 'Web'],
    featured: true,
    themeColor: '#df7676ff', // Crimson Red
    link: 'https://dimensinergi95.com',
    // video: dimensiVideo,
    overview: 'A corporate website developed to strengthen the digital presence of an Indonesian engineering and architectural consultancy. The platform focuses on communicating credibility, showcasing services, and delivering a structured, professional experience tailored for B2B clients and stakeholders.',
    features: [
      'Corporate-focused landing pages highlighting services and expertise',
      'Professional project portfolio showcasing architectural work',
      'Structured B2B lead generation architecture',
      'High-contrast professional typography',
      'Clean, grid-based layout for service clarity'
    ]
  },
  {
    id: 4,
    title: 'Anugerah Abadi Ban',
    role: 'Web Developer',
    description: 'An industrial tire distribution portal for machine maintenance and logistics. Built for heavy industry stakeholders.',
    image: anugerahImg,
    tags: ['Industrial', 'B2B', 'Utility'],
    featured: false,
    themeColor: '#ebad82ff', // Brand Orange
    link: 'https://anugerahabadiban.netlify.app',
    // video: anugerahVideo,
    overview: 'A specialized portal for industrial tire distribution and maintenance. The project focused on simplifying complex product catalogs for heavy machinery, providing a reliable digital touchpoint for logistics and mining partners in low-bandwidth environments.',
    features: [
      'Intuitive industrial product categorization system',
      'Simplified catalog browsing for complex SKU data',
      'Optimized performance for industrial network environments',
      'Technical specification visualization',
      'Direct inquiry system for B2B procurement'
    ]
  }
];
