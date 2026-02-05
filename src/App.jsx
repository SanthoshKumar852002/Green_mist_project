
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Home from './pages/Home';
import ScrollProgress from './components/ScrollProgress';

// Lazy load enhancement components
const CustomCursor = lazy(() => import('./components/CustomCursor'));

const translations = {
    en: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        contactUs: 'Contact Us',
        cropChecking: 'Crop Checking',
        waterMonitoring: 'Water Monitoring',
        pestControl: 'Pest Control',
        cropMonitoring: 'Crop Monitoring & Data Analysis',
        plantHealth: 'Plant Health Assessment',
        landSurvey: 'Land Survey & Field Mapping',
        exploreNow: 'Explore Now',
        closeDetails: 'Close Details',
        precisionTitle: 'Precision Agriculture Solutions',
        whyChoose: 'Why Choose',
        tradFarmingHard: 'Traditional farming is hard work. We make it smarter.',
        speed: 'Speed',
        fifteenMin: '15 minutes',
        oneDay: '1 full day manual work',
        resources: 'Resources',
        moreWater: 'Heavy water consumption',
        profit: 'Profit',
        inconsistentGrowth: 'Inconsistent growth',
        fasterResults: 'Faster Results',
        commonQuestions: 'Common Questions',
        copyright: '© 2024 Greenmist. All rights reserved.',
        witnessFuture: 'Witness The Future',
        dronesDesigned: 'Drones designed for precision agriculture',
        innovationTitle: 'Innovation In Action',
        innovationSub: 'See how our technology transforms farming',
        cropCheckBen1: 'Real-time crop health monitoring',
        cropCheckBen2: 'Early disease detection',
        cropCheckBen3: 'Yield prediction',
        cropCheckBen4: 'Growth tracking',
        cropCheckBen5: 'Quality assessment',
        waterMonBen1: 'Precise irrigation mapping',
        waterMonBen2: 'Water usage optimization',
        waterMonBen3: 'Drought stress detection',
        waterMonBen4: 'Soil moisture analysis',
        waterMonBen5: 'Resource conservation',
        pestControlBen1: 'Targeted spraying',
        pestControlBen2: 'Reduced chemical usage',
        pestControlBen3: 'Environmental protection',
        pestControlBen4: 'Cost savings',
        pestControlBen5: 'Higher crop quality',
        faq1q: 'How does drone spraying work?',
        faq1a: 'Our drones use GPS and sensors to precisely spray crops, reducing waste and improving coverage.',
        faq2q: 'What areas do you cover?',
        faq2a: 'We operate across Tamil Nadu and can cover up to 50 acres per day.',
        faq3q: 'Is it safe for crops?',
        faq3a: 'Yes, our precision technology ensures optimal chemical application without crop damage.',
        faq4q: 'How do I book a service?',
        faq4a: 'Simply contact us through our form or call us directly to schedule a visit.',
    },
    ta: {
        home: 'முகப்பு',
        about: 'எங்களை பற்றி',
        services: 'சேவைகள்',
        contactUs: 'தொடர்பு கொள்ள',
        cropChecking: 'பயிர் சோதனை',
        waterMonitoring: 'நீர் கண்காணிப்பு',
        pestControl: 'பூச்சி கட்டுப்பாடு',
        cropMonitoring: 'பயிர் கண்காணிப்பு & தரவு பகுப்பாய்வு',
        plantHealth: 'தாவர ஆரோக்கிய மதிப்பீடு',
        landSurvey: 'நில அளவீடு & வரைபடம்',
        exploreNow: 'இப்போது ஆராயுங்கள்',
        closeDetails: 'விவரங்களை மூடு',
        precisionTitle: 'துல்லிய வேளாண்மை தீர்வுகள்',
        whyChoose: 'ஏன் தேர்வு செய்ய வேண்டும்',
        tradFarmingHard: 'பாரம்பரிய விவசாயம் கடினமானது. நாங்கள் அதை புத்திசாலியாக்குகிறோம்.',
        speed: 'வேகம்',
        fifteenMin: '15 நிமிடங்கள்',
        oneDay: '1 முழு நாள் கைவேலை',
        resources: 'வளங்கள்',
        moreWater: 'அதிக நீர் நுகர்வு',
        profit: 'லாபம்',
        inconsistentGrowth: 'சீரற்ற வளர்ச்சி',
        fasterResults: 'விரைவான முடிவுகள்',
        commonQuestions: 'பொதுவான கேள்விகள்',
        copyright: '© 2024 Greenmist. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
        witnessFuture: 'எதிர்காலத்தை காணுங்கள்',
        dronesDesigned: 'துல்லிய விவசாயத்திற்காக வடிவமைக்கப்பட்ட ட்ரோன்கள்',
        innovationTitle: 'செயலில் புதுமை',
        innovationSub: 'எங்கள் தொழில்நுட்பம் விவசாயத்தை எவ்வாறு மாற்றுகிறது என்பதைப் பாருங்கள்',
        cropCheckBen1: 'நேரடி பயிர் ஆரோக்கிய கண்காணிப்பு',
        cropCheckBen2: 'ஆரம்ப நோய் கண்டறிதல்',
        cropCheckBen3: 'விளைச்சல் கணிப்பு',
        cropCheckBen4: 'வளர்ச்சி கண்காணிப்பு',
        cropCheckBen5: 'தரம் மதிப்பீடு',
        waterMonBen1: 'துல்லியமான நீர்ப்பாசன வரைபடம்',
        waterMonBen2: 'நீர் பயன்பாட்டை மேம்படுத்துதல்',
        waterMonBen3: 'வறட்சி அழுத்தம் கண்டறிதல்',
        waterMonBen4: 'மண் ஈரப்பதம் பகுப்பாய்வு',
        waterMonBen5: 'வள பாதுகாப்பு',
        pestControlBen1: 'இலக்கு தெளிப்பு',
        pestControlBen2: 'குறைந்த இரசாயன பயன்பாடு',
        pestControlBen3: 'சுற்றுச்சூழல் பாதுகாப்பு',
        pestControlBen4: 'செலவு சேமிப்பு',
        pestControlBen5: 'உயர் பயிர் தரம்',
        faq1q: 'ட்ரோன் தெளிப்பு எவ்வாறு செயல்படுகிறது?',
        faq1a: 'எங்கள் ட்ரோன்கள் GPS மற்றும் சென்சார்களைப் பயன்படுத்தி துல்லியமாக பயிர்களை தெளிக்கின்றன.',
        faq2q: 'எந்த பகுதிகளை நீங்கள் உள்ளடக்குகிறீர்கள்?',
        faq2a: 'நாங்கள் தமிழ்நாடு முழுவதும் செயல்படுகிறோம், ஒரு நாளைக்கு 50 ஏக்கர் வரை கவர் செய்யலாம்.',
        faq3q: 'இது பயிர்களுக்கு பாதுகாப்பானதா?',
        faq3a: 'ஆம், எங்கள் துல்லிய தொழில்நுட்பம் பயிர் சேதமின்றி உகந்த இரசாயன பயன்பாட்டை உறுதி செய்கிறது.',
        faq4q: 'சேவையை எவ்வாறு முன்பதிவு செய்வது?',
        faq4a: 'எங்கள் படிவம் மூலம் அல்லது நேரடியாக அழைத்து வருகையை திட்டமிடுங்கள்.',
    }
};

function App() {
    const [lang, setLang] = useState(() => {
        const saved = localStorage.getItem('preferredLanguage');
        return saved || 'en';
    });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSelectLang = (newLang) => {
        setLang(newLang);
        localStorage.setItem('preferredLanguage', newLang);
    };

    return (
        <>
            {/* Enhancement Components */}
            <ScrollProgress />
            <Suspense fallback={null}>
                {!isMobile && <CustomCursor />}
            </Suspense>

            {/* Main App */}
            <Home
                lang={lang}
                onSelectLang={handleSelectLang}
            />
        </>
    );
}

export default App;
