import React, { useEffect, useMemo, useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../utils/i18n';

const slides = [
    {
        id: 1,
        image: '/images/hero slider 1 new.png',
        titleKey: 'heroTitle',
        subtitleKey: 'heroSubtitle',
    },
    {
        id: 2,
        image: '/images/water_monitoring.webp',
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

// Preload images utility
const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
    });
};

// Floating particle component - memoized
const FloatingParticle = React.memo(({ delay, duration, size, left }) => (
    <motion.div
        className="absolute rounded-full bg-emerald-400/30 blur-sm"
        style={{ width: size, height: size, left: `${left}%` }}
        initial={{ y: '100vh', opacity: 0 }}
        animate={{
            y: '-100px',
            opacity: [0, 1, 1, 0],
        }}
        transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: 'linear',
        }}
    />
));

const HeroSlider = ({ lang }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { t } = useTranslation(lang);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [firstImageLoaded, setFirstImageLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const current = useMemo(() => slides[currentSlide], [currentSlide]);

    // Preload first image immediately, then others
    useEffect(() => {
        // Load first image with high priority
        preloadImage(slides[0].image)
            .then(() => setFirstImageLoaded(true))
            .catch(() => setFirstImageLoaded(true));

        // Preload remaining images in background
        const preloadRest = async () => {
            const promises = slides.slice(1).map(slide => preloadImage(slide.image));
            await Promise.allSettled(promises);
            setImagesLoaded(true);
        };
        
        // Delay loading other images until first is ready
        const timer = setTimeout(preloadRest, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!firstImageLoaded) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [firstImageLoaded]);

    // Throttled parallax mouse effect
    useEffect(() => {
        let rafId;
        const handleMouseMove = (e) => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * 20;
                const y = (clientY / window.innerHeight - 0.5) * 20;
                setMousePosition({ x, y });
                rafId = null;
            });
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    const scrollToContact = useCallback(() => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    // Generate particles - reduced count for performance
    const particles = useMemo(() => 
        Array.from({ length: 8 }, (_, i) => ({
            id: i,
            delay: i * 0.8,
            duration: 8 + Math.random() * 4,
            size: 4 + Math.random() * 8,
            left: Math.random() * 100,
        })),
    []);

    return (
        <div className="relative h-[55vh] sm:h-[60vh] md:h-[75vh] lg:h-[85vh] w-full overflow-hidden bg-gradient-to-b from-primary-900 to-primary-950">
            {/* Placeholder gradient shown while loading */}
            {!firstImageLoaded && (
                <div className="absolute inset-0 z-50 bg-gradient-to-br from-primary-800 via-primary-900 to-emerald-900 animate-pulse" />
            )}

            {/* Floating Particles - only render after first image loads */}
            {firstImageLoaded && (
                <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                    {particles.map((particle) => (
                        <FloatingParticle key={particle.id} {...particle} />
                    ))}
                </div>
            )}

            {/* Simplified gradient overlay */}
            <div 
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%)',
                }}
            />

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-primary-950/20 z-10" />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={slides[currentSlide].image}
                            alt="Slide"
                            loading={currentSlide === 0 ? "eager" : "lazy"}
                            fetchPriority={currentSlide === 0 ? "high" : "auto"}
                            decoding="async"
                            className="w-full h-full object-cover will-change-transform"
                            style={{ 
                                objectPosition: 'center 5%',
                                transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale(1.05)`,
                            }}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`content-${currentSlide}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Title - Montserrat Bold */}
                            <h1 
                                className="text-white mb-1 sm:mb-3 md:mb-4 drop-shadow-2xl text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl uppercase tracking-tight leading-tight font-bold"
                                style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontWeight: 700,
                                    textShadow: '0 4px 30px rgba(0,0,0,0.5)',
                                }}
                            >
                                {t(current.titleKey)}
                            </h1>

                            {/* Subtitle - Montserrat SemiBold */}
                            <p 
                                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/95 mb-4 sm:mb-6 md:mb-8 tracking-wide max-w-3xl mx-auto leading-relaxed px-2 sm:px-4"
                                style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontWeight: 600,
                                }}
                            >
                                {t(current.subtitleKey)}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Button - Montserrat Bold */}
                    <motion.button
                        type="button"
                        onClick={scrollToContact}
                        className="group relative px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 lg:px-10 lg:py-4 bg-primary-600 text-white rounded-full text-xs sm:text-sm md:text-base lg:text-lg overflow-hidden shadow-xl uppercase tracking-wider sm:tracking-widest"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 700,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {t('contactUs')}
                            <span>→</span>
                        </span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        type="button"
                        aria-label={`Go to slide ${index + 1}`}
                        className="relative h-1 sm:h-1.5 rounded-full overflow-hidden bg-white/30 transition-all duration-300"
                        style={{ width: index === currentSlide ? '4rem' : '2rem' }}
                    >
                        {index === currentSlide && (
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-primary-500"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 5, ease: 'linear' }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default memo(HeroSlider);