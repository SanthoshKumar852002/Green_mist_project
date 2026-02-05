import { useEffect } from 'react';
import { generateMetaKeywords } from '../utils/seoKeywords';

const SEOHead = ({
  title,
  description,
  keywords, // Can be custom or use generated
  canonicalUrl,
  ogImage,
  lang = 'en',
  structuredData,
  location = 'Tamil Nadu'
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

    // Generate keywords if not provided
    const metaKeywords = keywords || generateMetaKeywords(lang, location);

    // Basic Meta Tags
    setMeta('description', description);
    setMeta('keywords', metaKeywords);
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('author', 'Green Mist Agricultural Drone Services');
    setMeta('language', lang === 'ta' ? 'Tamil' : 'English');
    setMeta('revisit-after', '7 days');
    setMeta('distribution', 'global');
    setMeta('rating', 'general');

    // Open Graph Tags
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:locale', lang === 'ta' ? 'ta_IN' : 'en_US', true);
    setMeta('og:site_name', 'Green Mist - Agricultural Drone Services', true);

    // Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);
    setMeta('twitter:site', '@greenmist');

    // Geo Tags for Local SEO
    setMeta('geo.region', 'IN-TN');
    setMeta('geo.placename', 'Tiruchengode, Tamil Nadu, India');
    setMeta('geo.position', '11.3269331;78.00271943');
    setMeta('ICBM', '11.3269331, 78.00271943');

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
      // Remove existing
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach(s => s.remove());

      // Add new
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Hreflang tags for multilingual
    const hreflangs = [
      { lang: 'en', url: 'https://greenmist.net/' },
      { lang: 'ta', url: 'https://greenmist.net/?lang=ta' },
      { lang: 'x-default', url: 'https://greenmist.net/' }
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