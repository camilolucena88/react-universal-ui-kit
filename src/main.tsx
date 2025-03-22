import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App/App";
import Button from "./components/Button/Button";
import GroupPrices from "./components/Prices/Group/GroupPrices";
import '../styles/globals.css';
import SlidingSummary from "./components/Prices/Summary/SlidingSummary";
import {CustomModal} from "./components/Modal/Modal";
import HomePage from "./components/HomePage/HomePage";
import Hero from "./components/HomePage/Hero";
import ServicesNoIcons from "./components/HomePage/ServicesNoIcons"
import Advantages from "./components/HomePage/Advantages";
import Features from "./components/HomePage/Features";
import Gallery from "./components/HomePage/Gallery";
import Destinations from "./components/HomePage/Destinations";
import Courses from "./components/HomePage/Courses";
import {CartProvider} from "./components/HomePage/context/CartContext";
import Cart from "./components/HomePage/Cart";
import Videos from "./components/HomePage/Videos";
import Testimonials from "./components/HomePage/Testimonials";
import FAQ from "./components/HomePage/FAQ";
import Chatbot from "./components/HomePage/Chatbot";
import Services from "./components/HomePage/Services";
import CourseTypes from "./components/HomePage/CourseTypes";
import JobListings from "./components/JobListing/JobListing";
import Footer from "./components/JobListing/components/Footer";
import Navbar from './components/JobListing/components/Navbar';
import Banner from "./components/JobListing/components/Banner";
import Listing from "./components/GenericListing/Listing";



// Rendering a unique component
const uniqueElement = document.getElementById('app');
if (uniqueElement) {
  ReactDOM.render(<App />, uniqueElement);
}

// Rendering repeatable components by class or data attribute
const repeatableElements = document.querySelectorAll('.button-component');
repeatableElements.forEach((element) => {
  const dataName = element.getAttribute('data-name');
  ReactDOM.render(<Button dataName={dataName} />, element);
});

const elements = document.querySelectorAll('.modal-component');
elements.forEach((element) => {
  const containerId = element.id;

  // Extract content from the modal before rendering the React component
  const title = element.querySelector('.title')?.innerHTML || '';
  const description = element.querySelector('.description')?.innerHTML || '';
  const footer = element.querySelector('.footer')?.innerHTML || '';

  // Render the React component with content as props
  ReactDOM.render(
    <CustomModal
      containerId={containerId}
      title={title}
      description={description}
      footer={footer}
    />,
    element
  );
});


// Rendering repeatable components by class or data attribute
const groupPrices = document.querySelectorAll('.group-prices-component');
groupPrices.forEach((groupPrice) => {
  const dataIds = groupPrice.getAttribute('data-ids').split(',');
  const lang = groupPrice.getAttribute('data-lang');
  const tabTitle = groupPrice.getAttribute('data-title');
  const url = groupPrice.getAttribute('data-url') || window.location.origin || "http://localhost:8000";
  const buttonMsg = groupPrice.getAttribute('data-btn-msg') || "Learn More";
  const tabTitles = groupPrice.getAttribute('data-tab-titles')?.split(',') || ["Main Tab", "Secondary Tab"];

  const groupSize = Math.ceil(dataIds.length / tabTitles.length);
  const groupedIds = [];
  for (let i = 0; i < dataIds.length; i += groupSize) {
    groupedIds.push(dataIds.slice(i, i + groupSize).join(','));
  }

  ReactDOM.render(<GroupPrices
      groupedIds={groupedIds} // Pass grouped IDs
      tabTitles={tabTitles}   // Pass tab titles
      lang={lang}
      url={url}
      PromotionsTitle={tabTitle}
      buttonMsg={buttonMsg}
  />, groupPrice);
});

  const slidingElements = document.querySelectorAll('.sliding-summary-component');
  slidingElements.forEach((element) => {
    const containerId = element.id;

    // Extract items as JSON data attribute
    const itemsData = element.getAttribute('data-items');
    const items = itemsData ? JSON.parse(itemsData) : [];

    // Observer for 'data-open' attribute changes
    const observer = new MutationObserver(() => {
      const isOpen = element.getAttribute('data-open') === 'true';

      ReactDOM.render(
        <SlidingSummary isOpen={isOpen} items={items} />,
        element
      );
    });

    observer.observe(element, { attributes: true, attributeFilter: ['data-open'] });

    // Initial render
    const isOpen = element.getAttribute('data-open') === 'true';
    ReactDOM.render(
      <SlidingSummary isOpen={isOpen} items={items} />,
      element
    );
  });

const headerItems = document.querySelectorAll('.home-page-component');
headerItems.forEach( header => {
  ReactDOM.render(<HomePage />, header);
})

const heroElements = document.querySelectorAll('.hero-component');

heroElements.forEach((element) => {
  const title = element.getAttribute('data-title');
  const subtitle = element.getAttribute('data-subtitle');
  const bgImg = element.getAttribute('data-bg-img');
  const mainBtnText = element.getAttribute('data-main-btn-text');
  const mainBtnLink = element.getAttribute('data-main-btn-link');
  const secondaryBtnText = element.getAttribute('data-secondary-btn-text');
  const secondaryBtnLink = element.getAttribute('data-secondary-btn-link');

  ReactDOM.render(
    <Hero
      title={title || ''}
      subtitle={subtitle || ''}
      bg_img={bgImg || ''}
      main_btn_text={mainBtnText || ''}
      main_btn_link={mainBtnLink || ''}
      secondary_btn_text={secondaryBtnText || ''}
      secondary_btn_link={secondaryBtnLink || ''}
    />,
    element
  );
});

const coursesElement = document.querySelector(".courses-component");
if (coursesElement) {
  const title = coursesElement.getAttribute("data-title");
  const description = coursesElement.getAttribute("data-description");
  const courses = Array.from(
      coursesElement.querySelectorAll(".course")
  ).map((element) => {
    const id = element.getAttribute("data-id");
    const title = element.getAttribute("data-title");
    const type = element.getAttribute("data-type");
    const duration = element.getAttribute("data-duration");
    const level = element.getAttribute("data-level");
    const description = element.getAttribute("data-description");
    const price = parseFloat(element.getAttribute("data-price"));

    return {id, title, type, duration, level, description, price};
  });

  ReactDOM.render(
      <CartProvider>
        <Courses courses={courses} title={title} description={description}/>
        <Cart/>
      </CartProvider>,
      document.querySelector(".courses-component")
  );
}
// Select the Chatbot component element
const chatbotElement = document.querySelector(".chatbot-component");
if (chatbotElement) {
  // Extract the initial messages data from the DOM attributes (if any)
  const initialMessages: { text: string, isBot: boolean, timestamp: Date }[] = Array.from(
    chatbotElement?.querySelectorAll(".chatbot-message") || []
  ).map((element) => {
    const text = element.getAttribute("data-text");
    const isBot = element.getAttribute("data-is-bot") === "true";
    const timestamp = new Date(element.getAttribute("data-timestamp") || "");

    return { text, isBot, timestamp };
  });

  // If no messages were extracted, use the default initial message
  if (initialMessages.length === 0) {
    initialMessages.push({
      text: "👋 Hi! I'm here to help you with any questions about our English courses. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    });
  }

  // Render the Chatbot component with the fetched initial messages
  ReactDOM.render(
    <Chatbot initialMessages={initialMessages} />,
    document.querySelector(".chatbot-component")
  );
}
renderMultiple('.faq-component', FAQ, (el) => ({
  title: el.getAttribute('data-title') || '',
  description: el.getAttribute('data-description') || '',
  faqs: Array.from(el.querySelectorAll('.faq-item')).map((faqEl) => ({
    question: faqEl.getAttribute('data-question') || '',
    answer: faqEl.getAttribute('data-answer') || '',
  })),
}));

renderMultiple('.videos-component', Videos, (el) => ({
  title: el.getAttribute('data-title') || '',
  description: el.getAttribute('data-description') || '',
  videos: Array.from(el.querySelectorAll('.video')).map((videoEl) => ({
    thumbnail: videoEl.getAttribute('data-thumbnail') || '',
    title: videoEl.getAttribute('data-title') || '',
    duration: videoEl.getAttribute('data-duration') || '',
    description: videoEl.getAttribute('data-description') || '',
  })),
}));

renderMultiple('.testimonials-component', Testimonials, (el) => ({
  title: el.getAttribute('data-title') || '',
  description: el.getAttribute('data-description') || '',
  testimonials: Array.from(el.querySelectorAll('.testimonial')).map((testimonialEl) => ({
    name: testimonialEl.getAttribute('data-name') || '',
    from: testimonialEl.getAttribute('data-from') || '',
    image: testimonialEl.getAttribute('data-image') || '',
    text: testimonialEl.getAttribute('data-text') || '',
    rating: Number(testimonialEl.getAttribute('data-rating')) || 0,
  })),
}));

renderMultiple('.destinations-component', Destinations, (el) => ({
  title: el.getAttribute('data-title') || 'Campus Life Gallery',
  description: el.getAttribute('data-description') || 'Take a visual tour of our facilities and student activities',
  destinations: Array.from(el.querySelectorAll('.destination')).map((destinationEl) => ({
    name: destinationEl.getAttribute('data-name') || '',
    image: destinationEl.getAttribute('data-image') || '',
    description: destinationEl.getAttribute('data-description') || '',
  })),
}));

renderMultiple('.features-component', Features, (el) => ({
  title: el.getAttribute('data-title') || 'Campus Life Gallery',
  description: el.getAttribute('data-description') || 'Take a visual tour of our facilities and student activities',
  features: Array.from(el.querySelectorAll('.feature')).map((destinationEl) => ({
    title: destinationEl.getAttribute('data-name') || '',
    description: destinationEl.getAttribute('data-description') || '',
    image: destinationEl.getAttribute('data-image') || '',
    imageAlt: destinationEl.getAttribute('data-image-alt') || '',
  })),
}));

renderMultiple('.gallery-component', Gallery, (el) => ({
  autoPlayInterval: Number(el.getAttribute('data-auto-play-interval')) || 5000,
  images: Array.from(el.querySelectorAll('.gallery-image')).map((imageEl) => ({
    url: imageEl.getAttribute('data-url') || '',
    alt: imageEl.getAttribute('data-alt') || '',
    caption: imageEl.getAttribute('data-caption') || '',
  })),
  title: el.getAttribute('data-title') || 'Campus Life Gallery',
  description: el.getAttribute('data-description') || 'Take a visual tour of our facilities and student activities',
}));

renderMultiple('.services-with-icon-component', Services, (el) => ({
  title: el.getAttribute('data-title') || 'Our Services',
  description: el.getAttribute('data-description') || 'Learn English in the shortest time at the best cost',
  services: Array.from(el.querySelectorAll('.service')).map((serviceEl) => ({
    icon: serviceEl.getAttribute('data-icon') || '',
    title: serviceEl.getAttribute('data-title') || '',
    description: serviceEl.getAttribute('data-description') || '',
  })),
}));

renderMultiple('.advantages-component', Advantages, (el) => ({
  title: el.getAttribute('data-title') || 'Why Choose Us?',
  description: el.getAttribute('data-description') || 'Discover the benefits of choosing our services.',
  advantages: Array.from(el.querySelectorAll('.advantage')).map((advEl) => ({
    icon: advEl.getAttribute('data-icon') || '',
    title: advEl.getAttribute('data-title') || '',
    description: advEl.getAttribute('data-description') || '',
    ctaText: advEl.getAttribute('data-cta-text') || '',
    ctaLink: advEl.getAttribute('data-cta-link') || '',
  })),
}));

renderMultiple('.services-component', ServicesNoIcons, (el) => ({
  title: el.getAttribute('data-title') || 'Our Services',
  description: el.getAttribute('data-description') || 'Learn English in the shortest time at the best cost',
  showBtn: el.getAttribute('data-show-btn') || 'Show more',
  hideBtn: el.getAttribute('data-hide-btn') || 'Hide',
  featuresBtn: el.getAttribute('data-features-btn') || 'What we offer:',
  services: Array.from(el.querySelectorAll('.service')).map((serviceEl) => ({
    title: serviceEl.getAttribute('data-title') || '',
    shortDescription: serviceEl.getAttribute('data-short-description') || '',
    fullDescription: serviceEl.getAttribute('data-full-description') || '',
    features: (serviceEl.getAttribute('data-features') || '').split(','),
  })),
}));

// Select and render CourseTypes components
renderMultiple('.course-types-component', CourseTypes, (el) => ({
  title: el.getAttribute('data-title') || 'Available Courses',
  description: el.getAttribute('data-description') || 'Choose the best course for you.',
  priceLabel: el.getAttribute('data-price-label') || 'From',
  currencySymbol: el.getAttribute('data-currency-symbol') || '€',
  perDurationLabel: el.getAttribute('data-per-duration-label') || '/week',
  reviewsText: el.getAttribute('data-reviews-text') || 'reviews',
  courses: Array.from(el.querySelectorAll('.course')).map((courseEl) => ({
    title: courseEl.getAttribute('data-title') || '',
    rating: parseFloat(courseEl.getAttribute('data-rating')) || 0,
    reviews: parseInt(courseEl.getAttribute('data-reviews'), 10) || 0,
    pricePerWeek: parseInt(courseEl.getAttribute('data-price-per-week'), 10) || 0,
    description: courseEl.getAttribute('data-description') || '',
    features: Array.from(courseEl.querySelectorAll('.feature')).map((featureEl) => ({
      icon: featureEl.getAttribute('data-icon') || '',
      text: featureEl.getAttribute('data-text') || '',
    })),
  })),
}));

function renderMultiple(selector, Component, extractProps, defaultProps = {}) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    const props = extractProps(element);
    renderComponent(Component, element, { ...defaultProps, ...props });
  });
}

function renderComponent(Component, container, props = {}) {
  if (container) {
    ReactDOM.render(<Component {...props} />, container);
  }
}


renderMultiple(".component-job-listing", JobListings, (el) => ({
  apiUrl: el.getAttribute("data-api-url") || "http://localhost:5000/api",
  itemsPerPage: parseInt(el.getAttribute("data-items-per-page")) || 12,
  filterKeys: el.getAttribute("data-filters") ? el.getAttribute("data-filters").split(",") : ["company", "city", "company_type", "country", "department"],
  enableSearch: el.getAttribute("data-enable-search") === "true",
  enablePagination: el.getAttribute("data-enable-pagination") === "true",
  enableMobileFilter: el.getAttribute("data-enable-mobile-filter") === "true",
  banners: {
    top: {
      enabled: el.getAttribute("data-banner-top") === "true",
      url: el.getAttribute("data-banner-top-url"),
      alt: el.getAttribute("data-banner-top-alt") || "Job Listing Banner",
      link: el.getAttribute("data-banner-top-link"),
    },
    bottom: {
      enabled: el.getAttribute("data-banner-bottom") === "true",
      url: el.getAttribute("data-banner-bottom-url"),
      alt: el.getAttribute("data-banner-bottom-alt") || "Job Listing Banner",
      link: el.getAttribute("data-banner-bottom-link"),
    },
    sidebar: {
      enabled: el.getAttribute("data-banner-sidebar") === "true",
      url: el.getAttribute("data-banner-sidebar-url"),
      alt: el.getAttribute("data-banner-sidebar-alt") || "Job Listing Sidebar Banner",
      link: el.getAttribute("data-banner-sidebar-link"),
    },
  }
}));

renderMultiple(".footer-component", Footer, (el) => {
  return {
    title: el.getAttribute("data-title") || "Footer",
    description: el.getAttribute("data-description") || "This is the footer component",
    links: Array.from(el.querySelectorAll(".footer-section")).map((sectionEl) =>
        Array.from(sectionEl.querySelectorAll(".footer-link")).map((linkEl) => ({
          text: linkEl.getAttribute("data-text") || "Link",
          url: linkEl.getAttribute("data-url") || "#",
        }))
    ),
  }
});

renderMultiple(".navbar-component", Navbar, (el) => {
  return {
    logo: el.getAttribute("data-logo") || "",
    buttonText: el.getAttribute("data-button-text") || "Post a Job",
    buttonUrl: el.getAttribute("data-button-url") || "/post-job",
    links: Array.from(el.querySelectorAll(".navbar-link")).map((linkEl) => ({
      text: linkEl.getAttribute("data-text") || "Link",
      url: linkEl.getAttribute("data-url") || "#",
    })),
  }
});

renderMultiple(".banner-component", Banner, (el) => ({
  position: el.getAttribute("data-position") as "top" | "bottom" | "sidebar",
  url: el.getAttribute("data-url") || "",
  link: el.getAttribute("data-link") || "#",
  alt: el.getAttribute("data-alt") || "Banner",
}));

renderMultiple(".listing-component", Listing, (el) => ({
  apiUrl: el.getAttribute("data-api-url") || "/api/jobs",
  itemsPerPage: parseInt(el.getAttribute("data-items-per-page") || "10"),
  filterKeys: (el.getAttribute("data-filters") || "company,city,department").split(","),
  enableSearch: el.getAttribute("data-enable-search") === "false",
  enablePagination: el.getAttribute("data-enable-pagination") === "false",
  enableMobileFilter: el.getAttribute("data-enable-mobile-filter") === "false",
  banner: {
    sidebar: {
      enabled: el.getAttribute("data-banner-sidebar") === "true",
      url: el.getAttribute("data-banner-sidebar-url") || "",
      link: el.getAttribute("data-banner-sidebar-link") || "#",
      alt: el.getAttribute("data-banner-sidebar-alt") || "Banner",
    },
  },
  cardType: el.getAttribute("data-card-type") || "job",
}))
