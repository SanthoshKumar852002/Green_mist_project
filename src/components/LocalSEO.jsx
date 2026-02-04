import React from 'react';

const LocalSEOData = ({ businessInfo }) => {
  // Default business info with correct coordinates
  const defaultBusinessInfo = {
    name: "GREENMIST Agriculture Drone",
    url: "https://greenmist.net/",
    email: "contact@greenmist.in",
    phones: ["+91 78999 78869", "+91 91503 95864", "+91 90039 92693"],
    images: ["https://greenmist.in/images/og-image.jpg"],
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
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "06:00",
        closes: "18:00"
      }
    ],
    serviceAreas: [
      "Tiruchengode", "Namakkal", "Salem", "Erode", "Karur",
      "Coimbatore", "Madurai", "Tiruchirappalli", "Dindigul",
      "Thanjavur", "Chennai", "Vellore", "Tirunelveli",
      "Cuddalore", "Kanchipuram"
    ],
    rating: { value: 4.8, count: 127 },
    reviews: []
  };

  const info = businessInfo || defaultBusinessInfo;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${info.url}#localbusiness`,
    "name": info.name,
    "image": info.images,
    "telephone": info.phones[0],
    "email": info.email,
    "url": info.url,
    "priceRange": info.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": info.address.street,
      "addressLocality": info.address.city,
      "addressRegion": info.address.state,
      "postalCode": info.address.postalCode,
      "addressCountry": info.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": info.geo.lat,
      "longitude": info.geo.lng
    },
    "openingHoursSpecification": info.hours.map(h => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": h.days,
      "opens": h.opens,
      "closes": h.closes
    })),
    "areaServed": info.serviceAreas.map(area => ({
      "@type": "City",
      "name": area
    })),
    "aggregateRating": info.rating ? {
      "@type": "AggregateRating",
      "ratingValue": info.rating.value,
      "reviewCount": info.rating.count
    } : undefined
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
};

// Service Area Schema with correct coordinates
export const ServiceAreaSchema = ({ areas }) => {
  const defaultAreas = [
    { name: "Tiruchengode", state: "Tamil Nadu" },
    { name: "Namakkal", state: "Tamil Nadu" },
    { name: "Salem", state: "Tamil Nadu" },
    { name: "Erode", state: "Tamil Nadu" },
    { name: "Karur", state: "Tamil Nadu" },
    { name: "Coimbatore", state: "Tamil Nadu" },
    { name: "Madurai", state: "Tamil Nadu" },
    { name: "Tiruchirappalli", state: "Tamil Nadu" }
  ];

  const serviceAreas = areas || defaultAreas;

  const schema = {
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
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 11.3269331,
        "longitude": 78.00271943
      }
    },
    "areaServed": serviceAreas.map(area => ({
      "@type": "City",
      "name": area.name,
      "containedInPlace": {
        "@type": "State",
        "name": area.state
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalSEOData;