/**
 * seoKeywords.js
 * Google-safe keyword system for GREENMIST
 * Meta keywords are LIMITED & CONTROLLED
 * Research keywords are kept for analysis only
 */

/* ================= PRIMARY (CORE INTENT - HIGH TRAFFIC) ================= */
export const primaryKeywords = {
  en: [
    "agricultural drone services",
    "drone spraying services",
    "crop spraying drone",
    "precision agriculture drone",
    "agriculture drone Tamil Nadu",
    "drone spraying services near me",
    "farm drone service"
  ],
  ta: [
    "விவசாய ட்ரோன் சேவைகள்",
    "ட்ரோன் தெளிப்பு சேவை",
    "பயிர் தெளிப்பு ட்ரோன்",
    "தமிழ்நாடு விவசாய ட்ரோன்",
    "ட்ரோன் தெளிப்பு சேவை அருகில்"
  ]
};

/* ================= SECONDARY (SERVICES-FOCUSED) ================= */
export const secondaryKeywords = {
  en: [
    "drone farming services",
    "aerial crop spraying",
    "crop monitoring drone",
    "fertilizer spraying drone",
    "DGCA certified drone pilots",
    "pesticide drone spraying",
    "crop health monitoring",
    "precision spraying services"
  ],
  ta: [
    "வான்வழி பயிர் தெளிப்பு",
    "பயிர் கண்காணிப்பு ட்ரோன்",
    "உர தெளிப்பு ட்ரோன்",
    "பூச்சிக்கொல்லி ட்ரோன் தெளிப்பு"
  ]
};

/* ================= LONG TAIL (HIGH CONVERSION - SPECIFIC INTENT) ================= */
export const longTailKeywords = {
  en: [
    "drone spraying services in Tiruchengode",
    "drone spraying cost per acre Tamil Nadu",
    "DGCA approved agricultural drone service",
    "paddy field drone spraying services",
    "coconut farm drone spraying",
    "how much does drone spraying cost per acre",
    "best agricultural drone service in Tamil Nadu",
    "drone spraying for sugarcane fields",
    "cotton crop drone spraying services",
    "drone spraying charges per acre in India",
    "agricultural drone service provider near me",
    "drone pesticide spraying cost",
    "crop dusting drone services India"
  ],
  ta: [
    "திருச்செங்கோடு ட்ரோன் தெளிப்பு",
    "ஒரு ஏக்கருக்கு ட்ரோன் தெளிப்பு விலை",
    "நெல் வயல் ட்ரோன் தெளிப்பு",
    "தென்னை தோட்டம் ட்ரோன் சேவை",
    "ஏக்கருக்கு ட்ரோன் தெளிப்பு செலவு",
    "கரும்பு வயல் ட்ரோன் தெளிப்பு"
  ]
};

/* ================= LOCAL SEO (GEO-TARGETED) ================= */
export const localSEOKeywords = {
  districts: [
    "Namakkal",
    "Salem", 
    "Erode",
    "Tiruchengode",
    "Karur",
    "Dharmapuri"
  ],
  localQueries: {
    en: [
      "drone spraying Namakkal",
      "agricultural drone Salem",
      "farm drone service Erode",
      "drone spraying Tiruchengode",
      "crop spraying drone Tamil Nadu",
      "best drone service near Namakkal",
      "agricultural drone service Karur"
    ],
    ta: [
      "நாமக்கல் ட்ரோன் தெளிப்பு",
      "சேலம் விவசாய ட்ரோன்",
      "ஈரோடு பண்ணை ட்ரோன்",
      "திருச்செங்கோடு ட்ரோன் சேவை"
    ]
  }
};

/* ================= CROP-SPECIFIC KEYWORDS ================= */
export const cropKeywords = {
  en: [
    "paddy drone spraying",
    "coconut plantation drone",
    "sugarcane drone spraying",
    "cotton crop drone services",
    "banana farm drone spraying",
    "rice field drone service",
    "vegetable farm drone spraying",
    "groundnut crop drone service",
    "mango orchard drone spraying"
  ],
  ta: [
    "நெல் வயல் ட்ரோன்",
    "தென்னை தோட்டம் ட்ரோன்",
    "கரும்பு வயல் ட்ரோன்",
    "பருத்தி வயல் ட்ரோன்",
    "வாழை தோட்டம் ட்ரோன்"
  ]
};

/* ================= VOICE SEARCH (CONVERSATIONAL QUERIES) ================= */
export const voiceSearchKeywords = {
  en: [
    "how much does drone spraying cost per acre",
    "how to book agricultural drone services",
    "is drone spraying safe for crops",
    "what is the price of drone spraying",
    "where can I find drone spraying services near me",
    "which company provides best drone spraying in Tamil Nadu",
    "how effective is drone spraying for paddy",
    "can drones spray pesticides on coconut trees",
    "how long does drone spraying take per acre"
  ],
  ta: [
    "ஒரு ஏக்கருக்கு ட்ரோன் தெளிப்பு எவ்வளவு",
    "ட்ரோன் தெளிப்பு எப்படி புக் செய்வது",
    "ட்ரோன் தெளிப்பு பயிருக்கு பாதுகாப்பானதா",
    "ட்ரோன் தெளிப்பு விலை என்ன"
  ]
};

/* ================= COMMERCIAL INTENT (BUYER KEYWORDS) ================= */
export const commercialKeywords = {
  en: [
    "hire agricultural drone",
    "book drone spraying service",
    "drone spraying price list",
    "agricultural drone rental",
    "drone service charges",
    "affordable drone spraying",
    "cheap drone spraying services",
    "drone spraying quotation"
  ],
  ta: [
    "விவசாய ட்ரோன் வாடகை",
    "ட்ரோன் தெளிப்பு விலை பட்டியல்",
    "ட்ரோன் சேவை கட்டணம்"
  ]
};

/* ================= META KEYWORD GENERATOR (SAFE) ================= */
export const generateMetaKeywords = (lang = "en", location = "Tamil Nadu") => {
  const base = [
    ...primaryKeywords[lang],
    ...secondaryKeywords[lang],
    `agricultural drone ${location}`,
    `drone spraying ${location}`,
    `drone spraying services ${location}`,
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
    "top drone spraying services Tamil Nadu",
    "agricultural drone companies in India",
    "drone spraying service providers Tamil Nadu"
  ],
  lsi: [
    "UAV agriculture",
    "precision farming",
    "GPS guided spraying",
    "smart agriculture",
    "AgTech India",
    "farm automation",
    "crop dusting",
    "aerial application",
    "unmanned aerial vehicle farming"
  ],
  negative: [
    "drone camera",
    "drone photography",
    "toy drone",
    "DJI drone price",
    "drone for sale",
    "buy drone online",
    "drone video shooting"
  ],
  seasonal: [
    "monsoon crop spraying",
    "kharif season drone spraying",
    "rabi season drone service",
    "summer crop drone spraying"
  ]
};

/* ================= GOOGLE SEARCH QUERIES (WHAT PEOPLE ACTUALLY TYPE) ================= */
export const googleSearchQueries = {
  highVolume: [
    "drone spraying",
    "agricultural drone",
    "farm drone",
    "crop spraying drone price",
    "drone for agriculture"
  ],
  mediumVolume: [
    "drone spraying cost",
    "agricultural drone service",
    "drone pesticide spraying",
    "drone for farming in India"
  ],
  lowVolumeHighIntent: [
    "drone spraying service Tamil Nadu",
    "agricultural drone service Namakkal",
    "hire drone for farm spraying",
    "drone spraying booking online"
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
  commercial: commercialKeywords,
  research: researchKeywords,
  googleQueries: googleSearchQueries
});

export default {
  generateMetaKeywords,
  getAllKeywords,
  primaryKeywords,
  secondaryKeywords,
  longTailKeywords,
  localSEOKeywords,
  cropKeywords,
  voiceSearchKeywords,
  commercialKeywords,
  googleSearchQueries
};
