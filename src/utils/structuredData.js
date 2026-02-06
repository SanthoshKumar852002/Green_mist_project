// ================= LOCAL BUSINESS SCHEMA =================
export const getLocalBusinessSchema = (lang = "en") => ({
  "@context": "https://schema.org",
  "@type": "AgriculturalService",
  "@id": "https://greenmist.net/#localbusiness",
  "name": "GREENMIST Agriculture Drone",
  "alternateName": lang === "ta"
    ? "கிரீன்மிஸ்ட் வேளாண் ட்ரோன்கள்"
    : "Greenmist Drones",
  "description": lang === "ta"
    ? "தமிழ்நாட்டில் துல்லிய விவசாயம், பயிர் தெளிப்பு மற்றும் நில வரைபடத்திற்கான தொழில்முறை வேளாண் ட்ரோன் சேவைகள்"
    : "Professional agricultural drone services for precision farming, crop spraying, and field mapping in Tamil Nadu",
  "url": "https://greenmist.net",
  "logo": "https://greenmist.net/images/logo_round.png",
  "image": [
    "https://greenmist.net/images/hero_banner_v2.webp",
    "https://greenmist.net/images/crop_monitoring.webp",
    "https://greenmist.net/images/seed_spraying.webp"
  ],
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": lang === "ta" ? "மணிக்கம்பாளையம்" : "Manickampalayam",
    "addressLocality": lang === "ta" ? "திருச்செங்கோடு" : "Tiruchengode",
    "addressRegion": lang === "ta" ? "தமிழ்நாடு" : "Tamil Nadu",
    "postalCode": "637202",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 11.3781,
    "longitude": 77.8942
  },
  "areaServed": {
    "@type": "State",
    "name": lang === "ta" ? "தமிழ்நாடு" : "Tamil Nadu"
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
    ],
    "opens": "06:00",
    "closes": "18:00"
  }],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-78999-78869",
      "contactType": "customer service",
      "availableLanguage": ["English", "Tamil"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+91-91503-95864",
      "contactType": "customer service"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+91-90039-92693",
      "contactType": "customer service"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/greenmist",
    "https://www.instagram.com/greenmist",
    "https://www.youtube.com/greenmist",
    "https://www.linkedin.com/company/greenmist"
  ]
});


// ================= SERVICE SCHEMA =================
export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://greenmist.net/#services",
  "name": "Agricultural Drone Services",
  "serviceType": "Precision Agriculture Drone Services",
  "provider": {
    "@type": "AgriculturalService",
    "@id": "https://greenmist.net/#localbusiness"
  },
  "areaServed": {
    "@type": "State",
    "name": "Tamil Nadu"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Drone Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Crop Health Monitoring",
          "description": "Real-time crop health assessment using advanced drone imaging"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Precision Spraying",
          "description": "Targeted pesticide and fertilizer application using drones"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Field Mapping",
          "description": "High-accuracy land survey and agricultural field mapping"
        }
      }
    ]
  }
});


// ================= FAQ SCHEMA =================
export const getFAQSchema = (faqs = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
});


// ================= ORGANIZATION SCHEMA =================
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://greenmist.net/#organization",
  "name": "GREENMIST Agriculture Drone",
  "url": "https://greenmist.net",
  "logo": "https://greenmist.net/images/logo_round.png",
  "description": "Leading agricultural drone service provider in Tamil Nadu",
  "foundingDate": "2024",
  "sameAs": [
    "https://www.facebook.com/greenmist",
    "https://www.instagram.com/greenmist",
    "https://www.youtube.com/greenmist",
    "https://www.linkedin.com/company/greenmist"
  ]
});


// ================= BREADCRUMB SCHEMA =================
export const getBreadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
