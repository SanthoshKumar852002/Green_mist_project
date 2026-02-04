import React from 'react';

const VoiceSearchContent = ({ lang }) => {
  // Content optimized for voice search - uses natural language
  const voiceContent = {
    en: {
      intro: "Green Mist provides professional agricultural drone services in Tamil Nadu. We help farmers with precision crop spraying, pest control, and field mapping using advanced drone technology.",
      services: "Our services include drone spraying for pesticides and fertilizers, crop health monitoring using aerial imaging, water stress detection, and comprehensive land surveying.",
      pricing: "Drone spraying services start at just 500 rupees per acre. We can cover up to 50 acres in a single day, making it much faster and more affordable than traditional methods.",
      contact: "To book our services, call us at 7 8 9 9 9 7 8 8 6 9, or visit our website at green mist dot in. We serve all major agricultural areas in Tamil Nadu.",
      benefits: "Using drone technology, farmers can reduce chemical usage by up to 30 percent, save water, and improve crop yields. Our precision spraying ensures even coverage without crop damage."
    },
    ta: {
      intro: "கிரீன் மிஸ்ட் தமிழ்நாட்டில் தொழில்முறை வேளாண் ட்ரோன் சேவைகளை வழங்குகிறது.",

    }
  };

  const content = voiceContent[lang] || voiceContent.en;

  return (
    <div className="sr-only speakable-content" aria-hidden="true">
      <p>{content.intro}</p>
      <p>{content.services}</p>
      <p>{content.pricing}</p>
      <p>{content.contact}</p>
      <p>{content.benefits}</p>
    </div>
  );
};

export default VoiceSearchContent;