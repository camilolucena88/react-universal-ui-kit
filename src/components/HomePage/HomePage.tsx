import React, { useEffect } from "react";
import { gsap } from "gsap";
import Advantages from "./Advantages";
import Contact from "./Contact";
import Courses from "./Courses";
import Destinations from "./Destinations";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Videos from "./Videos";
import Features from "./Features";
import {CartProvider} from "./context/CartContext";
import FAQ from "./FAQ";
import Gallery from "./Gallery";
import Chatbot from "./Chatbot";
import Cart from "./Cart";
import ServicesNoIcons from "./ServicesNoIcons";
import {
  BookOpen, Briefcase,
  Calendar,
  CheckCircle,
  Globe2,
  GraduationCap,
  Home,
  Map,
  Plane,
  Shield,
  Trophy,
  Users
} from "lucide-react";
import {FAQItem, Service, Message} from "../../types/general";
import CourseTypes from "./CourseTypes";

const servicesNoIcon: Service[] = [
  {
    title: 'Asistencia con el Visado',
    shortDescription: 'Orientación experta durante todo el proceso de solicitud de visado para tu experiencia de estudio en el extranjero.',
    fullDescription: 'Nuestro equipo dedicado a soporte de visados ofrece asistencia integral durante todo el proceso de solicitud. Te ayudamos a comprender los requisitos, preparar la documentación y asegurarnos de que tu solicitud cumpla con todos los criterios necesarios.',
    features: [
      'Preparación y verificación de documentos',
      'Asistencia con el formulario de solicitud',
      'Orientación para la preparación de entrevistas',
      'Consulta sobre los requisitos del visado',
      'Soporte de seguimiento',
      'Asistencia de emergencia'
    ]
  },
  {
    title: 'Servicios de Alojamiento',
    shortDescription: 'Encuentra tu hogar perfecto lejos de casa con nuestras opciones de alojamiento cuidadosamente seleccionadas.',
    fullDescription: 'Ofrecemos una amplia variedad de opciones de alojamiento previamente inspeccionadas para adaptarse a cada preferencia y presupuesto. Nuestro equipo de vivienda inspecciona personalmente todas las propiedades para garantizar que cumplan con nuestros estándares de calidad.',
    features: [
      'Alojamiento en familia local',
      'Residencias estudiantiles',
      'Apartamentos compartidos',
      'Estudios privados',
      'Opciones a corto y largo plazo',
      'Todos los servicios incluidos'
    ]
  },
  {
    title: 'Selección en Cursos de Idiomas',
    shortDescription: 'Selección de cursos personalizada para adaptarse a tus objetivos de aprendizaje y nivel de competencia actual.',
    fullDescription: 'Nuestros asesores académicos trabajan contigo para crear un plan de estudio personalizado basado en tus metas, horario y nivel actual de inglés. Nos aseguramos de que estés en el curso adecuado para maximizar tu potencial de aprendizaje.',
    features: [
      'Evaluación de nivel gratuita',
      'Planes de estudio personalizados',
      'Monitoreo regular del progreso',
      'Opciones de horario flexibles',
      'Cursos especializados disponibles',
      'Preparación para certificaciones'
    ]
  },
  {
    title: 'Seguro para Estudiantes',
    shortDescription: 'Cobertura de seguro integral para una experiencia de estudio sin preocupaciones en el extranjero.',
    fullDescription: 'Colaboramos con proveedores de seguros líderes para ofrecer coberturas integrales diseñadas específicamente para estudiantes internacionales. Nuestros paquetes incluyen protección de salud, viajes y bienes personales.',
    features: [
      'Cobertura de seguro médico',
      'Seguro de viajes',
      'Protección de bienes personales',
      'Asistencia de emergencia',
      'Línea de soporte 24/7',
      'Facturación directa con hospitales'
    ]
  },
  {
    title: 'Programa de Integración Cultural',
    shortDescription: 'Sumérgete en la cultura local con actividades y eventos organizados.',
    fullDescription: 'Nuestro programa de integración cultural te ayuda a adaptarte a tu nuevo entorno y a aprovechar al máximo tu experiencia de estudio en el extranjero. Organizamos actividades regulares, eventos y excursiones para que explores y comprendas la cultura local.',
    features: [
      'Actividades sociales semanales',
      'Talleres culturales',
      'Sistema de compañeros locales',
      'Eventos de intercambio de idiomas',
      'Recorridos por la ciudad y excursiones',
      'Celebraciones de festivales'
    ]
  },
  {
    title: 'Soporte para el Desarrollo Profesional',
    shortDescription: 'Mejora tus perspectivas profesionales con nuestros servicios integrales de desarrollo profesional.',
    fullDescription: 'Nuestro equipo de desarrollo profesional brinda orientación y apoyo para ayudarte a alcanzar tus metas laborales. Desde la redacción de CV hasta la preparación para entrevistas, te ayudamos a prepararte para tu carrera futura.',
    features: [
      'Redacción de CV y cartas de presentación',
      'Preparación para entrevistas',
      'Asistencia en la búsqueda de empleo',
      'Eventos de networking',
      'Talleres de la industria',
      'Colocación en prácticas profesionales'
    ]
  }
];

const services = [
    {
        icon: <Plane className="h-8 w-8"/>,
        title: 'Visa Assistance',
        description: 'Complete support with visa applications and documentation.'
    },
    {
        icon: <Home className="h-8 w-8"/>,
        title: 'Accommodation',
        description: 'Find the perfect place to stay with our accommodation services.'
    },
    {
        icon: <BookOpen className="h-8 w-8"/>,
        title: 'Language Courses',
        description: 'Comprehensive English courses for all levels.'
    },
    {
        icon: <Shield className="h-8 w-8"/>,
        title: 'Travel Insurance',
        description: 'Stay protected with our travel insurance packages.'
    },
    {
        icon: <Map className="h-8 w-8"/>,
        title: 'Local Activities',
        description: 'Explore the local culture with organized activities.'
    },
    {
        icon: <Briefcase className="h-8 w-8"/>,
        title: 'Job Opportunities',
        description: 'Access to job markets and career guidance.'
    }
];

const features = [
  {
    title: 'Learn in World-Class Facilities',
    description: 'Our modern campuses are equipped with state-of-the-art technology and comfortable learning spaces. Each classroom is designed to facilitate interactive learning with smart boards, multimedia equipment, and flexible seating arrangements. Students also have access to self-study areas, a library with extensive English learning resources, and comfortable student lounges.',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80',
    imageAlt: 'Modern classroom facility'
  },
  {
    title: 'Cultural Immersion Programs',
    description: 'Go beyond traditional language learning with our immersive cultural programs. Participate in local events, join conversation clubs with native speakers, and engage in cultural workshops. Our programs include guided city tours, cooking classes featuring local cuisine, and regular social activities where you can practice English in real-world situations.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80',
    imageAlt: 'Students engaging in cultural activities'
  },
  {
    title: 'Career Development Support',
    description: 'Launch your international career with our comprehensive career support services. We offer professional development workshops, CV writing assistance, and interview preparation in English. Our partnerships with local businesses provide internship opportunities, and our career counselors help you navigate the job market in English-speaking countries.',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80',
    imageAlt: 'Career counseling session'
  }
];

const advantages = [
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Small Class Sizes',
    description: 'Maximum of 12 students per class ensures personalized attention'
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: 'Certified Teachers',
    description: 'Native speakers with CELTA/DELTA qualifications'
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    title: 'Flexible Schedule',
    description: 'Morning, afternoon, and evening classes available'
  },
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: 'Recognized Certificates',
    description: 'Internationally recognized certifications upon completion'
  },
  {
    icon: <Globe2 className="h-8 w-8" />,
    title: 'Cultural Exchange',
    description: 'Regular events and activities with international students'
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    title: 'Job Support',
    description: 'CV workshops and job placement assistance'
  }
];

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80',
    alt: 'Students studying together',
    caption: 'Collaborative learning environment'
  },
  {
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80',
    alt: 'Modern campus library',
    caption: 'State-of-the-art study facilities'
  },
  {
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80',
    alt: 'Student accommodation',
    caption: 'Comfortable student residences'
  },
  {
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80',
    alt: 'Group activity',
    caption: 'Engaging extracurricular activities'
  },
  {
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80',
    alt: 'Student life',
    caption: 'Vibrant campus community'
  }
];

const destinations = [
  {
    name: 'London, UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80',
    description: 'Study English in the heart of the UK with access to world-class institutions.'
  },
  {
    name: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80',
    description: 'Experience American English while living in the most vibrant city in the world.'
  },
  {
    name: 'Sydney, Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80',
    description: 'Combine English studies with an amazing lifestyle in beautiful Sydney.'
  },
  {
    name: 'Toronto, Canada',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&q=80',
    description: 'Study in one of the most multicultural cities with excellent quality of life.'
  },
  {
    name: 'Dublin, Ireland',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80',
    description: 'Experience Irish hospitality while studying in this historic and vibrant city.'
  },
  {
    name: 'Vancouver, Canada',
    image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&q=80',
    description: 'Study surrounded by stunning nature and a high quality of life.'
  },
  {
    name: 'Melbourne, Australia',
    image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&q=80',
    description: 'Join the world\'s most liveable city with excellent educational opportunities.'
  },
  {
    name: 'Edinburgh, UK',
    image: 'https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&q=80',
    description: 'Study in Scotland\'s historic capital surrounded by stunning architecture.'
  },
  {
    name: 'San Francisco, USA',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80',
    description: 'Learn English in the tech capital of the world.'
  },
  {
    name: 'Auckland, New Zealand',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&q=80',
    description: 'Study in New Zealand\'s largest city surrounded by natural beauty.'
  },
  {
    name: 'Manchester, UK',
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&q=80',
    description: 'Experience northern English culture in this vibrant student city.'
  },
  {
    name: 'Boston, USA',
    image: 'https://images.unsplash.com/photo-1501979376754-f1e8d89c7fe0?auto=format&fit=crop&q=80',
    description: 'Study in America\'s premier educational hub.'
  },
  {
    name: 'Brisbane, Australia',
    image: 'https://images.unsplash.com/photo-1452859030917-45a0de82ef4c?auto=format&fit=crop&q=80',
    description: 'Enjoy subtropical climate while studying in this growing city.'
  },
  {
    name: 'Montreal, Canada',
    image: 'https://images.unsplash.com/photo-1519178614-68673b201f36?auto=format&fit=crop&q=80',
    description: 'Experience bilingual culture in this historic Canadian city.'
  },
  {
    name: 'Oxford, UK',
    image: 'https://images.unsplash.com/photo-1590510616176-67c87a688639?auto=format&fit=crop&q=80',
    description: 'Study in one of the world\'s most prestigious academic cities.'
  },
  {
    name: 'Seattle, USA',
    image: 'https://images.unsplash.com/photo-1502175353174-a7a70e73b362?auto=format&fit=crop&q=80',
    description: 'Learn English in the innovative Pacific Northwest.'
  },
  {
    name: 'Perth, Australia',
    image: 'https://images.unsplash.com/photo-1573935448851-e0a5d7507f4e?auto=format&fit=crop&q=80',
    description: 'Study in Australia\'s sunniest capital city.'
  },
  {
    name: 'Cambridge, UK',
    image: 'https://images.unsplash.com/photo-1579619002916-88cd4c81a70c?auto=format&fit=crop&q=80',
    description: 'Experience academic excellence in this historic university city.'
  },
  {
    name: 'Wellington, New Zealand',
    image: 'https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?auto=format&fit=crop&q=80',
    description: 'Study in New Zealand\'s cultural capital.'
  },
  {
    name: 'Chicago, USA',
    image: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&q=80',
    description: 'Experience American culture in the heart of the Midwest.'
  }
];

const courses = [
  {
    id: '1',
    title: 'Intensive English',
    type: 'in-person',
    duration: '4-12 weeks',
    level: 'All levels',
    description: 'Accelerated learning with focused daily classes.',
    price: 1299
  },
  {
    id: '2',
    title: 'Business English',
    type: 'in-person',
    duration: '8-16 weeks',
    level: 'Intermediate to Advanced',
    description: 'Specialized English for professional environments.',
    price: 1599
  },
  {
    id: '3',
    title: 'Online Live Classes',
    type: 'online',
    duration: 'Flexible',
    level: 'All levels',
    description: 'Interactive online classes with expert teachers.',
    price: 799
  },
  {
    id: '4',
    title: 'IELTS Preparation',
    type: 'in-person',
    duration: '12 weeks',
    level: 'Intermediate to Advanced',
    description: 'Comprehensive preparation for IELTS exam.',
    price: 1499
  }
];

const videos = [
  {
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80',
    title: 'Campus Life in London',
    duration: '3:45',
    description: 'Experience a day in the life of our London students'
  },
  {
    thumbnail: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80',
    title: 'Student Success Stories',
    duration: '5:20',
    description: 'See how our students achieved their English learning goals'
  },
  {
    thumbnail: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80',
    title: 'Virtual Campus Tour',
    duration: '4:15',
    description: 'Take a tour of our modern facilities and classrooms'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    from: 'Singapore',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    text: 'The support I received from GlobalEnglish was exceptional. From visa assistance to finding accommodation, everything was handled professionally.',
    rating: 5
  },
  {
    name: 'Carlos Rodriguez',
    from: 'Spain',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    text: 'The Business English course helped me secure a job at an international company. The teachers were experienced and the course material was practical.',
    rating: 5
  },
  {
    name: 'Maria Kowalski',
    from: 'Poland',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    text: 'Studying in London through GlobalEnglish was a life-changing experience. The cultural immersion and quality of education exceeded my expectations.',
    rating: 5
  }
];

const initialMessages: Message[] = [
  {
    text: "👋 Hi! I'm here to help you with any questions about our English courses. How can I assist you today?",
    isBot: true,
    timestamp: new Date()
  }
];

const faqs: FAQItem[] = [
  {
    question: "What visa requirements are needed to study English abroad?",
    answer: "Requirements vary by destination. Generally, you'll need: a valid passport, proof of enrollment in an accredited language school, proof of sufficient funds (usually 3-6 months of living expenses), and health insurance. We provide comprehensive visa assistance to ensure a smooth application process."
  },
  {
    question: "How long are the English courses?",
    answer: "We offer flexible course durations ranging from 2 weeks to 12 months. Intensive courses typically run for 4-12 weeks, while standard courses can be taken for any duration. Business English and exam preparation courses usually require a minimum commitment of 8-12 weeks for optimal results."
  },
  {
    question: "What accommodation options are available?",
    answer: "We offer various accommodation options including: homestays with local families, student residences, shared apartments, and private studios. All options are carefully vetted and located within easy reach of our schools. Homestays are particularly popular for full language immersion."
  },
  {
    question: "Can I work while studying?",
    answer: "Work possibilities depend on your visa type and destination country. Many student visas allow part-time work (usually 20 hours per week). Our student services team can provide detailed information about work rights and help with job searching in your chosen destination."
  },
  {
    question: "What level of English do I need to start?",
    answer: "We accept students at all levels, from complete beginners to advanced speakers. Before starting, you'll take a placement test to ensure you're placed in the appropriate level. Our courses follow the Common European Framework of Reference (CEFR) from A1 to C2 levels."
  }
];

const courseTypes = [
  {
    title: "General English",
    rating: 9.5,
    reviews: 226,
    pricePerWeek: 95,
    description:
        "Learn English at your own pace while making the most of your stay in Malta.",
    features: [
      { icon: "Clock", text: "20 classes of 45 min per week" },
      { icon: "Calendar", text: "You choose the number of weeks" },
      { icon: "Users", text: "15 students maximum per class" },
      { icon: "LineChart", text: "All levels" },
      { icon: "User", text: "From 16 to 99 years" },
    ],
  },
  {
    title: "Intensive English",
    rating: 9.2,
    reviews: 229,
    pricePerWeek: 189,
    description:
        "For those who want to learn faster. Combine exclusive Speaking classes with your General English course.",
    features: [
      { icon: "Clock", text: "30 classes of 45 min per week" },
      { icon: "Calendar", text: "You choose the number of weeks" },
      { icon: "Users", text: "15 students maximum per class" },
      { icon: "LineChart", text: "All levels" },
      { icon: "User", text: "From 16 to 99 years" },
    ],
  },
  {
    title: "English 30+",
    rating: 9.5,
    reviews: 190,
    pricePerWeek: 180,
    description: "For those who want to study with people of a similar age.",
    features: [
      { icon: "Clock", text: "20 or 30 classes per week" },
      { icon: "Calendar", text: "You choose the duration" },
      { icon: "Users", text: "15 students maximum per class" },
      { icon: "LineChart", text: "All levels" },
      { icon: "User", text: "From 30 years onwards" },
    ],
  },
  {
    title: "Business English",
    rating: 9.2,
    reviews: 195,
    pricePerWeek: 190,
    description:
        "For those looking to boost their professional career and access job opportunities worldwide.",
    features: [
      { icon: "Clock", text: "10, 20 or 30 classes per week" },
      { icon: "Calendar", text: "You choose the duration" },
      { icon: "Users", text: "Reduced groups" },
      { icon: "LineChart", text: "B1 level or higher" },
      { icon: "User", text: "From 18 years" },
    ],
  },
];


const HomePage: React.FC = () => {
  useEffect(() => {
    // GSAP animation for text and elements
    gsap.fromTo(
      ".animated-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50">
      <CartProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero
            title="Estudia inglés en Malta: Vive, Aprende trabaja y Crece"
            subtitle="Tu aventura comienza aquí: Te ayudamos con visado, viaje, estadía, trabajo y más para que aprendas inglés en Malta."
            bg_img="https://maltalovers.com/wp-content/uploads/2017/05/cropped-Valletta2-2.jpg"
            main_btn_text="Explore Courses"
            main_btn_link="#courses"
            secondary_btn_text="View Destinations"
            secondary_btn_link="#destinations"
        />
        <Services services={services} title={"Nuestro Servicios"} description={"Todo lo que necesitas para aprender inglés en el menor tiempo y al mejor costo"}/>
        <ServicesNoIcons services={servicesNoIcon}  title={"Why Choose GlobalEnglish?"} description={"Discover what sets us apart from other language schools"}/>
        <Advantages advantages={advantages} title={"Why Choose GlobalEnglish?"} description={"Discover what sets us apart from other language schools"}/>
        <Features features={features} title={"Titulo"} description={"description"}/>
        <CourseTypes courses={courseTypes} title={"Test"} description={"test"}></CourseTypes>
        <Gallery images={galleryImages} autoPlayInterval={5000} title={"Campus Life Gallery"} description={"Take a visual tour of our facilities and student activities"}/>
        <Destinations destinations={destinations} title={"Popular Destinations"} description={"Choose from our carefully selected locations worldwide"}/>
        <Courses courses={courses} title={"Our Courses"} description={"Find the perfect course to match your goals"}/>
        <Videos videos={videos}  title={"Our Courses"} description={"Find the perfect course to match your goals"}/>
        <Testimonials testimonials={testimonials}  title={"Our Courses"} description={"Find the perfect course to match your goals"}/>
        <FAQ faqs={faqs} title={"Our Courses"} description={"Find the perfect course to match your goals"}/>
        <Contact />
        <Chatbot initialMessages={initialMessages}/>
        <Cart />
      </div>
    </CartProvider>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="text-sm">
            © 2024 Learn English. All Rights Reserved.
          </p>
          <nav className="flex justify-center space-x-6">
            <a href="@/src/components/HomePage/HomePage#home" className="hover:text-yellow-400">Home</a>
            <a href="@/src/components/HomePage/HomePage#courses" className="hover:text-yellow-400">Courses</a>
            <a href="@/src/components/HomePage/HomePage#contact" className="hover:text-yellow-400">Contact Us</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
