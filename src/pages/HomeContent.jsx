import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import TypewriterText from '../components/TypewriterText';

const ContactSection = React.lazy(() => import('../components/ContactSection'));
const ROICalculator = React.lazy(() => import('../components/ROICalculator'));
const ScrollVideo = React.lazy(() => import('../components/ScrollVideo'));

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
            benefits: [t('cropCheckBen1'), t('cropCheckBen2'), t('cropCheckBen3'), t('cropCheckBen4'), t('cropCheckBen5')]
        },
        {
            id: 'water',
            label: t('waterMonitoring'),
            image: '/images/water_monitoring.webp',
            desc: "Optimize water usage with precise moisture mapping.",
            descTa: "துல்லியமான வரைபடங்கள் மூலம் நீர் பயன்பாட்டை மேம்படுத்தவும்.",
            benefits: [t('waterMonBen1'), t('waterMonBen2'), t('waterMonBen3'), t('waterMonBen4'), t('waterMonBen5')]
        },
        {
            id: 'pest',
            label: t('pestControl'),
            image: '/images/pest_control.webp',
            desc: "Targeted spraying reduces chemical waste and protects the soil.",
            descTa: "குறிப்பிட்ட இடத்தில் மட்டும் தெளிப்பதன் மூலம் உரச் சேமிப்பு மற்றும் மண் பாதுகாப்பு.",
            benefits: [t('pestControlBen1'), t('pestControlBen2'), t('pestControlBen3'), t('pestControlBen4'), t('pestControlBen5')]
        },
        {
            id: 'crop_monitoring',
            label: t('cropMonitoring'),
            image: '/images/crop_monitoring.webp',
            desc: t('cropMonitoringDesc'),
            descTa: t('cropMonitoringDesc'),
            benefits: [t('cropBen1'), t('cropBen2'), t('cropBen3'), t('cropBen4')]
        },
        {
            id: 'plant_health',
            label: t('plantHealth'),
            image: '/images/plant_health.webp',
            desc: t('plantHealthDesc'),
            descTa: t('plantHealthDesc'),
            benefits: [t('plantBen1'), t('plantBen2'), t('plantBen3'), t('plantBen4')]
        },
        {
            id: 'land_survey',
            label: t('landSurvey'),
            image: '/images/land_survey.webp',
            desc: t('landSurveyDesc'),
            descTa: t('landSurveyDesc'),
            benefits: [t('landBen1'), t('landBen2'), t('landBen3'), t('landBen4')]
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

    const scrollToBenefits = () => {
        benefitsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <>
            {/* Interactive Feature Exploration */}
            <section id="about" ref={containerRef} className="py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
                <div className="container mx-auto max-w-[1400px]">
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
                        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-primary-900 uppercase tracking-tight mb-3 sm:mb-4 break-words leading-tight px-2">
                            <TypewriterText text={t('precisionTitle')} wordSpacing="0.25em" />
                        </h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "6rem" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="h-1 sm:h-1.5 md:h-2 bg-primary-600 mx-auto"
                        ></motion.div>
                    </motion.div>

                    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                        {interactiveFeatures.map((f, i) => (
                            <motion.div
                                key={f.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group cursor-pointer"
                                onClick={() => {
                                    setSelectedFeatureId(f.id);
                                    setTimeout(() => benefitsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
                                }}
                            >
                                <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[20px] lg:rounded-[24px] shadow-lg transition-all duration-500 group-hover:-translate-y-1">
                                    <img
                                        src={f.image}
                                        alt={f.label}
                                        loading="lazy"
                                        className="w-full h-full object-cover object-center transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent">
                                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
                                            <h3 className="text-xs sm:text-sm md:text-base font-black text-white uppercase tracking-tight drop-shadow-lg">
                                                {f.label}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-primary-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 sm:p-6 md:p-8">
                                        <span className="bg-white text-primary-900 px-4 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 rounded-full font-black uppercase tracking-widest text-[10px] sm:text-xs">
                                            {t('exploreNow')}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Explanation Modal/Section */}
                    <AnimatePresence mode="wait">
                        {selectedFeature && (
                            <motion.div
                                key={`${selectedFeatureId}-${lang}`}
                                ref={benefitsRef}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 p-4 sm:p-6 md:p-8 bg-primary-50 rounded-xl sm:rounded-2xl md:rounded-[24px] lg:rounded-[32px] border border-primary-100 overflow-hidden shadow-xl scroll-mt-20 sm:scroll-mt-24"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
                                    <img
                                        src={selectedFeature.image}
                                        loading="lazy"
                                        className="rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl aspect-video object-cover w-full"
                                        alt="Feature"
                                    />
                                    <div>
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
                                                            staggerChildren: 0.15
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
                                                        className="flex items-start gap-2 sm:gap-3 md:gap-4 bg-white/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-primary-100 group/ben transition-all duration-300 hover:bg-primary-50 hover:border-primary-300"
                                                    >
                                                        <div className="h-2 w-2 rounded-full bg-primary-500 flex-shrink-0 mt-1.5" />
                                                        <span className="text-xs sm:text-sm md:text-base text-primary-900 font-semibold leading-relaxed">
                                                            {ben}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => setSelectedFeatureId(null)}
                                            className="mt-4 sm:mt-6 md:mt-8 text-primary-600 font-black uppercase tracking-widest hover:text-primary-900 transition-colors text-xs sm:text-sm"
                                        >
                                            {t('closeDetails')}
                                        </button>
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

            <section id="services" ref={whyChooseRef} className="py-10 sm:py-12 md:py-14 lg:py-16 bg-primary-700 text-white px-4 sm:px-6 lg:px-8 relative">
                <div className="container mx-auto max-w-6xl">
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
                            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black mb-3 sm:mb-4 md:mb-6 uppercase tracking-tight leading-loose break-words">
                                <TypewriterText text={t('whyChoose')} wordSpacing="0.25em" /> <span className="text-primary-500">Greenmist?</span>
                            </h2>
                            <p className="text-primary-100/70 text-sm sm:text-base mb-6 sm:mb-8 md:mb-10 lg:mb-12 font-medium leading-relaxed">
                                <TypewriterText text={t('tradFarmingHard')} delay={0.5} />
                            </p>

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
                        <div className="relative overflow-hidden rounded-2xl sm:rounded-[30px] md:rounded-[40px]">
                            <motion.img
                                style={{ y: imgY }}
                                src="/images/hero slider 1 new.png"
                                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700 aspect-square md:aspect-auto object-cover"
                                alt="DroneTech"
                                loading="lazy"
                                decoding="async"
                            />
                            <motion.div
                                style={{ y: badgeY }}
                                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 md:-bottom-10 md:-left-10 bg-primary-600 p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl md:rounded-[30px] lg:rounded-[40px] shadow-2xl z-20"
                            >
                                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-0.5 sm:mb-1 leading-none">10x</p>
                                <p className="font-bold uppercase tracking-widest text-[6px] sm:text-[8px] md:text-xs opacity-80">{t('fasterResults')}</p>
                            </motion.div>
                        </div>
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

            <footer className="bg-primary-950 py-6 sm:py-8 md:py-10 lg:py-12 text-center px-4">
                <div className="container mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="relative h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-full animate-green-glow opacity-80 hover:opacity-100 transition-opacity">
                            <img
                                src="/images/logo_round.png"
                                className="absolute inset-x-0 top-0 w-full h-auto object-cover origin-top"
                                alt="Logo"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <span className="text-lg sm:text-xl font-black tracking-tight text-white/40">GREENMIST</span>
                    </div>
                    <p className="text-primary-400 font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs">{t('copyright')}</p>
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
        className="border-l-4 border-primary-800 pl-4 sm:pl-6 md:pl-8 group"
    >
        <p className="text-primary-400 text-xs sm:text-sm font-black uppercase tracking-widest mb-1 group-hover:text-primary-100 transition-colors">
            <TypewriterText text={label} delay={delay + 0.2} />
        </p>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white group-hover:translate-x-2 transition-transform">
            <TypewriterText text={drone} delay={delay + 0.5} />
        </p>
        <p className="text-primary-300 text-xs sm:text-sm md:text-base line-through opacity-80">
            <TypewriterText text={trad} delay={delay + 0.8} />
        </p>
    </motion.div>
);

const SimpleFaq = ({ question, answer, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="p-4 sm:p-6 md:p-8 bg-primary-50 rounded-xl sm:rounded-2xl md:rounded-[24px] border border-primary-100 hover:bg-white hover:shadow-xl transition-all group"
    >
        <h4 className="text-base sm:text-lg font-black text-primary-900 mb-2">
            <TypewriterText text={question} delay={delay + 0.5} />
        </h4>
        <p className="text-sm sm:text-base text-primary-700 font-medium">
            <TypewriterText text={answer} delay={delay + 0.8} />
        </p>
    </motion.div>
);

export default HomeContent;