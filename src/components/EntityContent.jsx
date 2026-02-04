import React from 'react';
import { geoOptimizedContent } from '../utils/geoContent';

// Component that provides entity-rich content for AI crawlers
const EntityContent = ({ lang }) => {
  const content = geoOptimizedContent;
  
  return (
    <article 
      className="hidden" 
      itemScope 
      itemType="https://schema.org/Article"
      aria-hidden="true"
    >
      <header>
        <h1 itemProp="headline">
          Agricultural Drone Services in Tamil Nadu by Green Mist
        </h1>
        <meta itemProp="author" content="Green Mist" />
        <meta itemProp="datePublished" content="2026-01-01" />
        <meta itemProp="dateModified" content="2026-02-02" />
      </header>
      
      <section itemProp="articleBody">
        <h2>About Green Mist Agricultural Drone Services</h2>
        <p>
          {content.businessIdentity.name} is a {content.businessIdentity.type} based in {content.businessIdentity.location}. 
          Established in {content.businessIdentity.established}, we specialize in {content.businessIdentity.specialty}.
        </p>
        
        <h2>Our Services</h2>
        {content.services.map((service, i) => (
          <div key={i} itemScope itemType="https://schema.org/Service">
            <h3 itemProp="name">{service.name}</h3>
            <p itemProp="description">{service.description}</p>
            <p>Price Range: <span itemProp="priceRange">{service.priceRange}</span></p>
          </div>
        ))}
        
        <h2>Why Choose Green Mist?</h2>
        <ul>
          {content.uniqueSellingPoints.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
        
        <h2>Drone vs Traditional Farming Comparison</h2>
        <dl>
          <dt>Speed</dt>
          <dd>{content.comparisons.droneVsManual.speed}</dd>
          <dt>Daily Coverage</dt>
          <dd>{content.comparisons.droneVsManual.coverage}</dd>
          <dt>Precision</dt>
          <dd>{content.comparisons.droneVsManual.precision}</dd>
        </dl>
        
        <h2>Contact Information</h2>
        <address itemScope itemType="https://schema.org/ContactPoint">
          {content.contactMethods.map((method, i) => (
            <p key={i}>
              <span itemProp="contactType">{method.type}</span>: 
              <span itemProp={method.type === 'Phone' ? 'telephone' : 'url'}>{method.value}</span>
            </p>
          ))}
        </address>
      </section>
    </article>
  );
};

export default EntityContent;