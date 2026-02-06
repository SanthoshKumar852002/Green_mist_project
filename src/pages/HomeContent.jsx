import React, { useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import TypewriterText from '../components/TypewriterText';

const ContactSection = React.lazy(() => import('../components/ContactSection'));
const ROICalculator = React.lazy(() => import('../components/ROICalculator'));
const ScrollVideo = React.lazy(() => import('../components/ScrollVideo'));

// Magnetic hover effect component
const MagneticCard = ({ children, className, onClick }) => {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const ref = React.useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 10;
        const y = (e.clientY - rect.top - rect.height / 2) / 10;
        setPosition({ x, y });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setPosition({ x: 0, y: 0 });
    }, []);

    return (
        <motion.div
            ref={ref}
            className={className}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
            {children}
        </motion.div>
    );
};

const HomeContent = ({ lang, t }) => {
    const [selectedFeatureId, setSelectedFeatureId] = React.useState(null);
    const containerRef = React.useRef(null);
    const whyChooseRef = React.useRef(null);
    const benefitsRef = React.useRef(null);

    const { scrollYProgress: whyChooseScroll } = useScroll({
        target: whyChooseRef,
        offset: ["start end", "end start"]
    });

    const badgeY = useTransform(whyChooseScroll, [0, 1], [20, -100]);
    const imgY = useTransform(whyChooseScroll, [0, 1], ["-5%", "5%"]);

    const interactiveFeatures = React.useMemo(() => [
        {
            id: 'crop',
            label: t('cropChecking'),
            image: '/images/crop_checking.webp',
            desc: "Advanced multispectral sensors track crop health in real-time.",
            descTa: "அதிநவீன சென்சார்கள் மூலம் பயிர் வளர்ச்சியை நேரலையாக கண்காணிக்கவும்.",
            benefits: [t('cropCheckBen1'), t('cropCheckBen2'), t('cropCheckBen3'), t('cropCheckBen4'), t('cropCheckBen5')],
        },
        {
            id: 'water',
            label: t('waterMonitoring'),
            image: '/images/water_monitoring.webp',
            desc: "Optimize water usage with precise moisture mapping.",
            descTa: "துல்லியமான வரைபடங்கள் மூலம் நீர் பயன்பாட்டை மேம்படுத்தவும்.",
            benefits: [t('waterMonBen1'), t('waterMonBen2'), t('waterMonBen3'), t('waterMonBen4'), t('waterMonBen5')],
        },
        {
            id: 'pest',
            label: t('pestControl'),
            image: '/images/pest_control.webp',
            desc: "Targeted spraying reduces chemical waste and protects the soil.",
            descTa: "குறிப்பிட்ட இடத்தில் மட்டும் தெளிப்பதன் மூலம் உரச் சேமிப்பு மற்றும் மண் பாதுகாப்பு.",
            benefits: [t('pestControlBen1'), t('pestControlBen2'), t('pestControlBen3'), t('pestControlBen4'), t('pestControlBen5')],
        },
        {
            id: 'crop_monitoring',
            label: t('cropMonitoring'),
            image: '/images/crop_monitoring.webp',
            desc: t('cropMonitoringDesc'),
            descTa: t('cropMonitoringDesc'),
            benefits: [t('cropBen1'), t('cropBen2'), t('cropBen3'), t('cropBen4')],
        },
        {
            id: 'plant_health',
            label: t('plantHealth'),
            image: '/images/plant_health.webp',
            desc: t('plantHealthDesc'),
            descTa: t('plantHealthDesc'),
            benefits: [t('plantBen1'), t('plantBen2'), t('plantBen3'), t('plantBen4')],
        },
        {
            id: 'land_survey',
            label: t('landSurvey'),
            image: '/images/land_survey.webp',
            desc: t('landSurveyDesc'),
            descTa: t('landSurveyDesc'),
            benefits: [t('landBen1'), t('landBen2'), t('landBen3'), t('landBen4')],
        }
    ], [lang, t]);

    const selectedFeature = React.useMemo(() =>
        interactiveFeatures.find(f => f.id === selectedFeatureId),
        [selectedFeatureId, interactiveFeatures]
    );

    React.useEffect(() => {
        if (selectedFeatureId) {
            setSelectedFeatureId(prev => prev);
        }
    }, [lang]);

    return (
        <>
            {/* Interactive Feature Exploration */}
            <section id="about" ref={containerRef} className="py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-primary-50/30 relative overflow-hidden">
                {/* Floating background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"
                        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"
                        animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
                        transition={{ duration: 12, repeat: Infinity }}
                    />
                </div>

                <div className="container mx-auto max-w-[1400px] relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                        }}
                        className="mb-8 sm:mb-10 md:mb-14 lg:mb-16 text-center"
                    >
                        <motion.span
                            className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            {lang === 'ta' ? 'எங்கள் சேவைகள்' : 'Our Services'}
                        </motion.span>
                        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-primary-900 uppercase tracking-tight mb-3 sm:mb-4 break-words leading-tight px-2">
                            <TypewriterText text={t('precisionTitle')} wordSpacing="0.25em" />
                        </h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "6rem" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="h-1 sm:h-1.5 md:h-2 bg-gradient-to-r from-primary-500 to-emerald-500 mx-auto rounded-full"
                        />
                    </motion.div>

                    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                        {interactiveFeatures.map((f, i) => (
                            <MagneticCard
                                key={f.id}
                                className="group cursor-pointer"
                                onClick={() => {
                                    setSelectedFeatureId(f.id);
                                    setTimeout(() => benefitsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    className="relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[20px] lg:rounded-[24px] shadow-lg transition-all duration-500 group-hover:shadow-2xl"
                                >
                                    <img
                                        src={f.image}
                                        alt={f.label}
                                        loading="lazy"
                                        className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-primary-900/40 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-transparent">
                                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
                                            <motion.div
                                                className="inline-block w-8 h-1 rounded-full bg-primary-500 mb-2"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: 32 }}
                                                viewport={{ once: true }}
                                            />
                                            <h3 className="text-xs sm:text-sm md:text-base font-black text-white uppercase tracking-tight drop-shadow-lg">
                                                {f.label}
                                            </h3>
                                        </div>
                                    </div>
                                    {/* Hover state */}
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                    >
                                        <motion.span
                                            className="bg-white text-primary-900 px-4 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 rounded-full font-black uppercase tracking-widest text-[10px] sm:text-xs shadow-xl"
                                            initial={{ scale: 0.8, y: 20 }}
                                            whileHover={{ scale: 1, y: 0 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            {t('exploreNow')} →
                                        </motion.span>
                                    </motion.div>
                                    {/* Corner accent */}
                                    <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-primary-500 opacity-80 group-hover:scale-150 transition-transform" />
                                </motion.div>
                            </MagneticCard>
                        ))}
                    </div>

                    {/* Quick Explanation Modal/Section */}
                    <AnimatePresence mode="wait">
                        {selectedFeature && (
                            <motion.div
                                key={`${selectedFeatureId}-${lang}`}
                                ref={benefitsRef}
                                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                                className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-primary-50 to-white rounded-xl sm:rounded-2xl md:rounded-[24px] lg:rounded-[32px] border border-primary-100 overflow-hidden shadow-2xl scroll-mt-20 sm:scroll-mt-24"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="relative"
                                    >
                                        <img
                                            src={selectedFeature.image}
                                            loading="lazy"
                                            className="rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl aspect-video object-cover w-full"
                                            alt="Feature"
                                        />
                                        {/* Decorative badge */}
                                        <motion.div
                                            className="absolute -bottom-3 -right-3 w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg"
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ delay: 0.5, type: "spring" }}
                                        >
                                            <span className="text-white text-2xl">✓</span>
                                        </motion.div>
                                    </motion.div>
                                    <div>
                                        <motion.div
                                            className="inline-block w-12 h-1 rounded-full bg-primary-500 mb-3"
                                            initial={{ width: 0 }}
                                            animate={{ width: 48 }}
                                        />
                                        <h4 className="text-base sm:text-lg md:text-xl font-black text-primary-900 mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
                                            {selectedFeature.label}
                                        </h4>
                                        <p className="text-sm sm:text-base text-primary-800 leading-relaxed font-medium mb-4">
                                            {lang === 'ta' ? selectedFeature.descTa : selectedFeature.desc}
                                        </p>
                                        {selectedFeature.benefits && (
                                            <motion.div
                                                key={`benefits-${lang}`}
                                                initial="hidden"
                                                animate="visible"
                                                variants={{
                                                    visible: {
                                                        transition: {
                                                            staggerChildren: 0.1
                                                        }
                                                    }
                                                }}
                                                className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8"
                                            >
                                                {selectedFeature.benefits.map((ben, idx) => (
                                                    <motion.div
                                                        key={`${lang}-${selectedFeatureId}-${idx}`}
                                                        variants={{
                                                            hidden: { opacity: 0, x: -20 },
                                                            visible: { opacity: 1, x: 0 }
                                                        }}
                                                        whileHover={{ scale: 1.02, x: 5 }}
                                                        className="flex items-start gap-2 sm:gap-3 md:gap-4 bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-primary-100 group/ben transition-all duration-300 hover:bg-primary-50 hover:border-primary-300 hover:shadow-md cursor-pointer"
                                                    >
                                                        <motion.div
                                                            className="h-2 w-2 rounded-full bg-primary-500 flex-shrink-0 mt-1.5"
                                                            whileHover={{ scale: 1.5 }}
                                                        />
                                                        <span className="text-xs sm:text-sm md:text-base text-primary-900 font-semibold leading-relaxed">
                                                            {ben}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                        <motion.button
                                            type="button"
                                            onClick={() => setSelectedFeatureId(null)}
                                            className="mt-4 sm:mt-6 md:mt-8 text-primary-600 font-black uppercase tracking-widest hover:text-primary-900 transition-colors text-xs sm:text-sm flex items-center gap-2 group"
                                            whileHover={{ x: -5 }}
                                        >
                                            <span className="group-hover:-translate-x-1 transition-transform">←</span>
                                            {t('closeDetails')}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <React.Suspense fallback={<div className="h-48 sm:h-56 md:h-64 bg-primary-950/5 animate-pulse" />}>
                <div className="bg-primary-900 py-6 sm:py-8 md:py-10 lg:py-12 relative">
                    <ScrollVideo
                        src="/videos/drone video greenmist.mp4"
                        title={t('witnessFuture')}
                        subtitle={t('dronesDesigned')}
                    />
                    <div className="h-6 sm:h-8 md:h-10 lg:h-12"></div>
                    <ScrollVideo
                        src="/videos/sample video drone.mp4"
                        title={t('innovationTitle')}
                        subtitle={t('innovationSub')}
                    />
                </div>
            </React.Suspense>

            <section id="services" ref={whyChooseRef} className="py-10 sm:py-12 md:py-14 lg:py-16 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(52, 211, 153, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)'
                        }}
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                        }}
                        transition={{ duration: 20, repeat: Infinity }}
                    />
                </div>

                <div className="container mx-auto max-w-6xl relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-16 lg:gap-24 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0, x: -50 },
                                visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
                            }}
                        >
                            <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
                                <CompareItem
                                    label={t('speed')}
                                    drone={t('fifteenMin') + " / " + (lang === 'ta' ? "ஏக்கர்" : "acre")}
                                    trad={t('oneDay')}
                                    delay={0.6}
                                />
                                <CompareItem
                                    label={t('resources')}
                                    drone={"90% " + (lang === 'ta' ? "குறைந்த நீர்" : "less water")}
                                    trad={t('moreWater')}
                                    delay={0.8}
                                />
                                <CompareItem
                                    label={t('profit')}
                                    drone={"30% " + (lang === 'ta' ? "அதிக விளைச்சல்" : "higher yields")}
                                    trad={t('inconsistentGrowth') || "Inconsistent growth"}
                                    delay={1}
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative overflow-hidden rounded-2xl sm:rounded-[30px] md:rounded-[40px]"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <motion.img
                                style={{ y: imgY }}
                                src="/images/hero slider 1 new.png"
                                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700 aspect-square md:aspect-auto object-cover"
                                alt="DroneTech"
                                loading="lazy"
                                decoding="async"
                            />
                            {/* Animated border */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl sm:rounded-[30px] md:rounded-[40px] border-2 border-emerald-400/30"
                                animate={{
                                    borderColor: ['rgba(52, 211, 153, 0.3)', 'rgba(20, 184, 166, 0.3)', 'rgba(52, 211, 153, 0.3)'],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <motion.div
                                style={{ y: badgeY }}
                                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 md:-bottom-10 md:-left-10 bg-gradient-to-br from-primary-600 to-primary-700 p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl md:rounded-[30px] lg:rounded-[40px] shadow-2xl z-20 border border-white/10"
                            >
                                <motion.p
                                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-0.5 sm:mb-1 leading-none bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    10x
                                </motion.p>
                                <p className="font-bold uppercase tracking-widest text-[6px] sm:text-[8px] md:text-xs opacity-80">{t('fasterResults')}</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <React.Suspense fallback={<div className="h-40 sm:h-48 bg-primary-50 animate-pulse" />}>
                <ROICalculator lang={lang} />
            </React.Suspense>

            <React.Suspense fallback={<div className="h-40 sm:h-48 bg-white animate-pulse" />}>
                <div id="contact">
                    <ContactSection lang={lang} />
                </div>
            </React.Suspense>

            <footer className="bg-primary-950 py-6 sm:py-8 md:py-10 lg:py-12 text-center px-4 relative overflow-hidden">
                {/* Animated gradient background */}
                <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
                <div className="container mx-auto relative">
                    {/* SEO Content Section */}
                    <div className="max-w-4xl mx-auto mb-12 px-4 text-left">
                        <div className="bg-primary-800/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-primary-700/30">
                            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
                                {lang === 'ta' ? 'தமிழ்நாட்டின் முன்னணி வேளாண் ட்ரோன் சேவை' : 'Leading Agricultural Drone Service in Tamil Nadu'}
                            </h2>
                            <div className="text-primary-200 text-sm sm:text-base space-y-3 leading-relaxed">
                                <p>
                                    {lang === 'ta' 
                                        ? 'GREENMIST வேளாண் ட்ரோன் சேவைகள் தமிழ்நாடு முழுவதும் துல்லிய விவசாய தீர்வுகளை வழங்குகிறது. எங்கள் அதிநவீன ட்ரோன் தொழில்நுட்பம் பயிர் தெளிப்பு, ஆரோக்கிய கண்காணிப்பு, விதை விதைப்பு மற்றும் நில ஆய்வு ஆகியவற்றை உள்ளடக்கியது.'
                                        : 'GREENMIST Agricultural Drone Services provides precision farming solutions across Tamil Nadu. Our advanced drone technology covers crop spraying, health monitoring, seed sowing, and land surveying to help farmers increase yields while reducing costs.'}
                                </p>
                                <p>
                                    {lang === 'ta'
                                        ? 'நாங்கள் நாமக்கல், சேலம் மற்றும் ஈரோடு மாவட்டங்களில் விவசாயிகளுக்கு சேவை செய்கிறோம்.'
                                        : 'We serve farmers in Namakkal, Salem, and Erode districts.'}
                                </p>
                            </div>
                            
                            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl sm:text-3xl font-black text-emerald-400">50+</div>
                                    <div className="text-xs text-primary-300">{lang === 'ta' ? 'ஏக்கர்/நாள்' : 'Acres/Day'}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl sm:text-3xl font-black text-emerald-400">30%</div>
                                    <div className="text-xs text-primary-300">{lang === 'ta' ? 'செலவு சேமிப்பு' : 'Cost Savings'}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl sm:text-3xl font-black text-emerald-400">90%</div>
                                    <div className="text-xs text-primary-300">{lang === 'ta' ? 'நீர் சேமிப்பு' : 'Water Saved'}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl sm:text-3xl font-black text-emerald-400">127+</div>
                                    <div className="text-xs text-primary-300">{lang === 'ta' ? 'திருப்தியான வாடிக்கையாளர்கள்' : 'Happy Farmers'}</div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-primary-700/50">
                                <h3 className="text-sm font-bold text-white mb-2">{lang === 'ta' ? 'எங்களை தொடர்பு கொள்ள:' : 'Contact Us:'}</h3>
                                <div className="text-primary-200 text-sm space-y-1">
                                    <p>📞 +91 78999 78869 | +91 91503 95864 | +91 90039 92693</p>
                                    <p>📍 Manickampalayam, Tiruchengode, Tamil Nadu 637202</p>
                                    <p>🌐 greenmist.net</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        className="flex items-center justify-center gap-2 mb-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="relative h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-full animate-glow opacity-80 hover:opacity-100 transition-opacity">
                            <img
                                src="/images/logo_round.png"
                                className="absolute inset-x-0 top-0 w-full h-auto object-cover origin-top"
                                alt="Logo"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <span className="text-lg sm:text-xl font-black tracking-tight text-white/40 hover:text-white/60 transition-colors">GREENMIST</span>
                    </motion.div>
                    <p className="text-primary-400 font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs">© 2026 Green Mist. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    );
};

const CompareItem = ({ label, drone, trad, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        whileHover={{ x: 10 }}
        className="border-l-4 border-emerald-500/50 pl-4 sm:pl-6 md:pl-8 group cursor-pointer"
    >
        <div className="flex items-center gap-2 mb-1">
            <p className="text-primary-400 text-xs sm:text-sm font-black uppercase tracking-widest group-hover:text-emerald-400 transition-colors">
                <TypewriterText text={label} delay={delay + 0.2} />
            </p>
        </div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white group-hover:translate-x-2 transition-transform">
            <TypewriterText text={drone} delay={delay + 0.5} />
        </p>
        <p className="text-primary-300 text-xs sm:text-sm md:text-base line-through opacity-60">
            <TypewriterText text={trad} delay={delay + 0.8} />
        </p>
    </motion.div>
);

export default HomeContent;