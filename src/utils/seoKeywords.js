/**
 * seoKeywords.js
 * Google-safe keyword system for GREENMIST
 * Meta keywords are LIMITED & CONTROLLED
 * Research keywords are kept for analysis only
 */

/* ================= PRIMARY (CORE INTENT) ================= */
export const primaryKeywords = {
  en: [
    "agricultural drone services",
    "drone spraying services",
    "crop spraying drone",
    "precision agriculture drone",
    "agriculture drone Tamil Nadu"
  ],
  ta: [
    "விவசாய ட்ரோன் சேவைகள்",
    "ட்ரோன் தெளிப்பு சேவை",
    "பயிர் தெளிப்பு ட்ரோன்",
    "தமிழ்நாடு விவசாய ட்ரோன்"
  ]
};

/* ================= SECONDARY ================= */
export const secondaryKeywords = {
  en: [
    "drone farming services",
    "aerial crop spraying",
    "crop monitoring drone",
    "fertilizer spraying drone",
    "DGCA certified drone pilots"
  ],
  ta: [
    "வான்வழி பயிர் தெளிப்பு",
    "பயிர் கண்காணிப்பு ட்ரோன்",
    "உர தெளிப்பு ட்ரோன்"
  ]
};

/* ================= LONG TAIL (RESEARCH ONLY) ================= */
export const longTailKeywords = {
  en: [
    "drone spraying services in Tiruchengode",
    "drone spraying cost per acre Tamil Nadu",
    "DGCA approved agricultural drone service",
    "paddy field drone spraying services",
    "coconut farm drone spraying"
  ],
  ta: [
    "திருச்செங்கோடு ட்ரோன் தெளிப்பு",
    "ஒரு ஏக்கருக்கு ட்ரோன் தெளிப்பு விலை",
    "நெல் வயல் ட்ரோன் தெளிப்பு",
    "தென்னை தோட்டம் ட்ரோன் சேவை"
  ]
};

/* ================= LOCAL SEO (STRUCTURED USE ONLY) ================= */
export const localSEOKeywords = {
  districts: [
    "Namakkal",
    "Salem",
    "Erode"
  ]
};

/* ================= CROP CONTEXT ================= */
export const cropKeywords = {
  en: [
    "paddy drone spraying",
    "coconut plantation drone",
    "sugarcane drone spraying",
    "cotton crop drone services"
  ],
  ta: [
    "நெல் வயல் ட்ரோன்",
    "தென்னை தோட்டம் ட்ரோன்",
    "கரும்பு வயல் ட்ரோன்"
  ]
};

/* ================= VOICE SEARCH ================= */
export const voiceSearchKeywords = {
  en: [
    "how much does drone spraying cost per acre",
    "how to book agricultural drone services",
    "is drone spraying safe for crops"
  ],
  ta: [
    "ஒரு ஏக்கருக்கு ட்ரோன் தெளிப்பு எவ்வளவு",
    "ட்ரோன் தெளிப்பு எப்படி புக் செய்வது"
  ]
};

/* ================= META KEYWORD GENERATOR (SAFE) ================= */
export const generateMetaKeywords = (lang = "en", location = "Tamil Nadu") => {
  const base = [
    ...primaryKeywords[lang],
    ...secondaryKeywords[lang],
    `agricultural drone ${location}`,
    `drone spraying ${location}`,
    "GREENMIST",
    lang === "ta" ? "கிரீன்மிஸ்ட்" : null
  ].filter(Boolean);

  // HARD LIMIT → Google-safe
  return base.slice(0, 25).join(", ");
};

/* ================= ANALYSIS ONLY (NOT FOR META / PAGE USE) ================= */
export const researchKeywords = {
  competitor: [
    "best agricultural drone company India",
    "top drone spraying services Tamil Nadu"
  ],
  lsi: [
    "UAV",
    "precision farming",
    "GPS guided spraying",
    "smart agriculture",
    "AgTech"
  ],
  negative: [
    "drone camera",
    "drone photography",
    "toy drone",
    "DJI drone price",
    "drone for sale"
  ]
};

/* ================= EXPORT FOR INTERNAL TOOLS ================= */
export const getAllKeywords = () => ({
  primary: primaryKeywords,
  secondary: secondaryKeywords,
  longTail: longTailKeywords,
  local: localSEOKeywords,
  crop: cropKeywords,
  voice: voiceSearchKeywords,
  research: researchKeywords
});

export default {
  generateMetaKeywords,
  getAllKeywords
};
