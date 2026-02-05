import { useEffect } from "react";
import { generateMetaKeywords } from "../utils/seoKeywords";

/**
 * SEOHead – SAFE for Google Search Console & Rich Results
 * Does NOT remove other schemas (LocalSEO, ServiceSchema)
 */
const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl = "https://greenmist.net/",
  ogImage = "https://greenmist.net/images/og-image.jpg",
  lang = "en",
  structuredData = null,
  location = "Tamil Nadu"
}) => {
  useEffect(() => {
    /* ------------------ TITLE ------------------ */
    if (title) {
      document.title = title;
    }

    /* ---------------- META HELPER ---------------- */
    const setMeta = (key, value, isProperty = false) => {
      if (!value) return;

      const attr = isProperty ? "property" : "name";
      let tag = document.querySelector(`meta[${attr}="${key}"]`);

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", value);
    };

    /* ---------------- BASIC SEO ---------------- */
    setMeta("description", description);
    setMeta("robots", "index, follow");

    // Keywords (optional, controlled)
    const metaKeywords = keywords || generateMetaKeywords(lang, location);
    if (metaKeywords) {
      setMeta("keywords", metaKeywords);
    }

    /* ---------------- CANONICAL ---------------- */
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    /* ---------------- OPEN GRAPH ---------------- */
    setMeta("og:type", "website", true);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:site_name", "GREENMIST Agriculture Drone Services", true);
    setMeta("og:locale", lang === "ta" ? "ta_IN" : "en_IN", true);

    /* ---------------- TWITTER ---------------- */
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    /* ---------------- GEO (SAFE) ---------------- */
    setMeta("geo.region", "IN-TN");
    setMeta("geo.placename", "Tiruchengode, Tamil Nadu, India");
    setMeta("geo.position", "11.3269331;78.00271943");
    setMeta("ICBM", "11.3269331, 78.00271943");

    /* ---------------- HREFLANG (MATCH SITEMAP) ---------------- */
    const hreflangs = [
      { lang: "en", url: "https://greenmist.net/" },
      { lang: "ta", url: "https://greenmist.net/ta" },
      { lang: "x-default", url: "https://greenmist.net/" }
    ];

    hreflangs.forEach(({ lang, url }) => {
      let link = document.querySelector(`link[hreflang="${lang}"]`);
      if (!link) {
        link = document.createElement("link");
        link.rel = "alternate";
        link.hreflang = lang;
        document.head.appendChild(link);
      }
      link.href = url;
    });

    /* ---------------- STRUCTURED DATA (SAFE APPEND) ---------------- */
    if (structuredData) {
      const scriptId = "dynamic-structured-data";
      let script = document.getElementById(scriptId);

      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = scriptId;
        document.head.appendChild(script);
      }

      script.textContent = JSON.stringify(structuredData);
    }

  }, [title, description, keywords, canonicalUrl, ogImage, lang, structuredData, location]);

  return null;
};

export default SEOHead;
