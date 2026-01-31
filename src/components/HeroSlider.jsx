import React, { useEffect, useMemo, useState } from 'react';
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

// Floating particle component
const FloatingParticle = ({ delay, duration, size, left }) => (
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
);

const HeroSlider = ({ lang }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { t } = useTranslation(lang);
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const current = useMemo(() => slides[currentSlide], [currentSlide]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Parallax mouse effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;
            setMousePosition({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Generate particles
    const particles = useMemo(() => 
        Array.from({ length: 15 }, (_, i) => ({
            id: i,
            delay: i * 0.5,
            duration: 8 + Math.random() * 4,
            size: 4 + Math.random() * 8,
            left: Math.random() * 100,
        })),
    []);

    return (
        <div className="relative h-[55vh] sm:h-[60vh] md:h-[75vh] lg:h-[85vh] w-full overflow-hidden bg-black">
            {/* Floating Particles */}
            <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                {particles.map((particle) => (
                    <FloatingParticle key={particle.id} {...particle} />
                ))}
            </div>

            {/* Animated gradient overlay */}
            <motion.div 
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%)',
                }}
                animate={{
                    background: [
                        'radial-gradient(circle at 30% 30%, transparent 0%, rgba(0,0,0,0.3) 100%)',
                        'radial-gradient(circle at 70% 70%, transparent 0%, rgba(0,0,0,0.3) 100%)',
                        'radial-gradient(circle at 30% 30%, transparent 0%, rgba(0,0,0,0.3) 100%)',
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-primary-950/20 z-10" />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.img
                            src={slides[currentSlide].image}
                            alt="Slide"
                            loading={currentSlide === 0 ? "eager" : "lazy"}
                            fetchPriority={currentSlide === 0 ? "high" : "auto"}
                            decoding="async"
                            className="w-full h-full object-cover"
                            style={{ 
                                objectPosition: 'center 5%',
                                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.05)`,
                            }}
                            onLoad={() => setIsLoaded(true)}
                            onError={() => setIsLoaded(true)}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`content-${currentSlide}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <motion.h1 
                                className="text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-2xl text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl uppercase tracking-tight leading-tight"
                                style={{
                                    textShadow: '0 4px 30px rgba(0,0,0,0.5)',
                                }}
                            >
                                {t(current.titleKey)}
                            </motion.h1>

                            <motion.p 
                                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/95 mb-4 sm:mb-6 md:mb-8 font-medium tracking-wide max-w-3xl mx-auto leading-relaxed px-2 sm:px-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {t(current.subtitleKey)}
                            </motion.p>
                        </motion.div>
                    </AnimatePresence>

                    <motion.button
                        type="button"
                        onClick={scrollToContact}
                        className="group relative px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 lg:px-10 lg:py-4 bg-primary-600 text-white rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-black overflow-hidden shadow-xl uppercase tracking-wider sm:tracking-widest"
                        whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {t('contactUs')}
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </span>
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-primary-900 to-emerald-600"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                </div>
            </div>

            {/* Enhanced Dots with progress indicator */}
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

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-30"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
                    <motion.div
                        className="w-1 h-2 bg-white rounded-full"
                        animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default HeroSlider;
