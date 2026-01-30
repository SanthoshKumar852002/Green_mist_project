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
        <section className="py-16 md:py-24 bg-primary-700 text-white px-4 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-primary-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-600 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto max-w-5xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div>
                        <h2 className="text-xl md:text-3xl font-black mb-4 md:mb-6">{t('calcTitle')}</h2>
                        <p className="text-primary-100 text-sm md:text-base mb-8 md:mb-10 opacity-80">
                            {t('calcDesc')}
                        </p>

                        <div className="bg-white/10 p-6 rounded-2xl md:rounded-3xl backdrop-blur-md border border-white/20">
                            <label
                                htmlFor="acresRange"
                                className="block text-xs font-bold uppercase tracking-widest mb-4 opacity-70"
                            >
                                {t('acresLabel')}: <span className="text-primary-400 text-lg ml-2">{acres}</span>
                            </label>
                            <input
                                id="acresRange"
                                type="range"
                                min="1"
                                max="100"
                                value={acres}
                                onChange={(e) => setAcres(parseInt(e.target.value))}
                                className="w-full h-2 bg-primary-800 rounded-lg appearance-none cursor-pointer accent-primary-400"
                            />
                            <div className="flex justify-between mt-4 text-xs md:text-sm font-bold opacity-50 uppercase tracking-widest">
                                <span>1 {lang === 'ta' ? 'ஏக்கர்' : 'ACRE'}</span>
                                <span>100 {lang === 'ta' ? 'ஏக்கர்' : 'ACRES'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:gap-5">
                        <ResultCard
                            icon={<Timer className="w-5 h-5 md:w-6 md:h-6 text-primary-400" />}
                            label={t('timeSaved')}
                            value={`${Math.round(timeSaved)} ${t('hours')}`}
                            desc={t('vsManual')}
                            delay={0.1}
                        />
                        <ResultCard
                            icon={<Banknote className="w-5 h-5 md:w-6 md:h-6 text-primary-400" />}
                            label={t('moneySaved')}
                            value={`₹${Math.round(moneySaved).toLocaleString()}`}
                            desc={t('estCost')}
                            delay={0.2}
                        />
                        <ResultCard
                            icon={<Droplets className="w-5 h-5 md:w-6 md:h-6 text-primary-400" />}
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
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        viewport={{ once: true }}
        className="bg-white p-4 rounded-xl md:rounded-2xl flex items-center gap-4 shadow-xl"
    >
        <div className="bg-primary-50 p-3 rounded-lg md:rounded-xl shrink-0">{icon}</div>
        <div>
            <p className="text-primary-600 text-xs md:text-sm font-black uppercase tracking-widest">{label}</p>
            <p className="text-lg md:text-xl font-black text-primary-900 leading-tight">{value}</p>
            <p className="text-primary-500 text-xs md:text-sm font-medium">{desc}</p>
        </div>
    </motion.div>
);

export default ROICalculator;
