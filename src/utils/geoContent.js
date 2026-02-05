/**
 * geoContent.js
 * Entity-focused, AI-readable, Google-safe content
 * Used by: EntityContent.jsx, LocalSEO.jsx, SEO
 */

export const geoOptimizedContent = {
  businessIdentity: {
    name: "GREENMIST Agriculture Drone Services",
    alternateName: "Green Mist",
    nameTamil: "கிரீன்மிஸ்ட் வேளாண் ட்ரோன் சேவைகள்",
    type: "Agricultural Drone Service Provider",
    established: 2024,
    specialty: "Precision Agriculture & Drone-Based Crop Management",
    location: {
      city: "Tiruchengode",
      state: "Tamil Nadu",
      country: "India"
    }
  },

  address: {
    street: "Manickampalayam",
    streetTamil: "மணிக்கம்பாளையம்",
    city: "Tiruchengode",
    cityTamil: "திருச்செங்கோடு",
    state: "Tamil Nadu",
    stateTamil: "தமிழ்நாடு",
    postalCode: "637202",
    country: "India",
    coordinates: {
      latitude: 11.3269331,
      longitude: 78.00271943
    }
  },

  uniqueSellingPoints: [
    "Drone spraying covers over 50 acres per day",
    "Reduces chemical usage by up to 30% through precision application",
    "DGCA-certified drone pilots with RPC licenses",
    "Serves major agricultural districts across Tamil Nadu",
    "Support available in both Tamil and English"
  ],

  services: [
    {
      name: "Precision Crop Spraying",
      nameTamil: "துல்லிய பயிர் தெளிப்பு",
      description:
        "GPS-guided agricultural drone spraying for pesticides, herbicides, and fertilizers with uniform coverage.",
      priceRange: "₹500 – ₹1500 per acre"
    },
    {
      name: "Crop Health Monitoring",
      nameTamil: "பயிர் ஆரோக்கிய கண்காணிப்பு",
      description:
        "Multispectral drone imaging to identify crop stress, pest infestation, and nutrient deficiencies early.",
      priceRange: "₹300 – ₹800 per acre"
    },
    {
      name: "Field Mapping & Survey",
      nameTamil: "நில வரைபடம் மற்றும் ஆய்வு",
      description:
        "High-resolution aerial mapping for land measurement, irrigation planning, and farm layout optimization.",
      priceRange: "₹200 – ₹500 per acre"
    }
  ],

  comparisons: {
    droneVsManual: {
      speed: "Drone: ~15 minutes per acre | Manual: 4–6 hours per acre",
      coverage: "Drone: 50+ acres per day | Manual: 5–10 acres per day",
      precision: "Drone: GPS-guided accuracy | Manual: uneven coverage",
      safety: "Drone: no human exposure | Manual: direct chemical contact"
    }
  },

  credibility: {
    certifications: [
      "DGCA Approved Drone Operations",
      "Remote Pilot Certificate (RPC)"
    ],
    experience: "1000+ acres successfully serviced",
    coverage: "15+ districts across Tamil Nadu",
    customerSatisfaction: "98% positive feedback"
  },

  contactMethods: [
    {
      type: "Phone",
      value: "+91 78999 78869",
      primary: true
    },
    {
      type: "Phone",
      value: "+91 91503 95864"
    },
    {
      type: "Phone",
      value: "+91 90039 92693"
    },
    {
      type: "WhatsApp",
      value: "+91 78999 78869"
    },
    {
      type: "Website",
      value: "https://greenmist.net"
    }
  ]
};

/**
 * Citation-friendly facts for AI assistants & summaries
 */
export const getCitableContent = () => ({
  statistics: [
    "Agricultural drones can reduce pesticide usage by up to 30 percent",
    "Drone spraying is approximately ten times faster than manual spraying",
    "Precision agriculture using drones can increase crop yield by 15 to 20 percent",
    "Drone-based farming reduces water usage by nearly 25 percent"
  ],
  expertQuotes: [
    {
      quote:
        "Drone-based precision agriculture is transforming farming in Tamil Nadu by improving efficiency, safety, and profitability.",
      attribution: "GREENMIST Agriculture Drone Services"
    }
  ]
});
