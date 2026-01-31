import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '../utils/i18n';

const slides = [
    {
        id: 1,
        image: '/images/hero slider 1 new.png', // New portrait image
        titleKey: 'heroTitle',
        subtitleKey: 'heroSubtitle',
    },
    {
        id: 2,
        image: '/images/water_monitoring.webp', // New comparison image
        titleKey: 'farmProtection',
        subtitleKey: 'farmProtectionSub',
    },
    {
        id: 3,
        image: '/images/seed_spraying.webp',
        titleKey: 'seedSpraying',
        subtitleKey: 'seedSprayingSub',
    },
];

const HeroSlider = ({ lang }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { t } = useTranslation(lang);
    const [isLoaded, setIsLoaded] = useState(false);

    const current = useMemo(() => slides[currentSlide], [currentSlide]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <div className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden bg-black">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-primary-950/20 z-10" />
                <div
                    className="flex h-full w-full transition-transform duration-[900ms] ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div key={slide.id} className="min-w-full h-full relative">
                            <img
                                src={slide.image}
                                alt="Slide"
                                loading={index === 0 ? "eager" : "lazy"}
                                fetchPriority={index === 0 ? "high" : "auto"}
                                decoding="async"
                                className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
                                style={{ objectPosition: 'center 5%' }}
                                onLoad={() => setIsLoaded(true)}
                                onError={() => setIsLoaded(true)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-white mb-2 md:mb-4 drop-shadow-2xl text-2xl sm:text-3xl md:text-5xl uppercase tracking-tight leading-tight">
                        {t(current.titleKey)}
                    </h1>

                    <p className="text-sm sm:text-base md:text-xl text-white/95 mb-6 md:mb-8 font-medium tracking-wide max-w-3xl mx-auto leading-relaxed px-4">
                        {t(current.subtitleKey)}
                    </p>

                    <button
                        type="button"
                        onClick={scrollToContact}
                        className="group relative px-6 py-3 md:px-10 md:py-4 bg-primary-600 text-white rounded-full text-sm md:text-lg font-black overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 active:scale-95 uppercase tracking-widest"
                    >
                        <span className="relative z-10">{t('contactUs')}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-emerald-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                    </button>
                </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        type="button"
                        aria-label={`Go to slide ${index + 1}`}
                        className={`w-12 h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? 'bg-primary-500 w-24' : 'bg-white/30'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
