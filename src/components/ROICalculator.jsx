import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Timer, Banknote, Droplets, TrendingUp } from 'lucide-react';
import { useTranslation } from '../utils/i18n';

// Animated counter component
const AnimatedNumber = ({ value, suffix = '', prefix = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const spring = useSpring(0, { duration: 2000 });
    const display = useTransform(spring, (current) =>
        `${prefix}${Math.round(current).toLocaleString()}${suffix}`
    );

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, value, spring]);

    return <motion.span ref={ref}>{display}</motion.span>;
};

// Circular progress gauge
const CircularGauge = ({ value, max, color, icon: Icon, label }) => {
    const percentage = (value / max) * 100;
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-24 h-24 sm:w-28 sm:h-28">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                />
                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 mb-1" />
                <span className="text-[10px] sm:text-xs text-white/60 font-medium">{label}</span>
            </div>
        </div>
    );
};

const ROICalculator = ({ lang }) => {
    const { t } = useTranslation(lang);
    const [acres, setAcres] = useState(1);
    const [isInteracting, setIsInteracting] = useState(false);

    const MANUAL_TIME_PER_ACRE = 8;
    const DRONE_TIME_PER_ACRE = 0.25;
    const MANUAL_COST_PER_ACRE = 1500;
    const DRONE_SAVINGS_PERCENT = 0.35;

    const timeSaved = (MANUAL_TIME_PER_ACRE - DRONE_TIME_PER_ACRE) * acres;
    const moneySaved = (MANUAL_COST_PER_ACRE * DRONE_SAVINGS_PERCENT) * acres;
    const waterSaved = acres * 50;

    return (
        <section className="py-10 sm:py-12 md:py-14 lg:py-16 bg-primary-700 text-white px-4 sm:px-6 lg:px-8 overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-10 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-primary-400 rounded-full blur-3xl opacity-20"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 30, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-10 right-10 w-60 sm:w-96 h-60 sm:h-96 bg-primary-600 rounded-full blur-3xl opacity-20"
                    animate={{
                        scale: [1, 1.3, 1],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                {/* Floating icons */}
                <motion.div
                    className="absolute top-1/4 right-1/4 text-primary-400/20"
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                >
                    <TrendingUp className="w-20 h-20" />
                </motion.div>
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3
                            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
                            style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontWeight: 700,
                            }}
                        >
                            Calculate Your Savings
                        </h3>
                        <p className="text-primary-100 text-sm sm:text-base mb-6 sm:mb-8 md:mb-10 opacity-90 leading-relaxed">
                            {t('calcDesc')}
                        </p>

                        {/* Interactive Slider Card */}
                        <motion.div
                            className={`bg-white/10 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl backdrop-blur-md border transition-all duration:300 ${isInteracting ? 'border-emerald-400 shadow-lg shadow-emerald-500/20' : 'border-white/20'
                                }`}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <label
                                    htmlFor="acresRange"
                                    className="block text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-80"
                                >
                                    {t('acresLabel')}
                                </label>
                                <motion.div
                                    className="bg-emerald-500 px-4 py-1.5 rounded-full"
                                    animate={{ scale: isInteracting ? 1.1 : 1 }}
                                >
                                    <span className="text-lg sm:text-xl font-black">{acres}</span>
                                </motion.div>
                            </div>

                            <div className="relative">
                                <input
                                    id="acresRange"
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={acres}
                                    onChange={(e) => setAcres(parseInt(e.target.value))}
                                    onMouseDown={() => setIsInteracting(true)}
                                    onMouseUp={() => setIsInteracting(false)}
                                    onTouchStart={() => setIsInteracting(true)}
                                    onTouchEnd={() => setIsInteracting(false)}
                                    className="w-full h-3 bg-primary-800 rounded-lg appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${acres}%, #1e3a3a ${acres}%, #1e3a3a 100%)`
                                    }}
                                />
                                {/* Acre markers */}
                                <div className="flex justify-between mt-2 px-1">
                                    {[1, 25, 50, 75, 100].map((mark) => (
                                        <button
                                            key={mark}
                                            onClick={() => setAcres(mark)}
                                            className={`text-xs font-medium transition-all ${acres === mark ? 'text-emerald-400 scale-110' : 'text-white/60 hover:text-white'
                                                }`}
                                        >
                                            {mark}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Circular Gauges */}
                        <div className="flex justify-center gap-4 mt-8">
                            <CircularGauge
                                value={timeSaved}
                                max={800}
                                color="#34d399"
                                icon={Timer}
                                label={t('hours')}
                            />
                            <CircularGauge
                                value={moneySaved}
                                max={52500}
                                color="#fbbf24"
                                icon={Banknote}
                                label="₹"
                            />
                            <CircularGauge
                                value={waterSaved}
                                max={5000}
                                color="#60a5fa"
                                icon={Droplets}
                                label={t('liters')}
                            />
                        </div>
                    </motion.div>

                    {/* Results Cards */}
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        <ResultCard
                            icon={<Timer className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />}
                            label={t('timeSaved')}
                            value={Math.round(timeSaved)}
                            suffix={` ${t('hours')}`}
                            desc={t('vsManual')}
                            delay={0.1}
                            gradient="from-emerald-50 to-teal-50"
                        />
                        <ResultCard
                            icon={<Banknote className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />}
                            label={t('moneySaved')}
                            value={Math.round(moneySaved)}
                            prefix="₹"
                            desc={t('estCost')}
                            delay={0.2}
                            gradient="from-amber-50 to-yellow-50"
                        />
                        <ResultCard
                            icon={<Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />}
                            label={t('waterSaved')}
                            value={waterSaved}
                            suffix={` ${t('liters')}`}
                            desc={t('preciseApp')}
                            delay={0.3}
                            gradient="from-blue-50 to-cyan-50"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const ResultCard = ({ icon, label, value, desc, delay, prefix = '', suffix = '', gradient }) => (
    <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.4 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02, y: -5 }}
        className={`bg-gradient-to-br ${gradient} p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl flex items-center gap-4 shadow-lg border border-white/50 group cursor-pointer`}
    >
        <motion.div
            className="bg-white p-3 sm:p-4 rounded-xl shadow-md shrink-0 group-hover:shadow-lg transition-shadow"
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
        >
            {icon}
        </motion.div>
        <div className="min-w-0 flex-1">
            <p className="text-primary-600 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-0.5">{label}</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-primary-900 leading-tight">
                <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
            </p>
            <p className="text-primary-500 text-xs sm:text-sm font-normal truncate">{desc}</p>
        </div>
        <motion.div
            className="text-primary-300 group-hover:text-primary-500 transition-colors"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
        >
            →
        </motion.div>
    </motion.div>
);

export default ROICalculator;
