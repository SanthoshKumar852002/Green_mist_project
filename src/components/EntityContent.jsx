import React from "react";
import { geoOptimizedContent } from "../utils/geoContent";

/**
 * SEO + AI Entity Content
 * Visible to crawlers, invisible to users without cloaking
 */
const EntityContent = () => {
  const content = geoOptimizedContent;

  return (
    <section
      style={{
        position: "absolute",
        left: "-9999px",
        top: "auto",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {/* ORGANIZATION / LOCAL BUSINESS ENTITY */}
      <div
        itemScope
        itemType="https://schema.org/AgriculturalBusiness"
      >
        <meta itemProp="name" content={content.businessIdentity.name} />
        <meta itemProp="url" content="https://greenmist.net/" />
        <meta itemProp="logo" content="https://greenmist.net/images/og-image.jpg" />
        <meta itemProp="foundingDate" content={content.businessIdentity.established} />
        <meta itemProp="areaServed" content="Tamil Nadu, India" />
        <meta itemProp="slogan" content="Smart Drone Farming Solutions" />

        {/* GEO LOCATION */}
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <meta itemProp="addressRegion" content="Tamil Nadu" />
          <meta itemProp="addressCountry" content="IN" />
        </div>

        {/* SERVICES */}
        <div itemProp="makesOffer" itemScope itemType="https://schema.org/OfferCatalog">
          <meta itemProp="name" content="Agricultural Drone Services" />

          {content.services.map((service, i) => (
            <div
              key={i}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <div itemProp="itemOffered" itemScope itemType="https://schema.org/Service">
                <meta itemProp="name" content={service.name} />
                <meta itemProp="description" content={service.description} />
                <meta itemProp="areaServed" content="Tamil Nadu" />
              </div>

              <meta itemProp="priceRange" content={service.priceRange} />
            </div>
          ))}
        </div>

        {/* CONTACT INFO */}
        <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
          {content.contactMethods.map((method, i) => (
            <meta
              key={i}
              itemProp={method.type === "Phone" ? "telephone" : "url"}
              content={method.value}
            />
          ))}
          <meta itemProp="contactType" content="customer service" />
          <meta itemProp="availableLanguage" content="Tamil, English" />
        </div>

        {/* WHY CHOOSE US */}
        <div itemProp="knowsAbout">
          {content.uniqueSellingPoints.map((point, i) => (
            <meta key={i} content={point} />
          ))}
        </div>

        {/* AI / SEARCH ENHANCEMENT */}
        <meta
          itemProp="description"
          content="Green Mist provides professional agricultural drone spraying, crop monitoring, and precision farming services across Tamil Nadu."
        />
      </div>
    </section>
  );
};

export default EntityContent;
