import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ t, onSelectLang, currentLang }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const logoLetters = "GREENMIST".split("");

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
                        {/* Logo Image */}
                        <img
                            src="/images/logo_round.png"
                            alt="Logo"
                            className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-emerald-100 shadow-sm"
                        />

                        {/* BOLD MIXED GREEN TITLE */}
                        <motion.div
                            className="flex overflow-hidden"
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                        >
                            {"GREENMIST".split("").map((letter, i) => (
                                <motion.span
                                    key={i}
                                    variants={{
                                        rest: { y: 0 },
                                        hover: { y: -5 }
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 10,
                                        delay: i * 0.04
                                    }}
                                    className="font-['Syne'] text-2xl md:text-4xl font-extrabold tracking-tighter inline-block bg-gradient-to-r from-green-600 via-emerald-500 to-green-800 bg-clip-text text-transparent filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                                >
                                    {letter}
                                </motion.span>
                            ))}
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
                        <a
                            href="#contact"
                            className="bg-primary-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-primary-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            {t('contactUs')}
                        </a>
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
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 space-y-4 animate-fadeIn">
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
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
