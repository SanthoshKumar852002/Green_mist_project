
import React, { Suspense } from "react";
import SEOHead from "../components/SEOHead";
import LocalSEOData, { ServiceAreaSchema } from "../components/LocalSEO";
import VoiceSearchContent from "../components/VoiceSearchContent";
import EntityContent from "../components/EntityContent";
import { getLocalBusinessSchema, getServiceSchema, getFAQSchema, getOrganizationSchema, getBreadcrumbSchema } from "../utils/structuredData";
import { useTranslation } from '../utils/i18n';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';

const HomeContent = React.lazy(() => import('./HomeContent'));

const Home = ({ lang, onSelectLang }) => {
    const { t } = useTranslation(lang);

    // SEO location data with correct coordinates
    const seoLocation = {
        region: "IN-TN",
        placename: "Tiruchengode, Tamil Nadu, India",
        position: "11.3269331;78.00271943"
    };

    // Business info for LocalSEO component
    const businessInfo = {
        name: "GREENMIST Agriculture Drone",
        url: "https://greenmist.net",
        email: "contact@greenmist.net",
        priceRange: "₹₹",
        images: [
            "https://greenmist.net/images/og-image.jpg"
        ],
        phones: ["+91 78999 78869", "+91 91503 95864", "+91 90039 92693"],
        address: {
            street: "Manickampalayam",
            city: "Tiruchengode",
            state: "Tamil Nadu",
            postalCode: "637202",
            country: "IN"
        },
        geo: {
            lat: 11.3269331,
            lng: 78.00271943
        },
        hours: [
            { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "06:00", closes: "18:00" }
        ],
        serviceAreas: [
            "Tiruchengode", "Namakkal", "Salem", "Erode", "Karur",
            "Coimbatore", "Madurai", "Tiruchirappalli", "Dindigul",
            "Thanjavur", "Chennai", "Vellore", "Tirunelveli"
        ],
        rating: {
            value: 4.8,
            count: 127
        }
    };

    // Service areas for ServiceAreaSchema
    const serviceAreas = [
        { name: "Chennai", state: "Tamil Nadu" },
        { name: "Coimbatore", state: "Tamil Nadu" },
        { name: "Madurai", state: "Tamil Nadu" },
        { name: "Tiruchirappalli", state: "Tamil Nadu" },
        { name: "Salem", state: "Tamil Nadu" },
        { name: "Tirunelveli", state: "Tamil Nadu" },
        { name: "Erode", state: "Tamil Nadu" },
        { name: "Vellore", state: "Tamil Nadu" },
        { name: "Thanjavur", state: "Tamil Nadu" },
        { name: "Dindigul", state: "Tamil Nadu" }
    ];

    // SEO configurations
    const seoConfig = {
        en: {
            title: "Green Mist - #1 Agricultural Drone Services in Tamil Nadu | Precision Farming",
            description: "Transform your farming with Green Mist's professional drone services. Crop spraying, health monitoring, pest control & field mapping. 50+ acres/day coverage. Call: 78999 78869",
            keywords: "agricultural drone services Tamil Nadu, drone spraying near me, precision farming India, crop monitoring drones, pest control drone services, farm drone spraying, smart agriculture Tamil Nadu, drone agriculture services Chennai, drone spraying cost per acre, agricultural drone price"
        },
        ta: {
            title: "கிரீன் மிஸ்ட் - தமிழ்நாட்டில் #1 வேளாண் ட்ரோன் சேவைகள் | துல்லிய விவசாயம்",
            description: "கிரீன் மிஸ்ட்டின் தொழில்முறை ட்ரோன் சேவைகளுடன் உங்கள் விவசாயத்தை மாற்றுங்கள். பயிர் தெளிப்பு, ஆரோக்கிய கண்காணிப்பு, பூச்சி கட்டுப்பாடு. அழைக்கவும்: 78999 78869",
            keywords: "வேளாண் ட்ரோன் சேவைகள் தமிழ்நாடு, ட்ரோன் தெளிப்பு, துல்லிய விவசாயம், பயிர் கண்காணிப்பு, பூச்சி கட்டுப்பாடு ட்ரோன்"
        }
    };

    const currentSEO = seoConfig[lang] || seoConfig.en;

    // FAQs for structured data
    const faqs = [
        { q: t("faq1q"), a: t("faq1a") },
        { q: t("faq2q"), a: t("faq2a") },
        { q: t("faq3q"), a: t("faq3a") },
        { q: t("faq4q"), a: t("faq4a") }
    ];

    // Breadcrumbs
    const breadcrumbs = [
        { name: lang === 'ta' ? 'முகப்பு' : 'Home', url: `https://greenmist.net/${lang}` }
    ];

    // Combined schema
    const combinedSchema = {
        "@context": "https://schema.org",
        "@graph": [
            getLocalBusinessSchema(lang),
            getServiceSchema(),
            getFAQSchema(faqs),
            getOrganizationSchema(),
            getBreadcrumbSchema(breadcrumbs),
            {
                "@type": "WebSite",
                "@id": "https://greenmist.net/#website",
                "url": "https://greenmist.net",
                "name": "Green Mist",
                "description": "Agricultural Drone Services in Tamil Nadu",
                "inLanguage": lang === 'ta' ? 'ta-IN' : 'en-US',
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://greenmist.net/search?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "WebPage",
                "@id": `https://greenmist.net/${lang}#webpage`,
                "url": `https://greenmist.net/${lang}`,
                "name": currentSEO.title,
                "description": currentSEO.description,
                "isPartOf": { "@id": "https://greenmist.net/#website" },
                "about": { "@id": "https://greenmist.net/#localbusiness" },
                "inLanguage": lang === 'ta' ? 'ta-IN' : 'en-US',
                "datePublished": "2024-01-01",
                "dateModified": new Date().toISOString().split('T')[0]
            }
        ]
    };

    return (
        <>
            {/* ===== SEO COMPONENTS ===== */}

            {/* 1. Meta tags, OG tags, Twitter cards */}
            <SEOHead
                title={lang === 'ta' 
                    ? "கிரீன் மிஸ்ட் - வேளாண் ட்ரோன் சேவைகள்" 
                    : "Green Mist - Agricultural Drone Services"
                }
                description="Professional agricultural drone services in Tamil Nadu"
                keywords="drone spraying, agriculture, Tamil Nadu"
                canonicalUrl="https://greenmist.net"
                ogImage="https://greenmist.net/images/og-image.jpg"
                lang={lang}
                structuredData={combinedSchema}
                location={seoLocation}
            />

            {/* 2. Local Business Schema (separate for Google My Business) */}
            <LocalSEOData businessInfo={businessInfo} />

            {/* 3. Service Area Schema for local search */}
            <ServiceAreaSchema areas={serviceAreas} />

            {/* 4. Voice Search Optimized Content (hidden but crawlable) */}
            {/* Commented out to fix GSC 'Duplicate field FAQPage' and 'Missing field acceptedAnswer' errors */}
            {/* <VoiceSearchContent lang={lang} /> */}

            {/* 5. Entity Content for AI/LLM crawlers */}
            <EntityContent lang={lang} />

            {/* ===== VISIBLE CONTENT ===== */}
            <div className="min-h-screen bg-white font-sans text-primary-950 overflow-x-hidden selection:bg-primary-200">
                {/* Skip Link for Accessibility */}
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg"
                >
                    {lang === 'ta' ? 'முதன்மை உள்ளடக்கத்திற்குச் செல்' : 'Skip to main content'}
                </a>

                {/* Navigation */}
                <Navbar t={t} onSelectLang={onSelectLang} currentLang={lang} />

                {/* Main Content */}
                <main id="main-content">
                    {/* Hero Section */}
                    <section id="home" aria-label={lang === 'ta' ? 'முகப்பு' : 'Home'}>
                        <HeroSlider lang={lang} />
                    </section>

                    {/* Lazy-loaded Content */}
                    <Suspense fallback={
                        <div className="flex items-center justify-center py-20" aria-busy="true" aria-live="polite">
                            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="sr-only">{lang === 'ta' ? 'ஏற்றுகிறது...' : 'Loading...'}</span>
                        </div>
                    }>
                        <HomeContent lang={lang} t={t} />
                    </Suspense>
                </main>

                {/* Hidden SEO Content for Crawlers */}
                <div className="hidden" aria-hidden="true">
                    <h1>Green Mist - Agricultural Drone Services Tamil Nadu</h1>
                    <p>Professional drone spraying services for crops, pest control, and precision farming across Tamil Nadu including Chennai, Coimbatore, Madurai, Salem, Tiruchirappalli.</p>
                    <p>Services: Crop Spraying, Pest Control, Water Monitoring, Field Mapping, Crop Health Assessment</p>
                    <p>Contact: 78999 78869, 91503 95864, 90039 92693</p>
                    <p>Service Areas: Chennai, Coimbatore, Madurai, Salem, Tiruchirappalli, Tirunelveli, Erode, Vellore, Thanjavur, Dindigul</p>
                </div>
            </div>
        </>
    );
};

export default Home;
