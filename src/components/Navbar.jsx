import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ t, onSelectLang, currentLang }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const greenLetters = "GREEN".split("");
    const mistLetters = "MIST".split("");

    const letterVariants = {
        rest: { y: 0, scale: 1, rotate: 0 },
        hover: (i) => ({
            y: [0, -8, 0],
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0],
            transition: {
                duration: 0.6,
                delay: i * 0.05,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2
            }
        })
    };

    const glowVariants = {
        rest: { opacity: 0 },
        hover: { 
            opacity: [0, 0.8, 0],
            transition: { duration: 1.5, repeat: Infinity }
        }
    };

    const NavLink = ({ href, children, index }) => (
        <motion.a
            href={href}
            className="relative font-nav text-sm font-semibold uppercase tracking-widest text-primary-900 px-2 py-1 group"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
        >
            {children}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-green-500 to-emerald-600 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
            />
            <motion.div
                className="absolute inset-0 bg-emerald-100 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                layoutId="navHighlight"
            />
        </motion.a>
    );

    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                when: "afterChildren"
            }
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const mobileItemVariants = {
        closed: { opacity: 0, x: -20 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <motion.nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled 
                    ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-emerald-500/5' 
                    : 'bg-white shadow-md'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            {/* Animated border gradient */}
            <motion.div 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: scrolled ? 1 : 0, scaleX: scrolled ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            />

            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo - Left */}
                    <div className="flex items-center gap-4">
                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.img
                                src="/images/logo_round.png"
                                alt="Logo"
                                className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-emerald-100 shadow-sm relative z-10"
                            />
                            {/* Pulse ring effect */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-emerald-400"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.5, 0, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>

                        {/* GREENMIST TITLE */}
                        <motion.div
                            className="flex items-center cursor-pointer relative"
                            onHoverStart={() => setIsLogoHovered(true)}
                            onHoverEnd={() => setIsLogoHovered(false)}
                            initial="rest"
                            animate={isLogoHovered ? "hover" : "rest"}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-emerald-300/30 to-teal-400/30 blur-xl rounded-full"
                                variants={glowVariants}
                            />
                            
                            <div className="flex">
                                {greenLetters.map((letter, i) => (
                                    <motion.span
                                        key={`green-${i}`}
                                        custom={i}
                                        variants={letterVariants}
                                        className="font-['Syne'] text-2xl md:text-3xl lg:text-4xl font-black tracking-tight inline-block"
                                        style={{
                                            background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </div>
                            
                            <div className="flex">
                                {mistLetters.map((letter, i) => (
                                    <motion.span
                                        key={`mist-${i}`}
                                        custom={i + 5}
                                        variants={letterVariants}
                                        className="font-['Syne'] text-2xl md:text-3xl lg:text-4xl font-black tracking-tight inline-block"
                                        style={{
                                            background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #5eead4 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </div>

                            <AnimatePresence>
                                {isLogoHovered && (
                                    <>
                                        <motion.span
                                            className="absolute -top-1 -right-1 text-yellow-400 text-xs"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: 360 }}
                                            exit={{ opacity: 0, scale: 0 }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            ✦
                                        </motion.span>
                                        <motion.span
                                            className="absolute -bottom-1 left-4 text-emerald-400 text-xs"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                                            exit={{ opacity: 0, scale: 0 }}
                                            transition={{ duration: 1, delay: 0.3, repeat: Infinity }}
                                        >
                                            ✦
                                        </motion.span>
                                    </>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Navigation Links - Center */}
                    <div className="hidden md:flex items-center justify-center flex-1 gap-8">
                        <NavLink href="#home" index={0}>{t('navHome')}</NavLink>
                        <NavLink href="#about" index={1}>{t('navAbout')}</NavLink>
                        <NavLink href="#services" index={2}>{t('navServices')}</NavLink>
                    </div>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Language Switcher with animation */}
                        <motion.div 
                            className="flex items-center gap-1 bg-gray-100 rounded-full p-1 relative overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                        >
                            <motion.div
                                className="absolute inset-y-1 bg-primary-600 rounded-full"
                                animate={{
                                    x: currentLang === 'en' ? 4 : 52,
                                    width: currentLang === 'en' ? 44 : 56
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            <button
                                onClick={() => onSelectLang('en')}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors duration-300 relative z-10 ${
                                    currentLang === 'en' ? 'text-white' : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => onSelectLang('ta')}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors duration-300 relative z-10 ${
                                    currentLang === 'ta' ? 'text-white' : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                தமிழ்
                            </button>
                        </motion.div>

                        {/* Contact Button */}
                        <motion.a
                            href="#contact"
                            className="relative bg-primary-600 text-white px-6 py-2.5 rounded-full font-bold overflow-hidden group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10">{t('contactUs')}</span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <motion.span
                                className="w-full h-0.5 bg-gray-700 rounded-full origin-left"
                                animate={isMenuOpen ? { rotate: 45, y: -2 } : { rotate: 0, y: 0 }}
                            />
                            <motion.span
                                className="w-full h-0.5 bg-gray-700 rounded-full"
                                animate={isMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                            />
                            <motion.span
                                className="w-full h-0.5 bg-gray-700 rounded-full origin-left"
                                animate={isMenuOpen ? { rotate: -45, y: 2 } : { rotate: 0, y: 0 }}
                            />
                        </div>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div 
                            className="md:hidden overflow-hidden"
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <div className="mt-4 pb-4 border-t border-gray-100 pt-4 space-y-2">
                                {[
                                    { href: '#home', label: t('navHome') },
                                    { href: '#about', label: t('navAbout') },
                                    { href: '#services', label: t('navServices') },
                                    { href: '#contact', label: t('contactUs') },
                                ].map((item, i) => (
                                    <motion.a
                                        key={item.href}
                                        href={item.href}
                                        variants={mobileItemVariants}
                                        className="block text-lg font-semibold text-gray-700 hover:text-primary-600 py-3 px-4 rounded-xl hover:bg-emerald-50 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}

                                {/* Mobile Language Switcher */}
                                <motion.div 
                                    variants={mobileItemVariants}
                                    className="flex gap-3 pt-4 border-t border-gray-100 mt-4"
                                >
                                    <button
                                        onClick={() => { onSelectLang('en'); setIsMenuOpen(false); }}
                                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                                            currentLang === 'en'
                                                ? 'bg-primary-600 text-white shadow-lg shadow-emerald-500/30'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        English
                                    </button>
                                    <button
                                        onClick={() => { onSelectLang('ta'); setIsMenuOpen(false); }}
                                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                                            currentLang === 'ta'
                                                ? 'bg-primary-600 text-white shadow-lg shadow-emerald-500/30'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        தமிழ்
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
