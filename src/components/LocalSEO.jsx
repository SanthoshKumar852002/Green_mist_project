import React from "react";

/**
 * Local SEO + Entity Schema for GREENMIST
 * Google, Bing, AI-search optimized
 */
const LocalSEO = ({ businessInfo }) => {
  const defaultBusinessInfo = {
    "@id": "https://greenmist.in/#greenmist",
    name: "GREENMIST Agriculture Drone Services",
    url: "https://greenmist.in/",
    logo: "https://greenmist.in/images/og-image.jpg",
    email: "contact@greenmist.in",
    phones: [
      "+917899978869",
      "+919150395864",
      "+919003992693"
    ],
    priceRange: "₹₹",
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
      {
        days: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        opens: "06:00",
        closes: "18:00"
      }
    ],
    serviceAreas: [
      "Tamil Nadu",
      "Namakkal",
      "Salem",
      "Erode",
      "Karur",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
      "Chennai"
    ],
    rating: {
      value: 4.8,
      count: 127
    },
    sameAs: [
      "https://www.facebook.com/greenmist",
      "https://www.instagram.com/greenmist",
      "https://www.youtube.com/@greenmist"
    ]
  };

  const info = businessInfo || defaultBusinessInfo;

  const schema = {
    "@context": "https://schema.org",
    "@type": "AgriculturalBusiness",
    "@id": info["@id"],
    name: info.name,
    url: info.url,
    logo: info.logo,
    image: info.logo,
    email: info.email,
    telephone: info.phones,
    priceRange: info.priceRange,
    sameAs: info.sameAs,

    address: {
      "@type": "PostalAddress",
      streetAddress: info.address.street,
      addressLocality: info.address.city,
      addressRegion: info.address.state,
      postalCode: info.address.postalCode,
      addressCountry: info.address.country
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: info.geo.lat,
      longitude: info.geo.lng
    },

    openingHoursSpecification: info.hours.map(h => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map(d => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes
    })),

    areaServed: info.serviceAreas.map(area => ({
      "@type": "AdministrativeArea",
      name: area
    })),

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: info.rating.value,
      reviewCount: info.rating.count
    },

    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Agricultural Drone Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Drone Crop Spraying",
            areaServed: "Tamil Nadu"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Precision Farming & Monitoring",
            areaServed: "Tamil Nadu"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Service Schema – Connected to Local Business Entity
 */
export const ServiceSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://greenmist.in/#agri-drone-service",
    name: "Agricultural Drone Services in Tamil Nadu",
    provider: {
      "@id": "https://greenmist.in/#greenmist"
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Tamil Nadu"
    },
    serviceType: "Drone-based Precision Agriculture"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Service Area Schema – Multi-city local SEO
 */
export const ServiceAreaSchema = ({ areas = [] }) => {
  if (!areas.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agricultural Drone Services",
    provider: {
      "@id": "https://greenmist.in/#greenmist"
    },
    areaServed: areas.map(area => ({
      "@type": "AdministrativeArea",
      name: `${area.name}, ${area.state}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalSEO;
