import { useEffect } from 'react';

const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  lang = 'en',
  structuredData,
  location
}) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta tags helper
    const setMeta = (name, content, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic Meta Tags
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', 'index, follow');
    setMeta('author', 'Green Mist Agricultural Drone Services');
    setMeta('language', lang === 'ta' ? 'Tamil' : 'English');

    // Open Graph Tags
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:locale', lang === 'ta' ? 'ta_IN' : 'en_US', true);
    setMeta('og:site_name', 'Green Mist', true);

    // Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Geo Tags for Local SEO - Use passed location or default
    const defaultLocation = {
      region: "IN-TN",
      placename: "Tiruchengode, Tamil Nadu, India",
      position: "11.3269331;78.00271943"
    };

    const geoLocation = location || defaultLocation;

    setMeta('geo.region', geoLocation.region);
    setMeta('geo.placename', geoLocation.placename);
    setMeta('geo.position', geoLocation.position);
    setMeta('ICBM', geoLocation.position.replace(';', ', '));

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Structured Data (JSON-LD)
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Hreflang tags for multilingual
    const hreflangs = [
      { lang: 'en', url: 'https://greenmist.in/en' },
      { lang: 'ta', url: 'https://greenmist.in/ta' },
      { lang: 'x-default', url: 'https://greenmist.in' }
    ];

    hreflangs.forEach(({ lang: hrefLang, url }) => {
      let link = document.querySelector(`link[hreflang="${hrefLang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hrefLang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    });

  }, [title, description, keywords, canonicalUrl, ogImage, lang, structuredData, location]);

  return null;
};

export default SEOHead;