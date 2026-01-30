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

    const interactiveFeatures = [
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
            benefits: lang === 'ta' ? [t('landBen1'), t('landBen2'), t('landBen3')] : [t('landBen1'), t('landBen2'), t('landBen3'), t('landBen4')]
        }
    ];

    const selectedFeature = React.useMemo(() =>
        interactiveFeatures.find(f => f.id === selectedFeatureId),
        [selectedFeatureId, interactiveFeatures] // interactiveFeatures changes when lang changes
    );

    const scrollToBenefits = () => {
        benefitsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <>
            {/* Interactive Feature Exploration */}
            <section id="about" ref={containerRef} className="py-12 md:py-20 px-4 bg-white relative">
                <div className="container mx-auto max-w-[1400px]">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                        }}
                        className="mb-8 md:mb-16 text-center"
                    >
                        <h2 className="text-base sm:text-lg md:text-2xl font-black text-primary-900 uppercase tracking-tight mb-3 break-words leading-tight">
                            <TypewriterText text={t('precisionTitle')} wordSpacing="0.25em" />
                        </h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "8rem" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="h-1.5 md:h-2 bg-primary-600 mx-auto"
                        ></motion.div>
                    </motion.div>

                    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
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
                                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] md:rounded-[24px] shadow-lg transition-all duration-500 group-hover:-translate-y-1">
                                    <img
                                        src={f.image}
                                        alt={f.label}
                                        loading="lazy"
                                        className="w-full h-full object-cover object-center transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent">
                                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                                            <h3 className="text-sm md:text-base font-black text-white uppercase tracking-tight drop-shadow-lg">
                                                {f.label}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-primary-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 md:p-8">
                                        <span className="bg-white text-primary-900 px-6 py-2 md:px-8 md:py-3 rounded-full font-black uppercase tracking-widest text-xs">
                                            {t('exploreNow')}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Explanation Modal/Section */}
                    <AnimatePresence>
                        {selectedFeature && (
                            <motion.div
                                ref={benefitsRef}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-8 md:mt-12 p-6 md:p-8 bg-primary-50 rounded-[24px] md:rounded-[32px] border border-primary-100 overflow-hidden shadow-xl scroll-mt-24"
                            >
                                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                                    <img src={selectedFeature.image} loading="lazy" className="rounded-2xl md:rounded-3xl shadow-xl aspect-video object-cover" alt="Feature" />
                                    <div>
                                        <h4 className="text-lg md:text-xl font-black text-primary-900 mb-3 md:mb-4 uppercase tracking-tight">{selectedFeature.label}</h4>
                                        <p className="text-sm md:text-base text-primary-800 leading-relaxed font-medium mb-4">
                                            {lang === 'ta' ? selectedFeature.descTa : selectedFeature.desc}
                                        </p>
                                        {selectedFeature.benefits && (
                                            <motion.div
                                                initial="hidden"
                                                animate="visible"
                                                variants={{
                                                    visible: {
                                                        transition: {
                                                            staggerChildren: 0.15
                                                        }
                                                    }
                                                }}
                                                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                                            >
                                                {selectedFeature.benefits.map((ben, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        variants={{
                                                            hidden: { opacity: 0, x: -20 },
                                                            visible: { opacity: 1, x: 0 }
                                                        }}
                                                        className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-primary-100 group/ben transition-all duration-300 hover:bg-primary-50 hover:border-primary-300 hover:translate-x-1 cursor-default"
                                                    >
                                                        <div className="h-2 w-2 rounded-full bg-primary-500 group-hover/ben:scale-150 transition-transform duration-300 flex-shrink-0" />
                                                        <TypewriterText
                                                            text={ben}
                                                            delay={idx * 0.1}
                                                            className="text-sm md:text-base text-primary-900 font-semibold"
                                                        />
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => setSelectedFeatureId(null)}
                                            className="mt-6 md:mt-8 text-primary-600 font-black uppercase tracking-widest hover:text-primary-900 transition-colors text-xs md:text-sm"
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

            <React.Suspense fallback={<div className="h-64 bg-primary-950/5 animate-pulse" />}>
                <div className="bg-primary-9000 py-8 md:py-12 relative">
                    <ScrollVideo
                        src="/videos/drone video greenmist.mp4"
                        title={t('witnessFuture')}
                        subtitle={t('dronesDesigned')}
                    />
                    <div className="h-8 md:h-12"></div>
                    <ScrollVideo
                        src="/videos/sample video drone.mp4"
                        title={t('innovationTitle')}
                        subtitle={t('innovationSub')}
                    />
                </div>
            </React.Suspense>

            <section id="services" ref={whyChooseRef} className="py-8 md:py-12 bg-primary-700 text-white px-4 relative">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0, x: -50 },
                                visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
                            }}
                        >
                            <h2 className="text-base sm:text-lg md:text-2xl font-black mb-4 md:mb-6 uppercase tracking-tight leading-loose break-words">
                                <TypewriterText text={t('whyChoose')} wordSpacing="0.25em" /> <span className="text-primary-500">Greenmist?</span>
                            </h2>
                            <p className="text-primary-100/70 text-sm md:text-base mb-8 md:mb-12 font-medium">
                                <TypewriterText text={t('tradFarmingHard')} delay={0.5} />
                            </p>

                            <div className="space-y-8 md:space-y-12">
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
                        <div className="relative overflow-hidden rounded-[30px] md:rounded-[40px]">
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
                                className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-primary-600 p-6 md:p-10 rounded-[20px] md:rounded-[40px] shadow-2xl z-20"
                            >
                                <p className="text-2xl md:text-4xl font-black mb-1 leading-none">10x</p>
                                <p className="font-bold uppercase tracking-widest text-[7px] md:text-xs opacity-80">{t('fasterResults')}</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <React.Suspense fallback={<div className="h-64 bg-primary-50 animate-pulse" />}>
                <ROICalculator lang={lang} />
            </React.Suspense>

            <React.Suspense fallback={<div className="h-64 bg-white animate-pulse" />}>
                <div id="contact">
                    <ContactSection lang={lang} />
                </div>
            </React.Suspense>

            <footer className="bg-primary-950 py-8 md:py-12 text-center">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full animate-green-glow opacity-80 hover:opacity-100 transition-opacity">
                            <img
                                src="/images/logo_v3.jpg"
                                className="absolute inset-x-0 top-0 w-full h-auto object-cover origin-top"
                                alt="Logo"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <span className="text-xl font-black tracking-tight text-white/40">GREENMIST</span>
                    </div>
                    <p className="text-primary-400 font-black tracking-[0.3em] uppercase text-xs">{t('copyright')}</p>
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
        className="border-l-4 border-primary-800 pl-8 group"
    >
        <p className="text-primary-400 text-xs md:text-sm font-black uppercase tracking-widest mb-1 group-hover:text-primary-100 transition-colors">
            <TypewriterText text={label} delay={delay + 0.2} />
        </p>
        <p className="text-lg md:text-2xl font-black text-white group-hover:translate-x-2 transition-transform">
            <TypewriterText text={drone} delay={delay + 0.5} />
        </p>
        <p className="text-primary-300 text-sm md:text-base line-through opacity-80">
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
        className="p-6 md:p-8 bg-primary-50 rounded-[24px] border border-primary-100 hover:bg-white hover:shadow-xl transition-all group"
    >
        <h4 className="text-lg font-black text-primary-900 mb-2">
            <TypewriterText text={question} delay={delay + 0.5} />
        </h4>
        <p className="text-primary-700 font-medium">
            <TypewriterText text={answer} delay={delay + 0.8} />
        </p>
    </motion.div>
);

export default HomeContent;