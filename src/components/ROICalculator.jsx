import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Timer, Banknote, Droplets } from 'lucide-react';
import { useTranslation } from '../utils/i18n';

const ROICalculator = ({ lang }) => {
    const { t } = useTranslation(lang);
    const [acres, setAcres] = useState(1);

    // Calculation Constants
    const MANUAL_TIME_PER_ACRE = 8; // hours
    const DRONE_TIME_PER_ACRE = 0.25; // 15 mins
    const MANUAL_COST_PER_ACRE = 1500; // placeholder currency
    const DRONE_SAVINGS_PERCENT = 0.35; // 35% savings

    const timeSaved = (MANUAL_TIME_PER_ACRE - DRONE_TIME_PER_ACRE) * acres;
    const moneySaved = (MANUAL_COST_PER_ACRE * DRONE_SAVINGS_PERCENT) * acres;
    const waterSaved = acres * 50; // liters placeholder

    return (
        <section className="py-10 sm:py-12 md:py-14 lg:py-16 bg-primary-700 text-white px-4 sm:px-6 lg:px-8 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-primary-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-60 sm:w-96 h-60 sm:h-96 bg-primary-600 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
                    <div>
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
                            {t('calcTitle')}
                        </h2>
                        <p className="text-primary-100 text-sm sm:text-base mb-6 sm:mb-8 md:mb-10 opacity-90 leading-relaxed">
                            {t('calcDesc')}
                        </p>

                        <div className="bg-white/10 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl backdrop-blur-md border border-white/20">
                            <label
                                htmlFor="acresRange"
                                className="block text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4 opacity-80"
                            >
                                {t('acresLabel')}: <span className="text-white text-base sm:text-lg ml-1 sm:ml-2">{acres}</span>
                            </label>
                            <input
                                id="acresRange"
                                type="range"
                                min="1"
                                max="100"
                                value={acres}
                                onChange={(e) => setAcres(parseInt(e.target.value))}
                                className="w-full h-2 sm:h-2.5 bg-primary-800 rounded-lg appearance-none cursor-pointer accent-primary-400"
                            />
                            <div className="flex justify-between mt-3 sm:mt-4 text-xs sm:text-sm font-medium opacity-60">
                                <span>1 {lang === 'ta' ? 'ஏக்கர்' : 'Acre'}</span>
                                <span>100 {lang === 'ta' ? 'ஏக்கர்' : 'Acres'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4">
                        <ResultCard
                            icon={<Timer className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />}
                            label={t('timeSaved')}
                            value={`${Math.round(timeSaved)} ${t('hours')}`}
                            desc={t('vsManual')}
                            delay={0.1}
                        />
                        <ResultCard
                            icon={<Banknote className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />}
                            label={t('moneySaved')}
                            value={`₹${Math.round(moneySaved).toLocaleString()}`}
                            desc={t('estCost')}
                            delay={0.2}
                        />
                        <ResultCard
                            icon={<Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />}
                            label={t('waterSaved')}
                            value={`${waterSaved} ${t('liters')}`}
                            desc={t('preciseApp')}
                            delay={0.3}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const ResultCard = ({ icon, label, value, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4 }}
        viewport={{ once: true }}
        className="bg-white p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl flex items-center gap-3 sm:gap-4 shadow-lg"
    >
        <div className="bg-primary-50 p-2 sm:p-3 rounded-lg shrink-0">{icon}</div>
        <div className="min-w-0 flex-1">
            <p className="text-primary-600 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-0.5">{label}</p>
            <p className="text-base sm:text-lg md:text-xl font-bold text-primary-900 leading-tight truncate">{value}</p>
            <p className="text-primary-500 text-xs sm:text-sm font-normal truncate">{desc}</p>
        </div>
    </motion.div>
);

export default ROICalculator;
