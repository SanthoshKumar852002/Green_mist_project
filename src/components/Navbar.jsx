import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ t, onSelectLang, currentLang }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, [isMenuOpen]);

    // Close menu on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    // Handle navigation click
    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsMenuOpen(false);
        setTimeout(() => {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    };

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
        <a
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className="relative font-nav text-sm font-semibold uppercase tracking-widest text-gray-700 px-4 py-2 rounded-lg hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
        >
            {children}
        </a>
    );

    // Define links with explicit text for consistency
    const navLinks = [
        { name: currentLang === 'ta' ? 'முகப்பு' : 'Home', href: '#home' },
        { name: currentLang === 'ta' ? 'எங்களை பற்றி' : 'About', href: '#about' },
        { name: currentLang === 'ta' ? 'சேவைகள்' : 'Services', href: '#services' }
    ];
    const contactLabel = currentLang === 'ta' ? 'தொடர்பு' : 'Contact';

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}
            >
                <div
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
                />

                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Logo Section */}
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

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center justify-center flex-1 gap-8">
                            {navLinks.map((link, index) => (
                                <NavLink key={link.href} href={link.href} index={index}>{link.name}</NavLink>
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            <motion.div
                                className="flex items-center bg-gray-100 rounded-full p-1 relative overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                            >
                                <motion.div
                                    className="absolute inset-y-1 bg-primary-600 rounded-full"
                                    animate={{
                                        left: currentLang === 'en' ? 4 : 'calc(50% + 2px)',
                                        width: 'calc(50% - 6px)'
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                                <button
                                    onClick={() => onSelectLang('en')}
                                    className={`px-5 py-1.5 rounded-full text-sm font-bold transition-colors duration-300 relative z-10 min-w-[50px] ${currentLang === 'en' ? 'text-white' : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => onSelectLang('ta')}
                                    className={`px-5 py-1.5 rounded-full text-sm font-bold transition-colors duration-300 relative z-10 min-w-[70px] whitespace-nowrap ${currentLang === 'ta' ? 'text-white' : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    தமிழ்
                                </button>
                            </motion.div>

                            <motion.a
                                href="#contact"
                                className="relative bg-primary-600 text-white px-6 py-2.5 rounded-full font-bold overflow-hidden group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10">{contactLabel}</span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                        </div>

                        {/* Mobile Menu Button - Simplified */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            <div className="w-6 h-5 flex flex-col justify-between">
                                <span className={`w-full h-0.5 bg-gray-700 rounded-full transform transition-all duration-200 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`w-full h-0.5 bg-gray-700 rounded-full transition-all duration-200 ${isMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`w-full h-0.5 bg-gray-700 rounded-full transform transition-all duration-200 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                            </div>
                        </button>
                    </div>

                    {/* Mobile Menu - Simplified for Performance */}
                    {isMenuOpen && (
                        <>
                            {/* Overlay */}
                            <div
                                className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                                onClick={() => setIsMenuOpen(false)}
                            />

                            {/* Menu Panel - Clean White Design */}
                            <div
                                className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm z-50 lg:hidden bg-white shadow-2xl transform transition-transform duration-300"
                            >
                                {/* Close Button */}
                                <div className="flex justify-end p-4 border-b border-gray-100">
                                    <button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Menu Links - Simple & Clean */}
                                <div className="p-4 space-y-2">
                                    {[
                                        { href: '#home', name: currentLang === 'ta' ? 'முகப்பு' : 'Home' },
                                        { href: '#about', name: currentLang === 'ta' ? 'எங்களை பற்றி' : 'About' },
                                        { href: '#services', name: currentLang === 'ta' ? 'சேவைகள்' : 'Services' },
                                        { href: '#contact', name: contactLabel }
                                    ].map((item) => (
                                        <a
                                            key={item.href}
                                            href={item.href}
                                            onClick={(e) => handleNavClick(e, item.href)}
                                            className="block py-3 px-4 rounded-xl text-gray-700 font-semibold hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>

                                {/* Language Selector */}
                                <div className="p-4 border-t border-gray-100">
                                    <div className="flex bg-gray-100 rounded-xl p-1">
                                        <button
                                            onClick={() => { onSelectLang('en'); setIsMenuOpen(false); }}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${currentLang === 'en' ? 'bg-emerald-500 text-white' : 'text-gray-600'}`}
                                        >
                                            English
                                        </button>
                                        <button
                                            onClick={() => { onSelectLang('ta'); setIsMenuOpen(false); }}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${currentLang === 'ta' ? 'bg-emerald-500 text-white' : 'text-gray-600'}`}
                                        >
                                            தமிழ்
                                        </button>
                                    </div>
                                </div>

                                {/* Call Button */}
                                <div className="p-4">
                                    <a
                                        href="tel:+917899978869"
                                        className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors"
                                    >
                                        <span>📞</span>
                                        <span>+91 78999 78869</span>
                                    </a>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;