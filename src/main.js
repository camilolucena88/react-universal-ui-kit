"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var App_1 = require("./components/App/App");
var Button_1 = require("./components/Button/Button");
var GroupPrices_1 = require("./components/Prices/Group/GroupPrices");
require("../styles/globals.css");
var SlidingSummary_1 = require("./components/Prices/Summary/SlidingSummary");
var Modal_1 = require("./components/Modal/Modal");
var HomePage_1 = require("./components/HomePage/HomePage");
var Hero_1 = require("./components/HomePage/Hero");
var ServicesNoIcons_1 = require("./components/HomePage/ServicesNoIcons");
var Advantages_1 = require("./components/HomePage/Advantages");
var Features_1 = require("./components/HomePage/Features");
var Gallery_1 = require("./components/HomePage/Gallery");
var Destinations_1 = require("./components/HomePage/Destinations");
var Courses_1 = require("./components/HomePage/Courses");
var CartContext_1 = require("./components/HomePage/context/CartContext");
var Cart_1 = require("./components/HomePage/Cart");
var Videos_1 = require("./components/HomePage/Videos");
var Testimonials_1 = require("./components/HomePage/Testimonials");
var FAQ_1 = require("./components/HomePage/FAQ");
var Chatbot_1 = require("./components/HomePage/Chatbot");
var Services_1 = require("./components/HomePage/Services");
var CourseTypes_1 = require("./components/HomePage/CourseTypes");
var JobListing_1 = require("./components/JobListing/JobListing");
var Footer_1 = require("./components/JobListing/components/Footer");
var Navbar_1 = require("./components/JobListing/components/Navbar");
var Banner_1 = require("./components/JobListing/components/Banner");
var Listing_1 = require("./components/GenericListing/Listing");
// Rendering a unique component
var uniqueElement = document.getElementById('app');
if (uniqueElement) {
    react_dom_1.default.render(<App_1.default />, uniqueElement);
}
// Rendering repeatable components by class or data attribute
var repeatableElements = document.querySelectorAll('.button-component');
repeatableElements.forEach(function (element) {
    var dataName = element.getAttribute('data-name');
    react_dom_1.default.render(<Button_1.default dataName={dataName}/>, element);
});
var elements = document.querySelectorAll('.modal-component');
elements.forEach(function (element) {
    var _a, _b, _c;
    var containerId = element.id;
    // Extract content from the modal before rendering the React component
    var title = ((_a = element.querySelector('.title')) === null || _a === void 0 ? void 0 : _a.innerHTML) || '';
    var description = ((_b = element.querySelector('.description')) === null || _b === void 0 ? void 0 : _b.innerHTML) || '';
    var footer = ((_c = element.querySelector('.footer')) === null || _c === void 0 ? void 0 : _c.innerHTML) || '';
    // Render the React component with content as props
    react_dom_1.default.render(<Modal_1.CustomModal containerId={containerId} title={title} description={description} footer={footer}/>, element);
});
// Rendering repeatable components by class or data attribute
var groupPrices = document.querySelectorAll('.group-prices-component');
groupPrices.forEach(function (groupPrice) {
    var _a;
    var dataIds = groupPrice.getAttribute('data-ids').split(',');
    var lang = groupPrice.getAttribute('data-lang');
    var tabTitle = groupPrice.getAttribute('data-title');
    var url = groupPrice.getAttribute('data-url') || window.location.origin || "http://localhost:8000";
    var buttonMsg = groupPrice.getAttribute('data-btn-msg') || "Learn More";
    var tabTitles = ((_a = groupPrice.getAttribute('data-tab-titles')) === null || _a === void 0 ? void 0 : _a.split(',')) || ["Main Tab", "Secondary Tab"];
    var groupSize = Math.ceil(dataIds.length / tabTitles.length);
    var groupedIds = [];
    for (var i = 0; i < dataIds.length; i += groupSize) {
        groupedIds.push(dataIds.slice(i, i + groupSize).join(','));
    }
    react_dom_1.default.render(<GroupPrices_1.default groupedIds={groupedIds} // Pass grouped IDs
     tabTitles={tabTitles} // Pass tab titles
     lang={lang} url={url} PromotionsTitle={tabTitle} buttonMsg={buttonMsg}/>, groupPrice);
});
var slidingElements = document.querySelectorAll('.sliding-summary-component');
slidingElements.forEach(function (element) {
    var containerId = element.id;
    // Extract items as JSON data attribute
    var itemsData = element.getAttribute('data-items');
    var items = itemsData ? JSON.parse(itemsData) : [];
    // Observer for 'data-open' attribute changes
    var observer = new MutationObserver(function () {
        var isOpen = element.getAttribute('data-open') === 'true';
        react_dom_1.default.render(<SlidingSummary_1.default isOpen={isOpen} items={items}/>, element);
    });
    observer.observe(element, { attributes: true, attributeFilter: ['data-open'] });
    // Initial render
    var isOpen = element.getAttribute('data-open') === 'true';
    react_dom_1.default.render(<SlidingSummary_1.default isOpen={isOpen} items={items}/>, element);
});
var headerItems = document.querySelectorAll('.home-page-component');
headerItems.forEach(function (header) {
    react_dom_1.default.render(<HomePage_1.default />, header);
});
var heroElements = document.querySelectorAll('.hero-component');
heroElements.forEach(function (element) {
    var title = element.getAttribute('data-title');
    var subtitle = element.getAttribute('data-subtitle');
    var bgImg = element.getAttribute('data-bg-img');
    var mainBtnText = element.getAttribute('data-main-btn-text');
    var mainBtnLink = element.getAttribute('data-main-btn-link');
    var secondaryBtnText = element.getAttribute('data-secondary-btn-text');
    var secondaryBtnLink = element.getAttribute('data-secondary-btn-link');
    react_dom_1.default.render(<Hero_1.default title={title || ''} subtitle={subtitle || ''} bg_img={bgImg || ''} main_btn_text={mainBtnText || ''} main_btn_link={mainBtnLink || ''} secondary_btn_text={secondaryBtnText || ''} secondary_btn_link={secondaryBtnLink || ''}/>, element);
});
var coursesElement = document.querySelector(".courses-component");
if (coursesElement) {
    var title = coursesElement.getAttribute("data-title");
    var description = coursesElement.getAttribute("data-description");
    var courses = Array.from(coursesElement.querySelectorAll(".course")).map(function (element) {
        var _a;
        var id = element.getAttribute("data-id");
        var title = element.getAttribute("data-title");
        var type = element.getAttribute("data-type");
        var duration = element.getAttribute("data-duration");
        var level = element.getAttribute("data-level");
        var description = element.getAttribute("data-description");
        var price = parseFloat((_a = element.getAttribute("data-price")) !== null && _a !== void 0 ? _a : "0");
        return { id: id, title: title, type: type, duration: duration, level: level, description: description, price: price };
    });
    react_dom_1.default.render(<CartContext_1.CartProvider>
        <Courses_1.default courses={courses} title={title} description={description}/>
        <Cart_1.default />
      </CartContext_1.CartProvider>, document.querySelector(".courses-component"));
}
// Select the Chatbot component element
var chatbotElement = document.querySelector(".chatbot-component");
if (chatbotElement) {
    // Extract the initial messages data from the DOM attributes (if any)
    var initialMessages = Array.from((chatbotElement === null || chatbotElement === void 0 ? void 0 : chatbotElement.querySelectorAll(".chatbot-message")) || []).map(function (element) {
        var text = element.getAttribute("data-text");
        var isBot = element.getAttribute("data-is-bot") === "true";
        var timestamp = new Date(element.getAttribute("data-timestamp") || "");
        return { text: text, isBot: isBot, timestamp: timestamp };
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
    react_dom_1.default.render(<Chatbot_1.default initialMessages={initialMessages}/>, document.querySelector(".chatbot-component"));
}
renderMultiple('.faq-component', FAQ_1.default, function (el) { return ({
    title: el.getAttribute('data-title') || '',
    description: el.getAttribute('data-description') || '',
    faqs: Array.from(el.querySelectorAll('.faq-item')).map(function (faqEl) { return ({
        question: faqEl.getAttribute('data-question') || '',
        answer: faqEl.getAttribute('data-answer') || '',
    }); }),
}); });
renderMultiple('.videos-component', Videos_1.default, function (el) { return ({
    title: el.getAttribute('data-title') || '',
    description: el.getAttribute('data-description') || '',
    videos: Array.from(el.querySelectorAll('.video')).map(function (videoEl) { return ({
        thumbnail: videoEl.getAttribute('data-thumbnail') || '',
        title: videoEl.getAttribute('data-title') || '',
        duration: videoEl.getAttribute('data-duration') || '',
        description: videoEl.getAttribute('data-description') || '',
    }); }),
}); });
renderMultiple('.testimonials-component', Testimonials_1.default, function (el) { return ({
    title: el.getAttribute('data-title') || '',
    description: el.getAttribute('data-description') || '',
    testimonials: Array.from(el.querySelectorAll('.testimonial')).map(function (testimonialEl) { return ({
        name: testimonialEl.getAttribute('data-name') || '',
        from: testimonialEl.getAttribute('data-from') || '',
        image: testimonialEl.getAttribute('data-image') || '',
        text: testimonialEl.getAttribute('data-text') || '',
        rating: Number(testimonialEl.getAttribute('data-rating')) || 0,
    }); }),
}); });
renderMultiple('.destinations-component', Destinations_1.default, function (el) { return ({
    title: el.getAttribute('data-title') || 'Campus Life Gallery',
    description: el.getAttribute('data-description') || 'Take a visual tour of our facilities and student activities',
    destinations: Array.from(el.querySelectorAll('.destination')).map(function (destinationEl) { return ({
        name: destinationEl.getAttribute('data-name') || '',
        image: destinationEl.getAttribute('data-image') || '',
        description: destinationEl.getAttribute('data-description') || '',
    }); }),
}); });
renderMultiple('.features-component', Features_1.default, function (el) { return ({
    title: el.getAttribute('data-title') || 'Campus Life Gallery',
    description: el.getAttribute('data-description') || 'Take a visual tour of our facilities and student activities',
    features: Array.from(el.querySelectorAll('.feature')).map(function (destinationEl) { return ({
        title: destinationEl.getAttribute('data-name') || '',
        description: destinationEl.getAttribute('data-description') || '',
        image: destinationEl.getAttribute('data-image') || '',
        imageAlt: destinationEl.getAttribute('data-image-alt') || '',
    }); }),
}); });
renderMultiple('.gallery-component', Gallery_1.default, function (el) { return ({
    autoPlayInterval: Number(el.getAttribute('data-auto-play-interval')) || 5000,
    images: Array.from(el.querySelectorAll('.gallery-image')).map(function (imageEl) { return ({
        url: imageEl.getAttribute('data-url') || '',
        alt: imageEl.getAttribute('data-alt') || '',
        caption: imageEl.getAttribute('data-caption') || '',
    }); }),
    title: el.getAttribute('data-title') || 'Campus Life Gallery',
    description: el.getAttribute('data-description') || 'Take a visual tour of our facilities and student activities',
}); });
renderMultiple('.services-with-icon-component', Services_1.default, function (el) { return ({
    title: el.getAttribute('data-title') || 'Our Services',
    description: el.getAttribute('data-description') || 'Learn English in the shortest time at the best cost',
    services: Array.from(el.querySelectorAll('.service')).map(function (serviceEl) { return ({
        icon: serviceEl.getAttribute('data-icon') || '',
        title: serviceEl.getAttribute('data-title') || '',
        description: serviceEl.getAttribute('data-description') || '',
    }); }),
}); });
renderMultiple('.advantages-component', Advantages_1.default, function (el) { return ({
    title: el.getAttribute('data-title') || 'Why Choose Us?',
    description: el.getAttribute('data-description') || 'Discover the benefits of choosing our services.',
    advantages: Array.from(el.querySelectorAll('.advantage')).map(function (advEl) { return ({
        icon: advEl.getAttribute('data-icon') || '',
        title: advEl.getAttribute('data-title') || '',
        description: advEl.getAttribute('data-description') || '',
        ctaText: advEl.getAttribute('data-cta-text') || '',
        ctaLink: advEl.getAttribute('data-cta-link') || '',
    }); }),
}); });
renderMultiple('.services-component', ServicesNoIcons_1.default, function (el) { return ({
    title: el.getAttribute('data-title') || 'Our Services',
    description: el.getAttribute('data-description') || 'Learn English in the shortest time at the best cost',
    showBtn: el.getAttribute('data-show-btn') || 'Show more',
    hideBtn: el.getAttribute('data-hide-btn') || 'Hide',
    featuresBtn: el.getAttribute('data-features-btn') || 'What we offer:',
    services: Array.from(el.querySelectorAll('.service')).map(function (serviceEl) { return ({
        title: serviceEl.getAttribute('data-title') || '',
        shortDescription: serviceEl.getAttribute('data-short-description') || '',
        fullDescription: serviceEl.getAttribute('data-full-description') || '',
        features: (serviceEl.getAttribute('data-features') || '').split(','),
    }); }),
}); });
// Select and render CourseTypes components
renderMultiple('.course-types-component', CourseTypes_1.default, function (el) { return ({
    title: el.getAttribute('data-title') || 'Available Courses',
    description: el.getAttribute('data-description') || 'Choose the best course for you.',
    priceLabel: el.getAttribute('data-price-label') || 'From',
    currencySymbol: el.getAttribute('data-currency-symbol') || '€',
    perDurationLabel: el.getAttribute('data-per-duration-label') || '/week',
    reviewsText: el.getAttribute('data-reviews-text') || 'reviews',
    courses: Array.from(el.querySelectorAll('.course')).map(function (courseEl) { return ({
        title: courseEl.getAttribute('data-title') || '',
        rating: parseFloat(courseEl.getAttribute('data-rating')) || 0,
        reviews: parseInt(courseEl.getAttribute('data-reviews'), 10) || 0,
        pricePerWeek: parseInt(courseEl.getAttribute('data-price-per-week'), 10) || 0,
        description: courseEl.getAttribute('data-description') || '',
        features: Array.from(courseEl.querySelectorAll('.feature')).map(function (featureEl) { return ({
            icon: featureEl.getAttribute('data-icon') || '',
            text: featureEl.getAttribute('data-text') || '',
        }); }),
    }); }),
}); });
function renderMultiple(selector, Component, extractProps, defaultProps) {
    if (defaultProps === void 0) { defaultProps = {}; }
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        var props = extractProps(element);
        renderComponent(Component, element, __assign(__assign({}, defaultProps), props));
    });
}
function renderComponent(Component, container, props) {
    if (props === void 0) { props = {}; }
    if (container) {
        react_dom_1.default.render(<Component {...props}/>, container);
    }
}
renderMultiple(".component-job-listing", JobListing_1.default, function (el) { return ({
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
}); });
renderMultiple(".footer-component", Footer_1.default, function (el) {
    return {
        title: el.getAttribute("data-title") || "Footer",
        description: el.getAttribute("data-description") || "This is the footer component",
        links: Array.from(el.querySelectorAll(".footer-section")).map(function (sectionEl) {
            return Array.from(sectionEl.querySelectorAll(".footer-link")).map(function (linkEl) { return ({
                text: linkEl.getAttribute("data-text") || "Link",
                url: linkEl.getAttribute("data-url") || "#",
            }); });
        }),
    };
});
renderMultiple(".navbar-component", Navbar_1.default, function (el) {
    return {
        logo: el.getAttribute("data-logo") || "",
        buttonText: el.getAttribute("data-button-text") || "Post a Job",
        buttonUrl: el.getAttribute("data-button-url") || "/post-job",
        links: Array.from(el.querySelectorAll(".navbar-link")).map(function (linkEl) { return ({
            text: linkEl.getAttribute("data-text") || "Link",
            url: linkEl.getAttribute("data-url") || "#",
        }); }),
    };
});
renderMultiple(".banner-component", Banner_1.default, function (el) { return ({
    position: el.getAttribute("data-position"),
    url: el.getAttribute("data-url") || "",
    link: el.getAttribute("data-link") || "#",
    alt: el.getAttribute("data-alt") || "Banner",
}); });
renderMultiple(".listing-component", Listing_1.default, function (el) { return ({
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
}); });
