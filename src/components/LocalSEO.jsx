import React from 'react';

// Component to add local business structured data
const LocalSEOData = ({ businessInfo }) => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${businessInfo.url}#localbusiness`,
    "name": businessInfo.name,
    "image": businessInfo.images,
    "telephone": businessInfo.phones[0],
    "email": businessInfo.email,
    "url": businessInfo.url,
    "priceRange": businessInfo.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessInfo.address.street,
      "addressLocality": businessInfo.address.city,
      "addressRegion": businessInfo.address.state,
      "postalCode": businessInfo.address.postalCode,
      "addressCountry": businessInfo.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": businessInfo.geo.lat,
      "longitude": businessInfo.geo.lng
    },
    "openingHoursSpecification": businessInfo.hours.map(h => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": h.days,
      "opens": h.opens,
      "closes": h.closes
    })),
    "areaServed": businessInfo.serviceAreas.map(area => ({
      "@type": "City",
      "name": area
    })),
    "aggregateRating": businessInfo.rating ? {
      "@type": "AggregateRating",
      "ratingValue": businessInfo.rating.value,
      "reviewCount": businessInfo.rating.count
    } : undefined,
    "review": businessInfo.reviews?.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating
      },
      "reviewBody": review.text,
      "datePublished": review.date
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
};

// Service Area Schema
export const ServiceAreaSchema = ({ areas }) => {
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
      }
    },
    "areaServed": areas.map(area => ({
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