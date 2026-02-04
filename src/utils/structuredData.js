// Local Business Schema
export const getLocalBusinessSchema = (lang) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://greenmist.in/#localbusiness",
  "name": "GREENMIST Agriculture Drone",
  "alternateName": lang === 'ta' ? "கிரீன்மிஸ்ட் வேளாண் ட்ரோன்கள்" : "Green Mist Drones",
  "description": lang === 'ta' 
    ? "தமிழ்நாட்டில் துல்லிய விவசாயம், பயிர் தெளிப்பு மற்றும் நில வரைபடத்திற்கான தொழில்முறை வேளாண் ட்ரோன் சேவைகள்"
    : "Professional agricultural drone services for precision farming, crop spraying, and field mapping in Tamil Nadu",
  "url": "https://greenmist.in",
  "telephone": ["+91-78999-78869", "+91-91503-95864", "+91-90039-92693"],
  "email": "contact@greenmist.in",
  "image": "https://greenmist.in/images/og-image.jpg",
  "logo": "https://greenmist.in/images/logo.png",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": lang === 'ta' ? "மணிக்கம்பாளையம்" : "Manickampalayam",
    "addressLocality": lang === 'ta' ? "திருச்செங்கோடு" : "Tiruchengode",
    "addressRegion": lang === 'ta' ? "தமிழ்நாடு" : "Tamil Nadu",
    "postalCode": "637202",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "11.3781",
    "longitude": "77.8942"
  },
  "areaServed": {
    "@type": "State",
    "name": lang === 'ta' ? "தமிழ்நாடு" : "Tamil Nadu"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "06:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/greenmist",
    "https://www.instagram.com/greenmist",
    "https://www.youtube.com/greenmist",
    "https://www.linkedin.com/company/greenmist"
  ]
});

// Service Schema
export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Agricultural Drone Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "GREENMIST Agriculture Drone",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Manickampalayam",
      "addressLocality": "Tiruchengode",
      "addressRegion": "Tamil Nadu",
      "postalCode": "637202",
      "addressCountry": "IN"
    }
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
          "description": "Targeted pesticide and fertilizer application"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Field Mapping",
          "description": "Comprehensive land survey and mapping services"
        }
      }
    ]
  }
});

// FAQ Schema
export const getFAQSchema = (faqs) => ({
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

// Organization Schema
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GREENMIST Agriculture Drone",
  "url": "https://greenmist.in",
  "logo": "https://greenmist.in/images/logo.png",
  "description": "Leading agricultural drone service provider in Tamil Nadu",
  "foundingDate": "2024",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Manickampalayam",
    "addressLocality": "Tiruchengode",
    "addressRegion": "Tamil Nadu",
    "postalCode": "637202",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-78999-78869",
    "contactType": "customer service",
    "availableLanguage": ["English", "Tamil"]
  }
});

// Breadcrumb Schema
export const getBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});