import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ t, onSelectLang, currentLang }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);

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

    // Split into GREEN and MIST for different styling
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

    const NavLink = ({ href, children }) => (
        <motion.a
            href={href}
            className="relative font-nav text-sm font-semibold uppercase tracking-widest text-primary-900 px-2 py-1"
            whileHover="hover"
        >
            {children}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-green-500 to-emerald-600"
                variants={{
                    initial: { width: 0 },
                    hover: { width: '100%', transition: { duration: 0.3 } }
                }}
                initial="initial"
            />
        </motion.a>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 py-3">
                {/* Main navbar content */}
                <div className="flex items-center justify-between">
                    {/* Logo - Left */}
                    <div className="flex items-center gap-4">
                        {/* Logo Image with pulse effect */}
                        <motion.img
                            src="/images/logo_round.png"
                            alt="Logo"
                            className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-emerald-100 shadow-sm"
                            whileHover={{ 
                                scale: 1.1, 
                                boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
                                borderColor: "#10b981"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />

                        {/* ENGAGING GREENMIST TITLE */}
                        <motion.div
                            className="flex items-center cursor-pointer relative"
                            onHoverStart={() => setIsLogoHovered(true)}
                            onHoverEnd={() => setIsLogoHovered(false)}
                            initial="rest"
                            animate={isLogoHovered ? "hover" : "rest"}
                        >
                            {/* Background glow effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-emerald-300/30 to-teal-400/30 blur-xl rounded-full"
                                variants={glowVariants}
                            />
                            
                            {/* GREEN part */}
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
                                            textShadow: isLogoHovered ? '0 0 30px rgba(16, 185, 129, 0.5)' : 'none',
                                            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </div>
                            
                            {/* MIST part with different style */}
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

                            {/* Sparkle effect on hover */}
                            {isLogoHovered && (
                                <>
                                    <motion.span
                                        className="absolute -top-1 -right-1 text-yellow-400 text-xs"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    >
                                        ✦
                                    </motion.span>
                                    <motion.span
                                        className="absolute -bottom-1 left-4 text-emerald-400 text-xs"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                                        transition={{ duration: 1, delay: 0.3, repeat: Infinity }}
                                    >
                                        ✦
                                    </motion.span>
                                </>
                            )}
                        </motion.div>
                    </div>

                    {/* Navigation Links - Center */}
                    <div className="hidden md:flex items-center justify-center flex-1 gap-8">
                        <NavLink href="#home">{t('navHome')}</NavLink>
                        <NavLink href="#about">{t('navAbout')}</NavLink>
                        <NavLink href="#services">{t('navServices')}</NavLink>
                    </div>

                    {/* Right Side - Language & Contact */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Language Switcher */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                            <button
                                onClick={() => onSelectLang('en')}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${currentLang === 'en'
                                    ? 'bg-primary-600 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => onSelectLang('ta')}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${currentLang === 'ta'
                                    ? 'bg-primary-600 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                தமிழ்
                            </button>
                        </div>

                        {/* Contact Button */}
                        <motion.a
                            href="#contact"
                            className="bg-primary-600 text-white px-6 py-2.5 rounded-full font-bold transition-all duration-300"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                            whileHover={{ 
                                scale: 1.05, 
                                boxShadow: "0 10px 30px rgba(16, 185, 129, 0.4)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {t('contactUs')}
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div 
                        className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 space-y-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <a
                            href="#home"
                            className="block text-xl font-semibold text-gray-700 hover:text-primary-600 py-2"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('navHome')}
                        </a>
                        <a
                            href="#about"
                            className="block text-xl font-semibold text-gray-700 hover:text-primary-600 py-2"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('navAbout')}
                        </a>
                        <a
                            href="#services"
                            className="block text-xl font-semibold text-gray-700 hover:text-primary-600 py-2"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('navServices')}
                        </a>
                        <a
                            href="#contact"
                            className="block text-xl font-semibold text-gray-700 hover:text-primary-600 py-2"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('contactUs')}
                        </a>

                        {/* Mobile Language Switcher */}
                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => { onSelectLang('en'); setIsMenuOpen(false); }}
                                className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${currentLang === 'en'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                    }`}
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                English
                            </button>
                            <button
                                onClick={() => { onSelectLang('ta'); setIsMenuOpen(false); }}
                                className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${currentLang === 'ta'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                    }`}
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                தமிழ்
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
