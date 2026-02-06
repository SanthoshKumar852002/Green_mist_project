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

    // Define links with explicit text for consistency
    const navLinks = [
        { name: currentLang === 'ta' ? 'முகப்பு' : 'Home', href: '#home' },
        { name: currentLang === 'ta' ? 'எங்களை பற்றி' : 'About', href: '#about' },
        { name: currentLang === 'ta' ? 'சேவைகள்' : 'Services', href: '#services' }
    ];
    const contactLabel = currentLang === 'ta' ? 'தொடர்பு' : 'Contact';

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-emerald-500/5'
                    : 'bg-white shadow-md'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: scrolled ? 1 : 0, scaleX: scrolled ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
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

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
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
                            <>
                                {/* Overlay with animated gradient */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="fixed inset-0 z-40 lg:hidden"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-hidden="true"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(6,78,59,0.5) 100%)'
                                    }}
                                />

                                {/* Menu Panel - Dynamic Gradient Design */}
                                <motion.div
                                    initial={{ x: '100%', opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: '100%', opacity: 0 }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                    className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-50 lg:hidden overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 25%, #047857 50%, #059669 75%, #10b981 100%)',
                                        boxShadow: '-10px 0 50px rgba(0,0,0,0.5)'
                                    }}
                                >
                                    {/* Animated mesh gradient overlay */}
                                    <motion.div
                                        className="absolute inset-0 opacity-30"
                                        style={{
                                            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                                              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%),
                                                              radial-gradient(circle at 40% 40%, rgba(20,184,166,0.4) 0%, transparent 50%)`
                                        }}
                                        animate={{
                                            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                                        }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    />

                                    {/* Decorative animated floating orbs */}
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <motion.div
                                            className="absolute top-10 right-10 w-32 h-32 rounded-full"
                                            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)' }}
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                x: [0, 20, 0],
                                                y: [0, -15, 0]
                                            }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                        <motion.div
                                            className="absolute top-1/3 -left-10 w-40 h-40 rounded-full"
                                            style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.2) 0%, transparent 70%)' }}
                                            animate={{
                                                scale: [1.2, 1, 1.2],
                                                x: [0, 15, 0]
                                            }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                        <motion.div
                                            className="absolute bottom-32 right-5 w-24 h-24 rounded-full"
                                            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' }}
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                y: [0, -20, 0]
                                            }}
                                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                        />

                                        {/* Subtle grid pattern */}
                                        <div
                                            className="absolute inset-0 opacity-5"
                                            style={{
                                                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                                                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                                backgroundSize: '40px 40px'
                                            }}
                                        />
                                    </div>

                                    {/* Close Button - Premium Style */}
                                    <div className="flex justify-end p-5">
                                        <motion.button
                                            onClick={() => setIsMenuOpen(false)}
                                            className="relative p-3 rounded-2xl bg-gradient-to-br from-gray-100 to-white shadow-lg border border-gray-200/50 group"
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                            aria-label="Close menu"
                                        >
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            />
                                            <svg className="w-5 h-5 relative z-10 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </motion.button>
                                    </div>

                                    {/* Menu Links - Premium Cards with Icons */}
                                    <div className="px-5 py-2 space-y-3 relative z-10">
                                        {[
                                            {
                                                href: '#home',
                                                name: currentLang === 'ta' ? 'முகப்பு' : 'Home',
                                                icon: (
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                                    </svg>
                                                ),
                                                gradient: 'from-emerald-500 to-green-600',
                                                delay: 0
                                            },
                                            {
                                                href: '#about',
                                                name: currentLang === 'ta' ? 'எங்களை பற்றி' : 'About',
                                                icon: (
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                                    </svg>
                                                ),
                                                gradient: 'from-teal-500 to-cyan-600',
                                                delay: 0.1
                                            },
                                            {
                                                href: '#services',
                                                name: currentLang === 'ta' ? 'சேவைகள்' : 'Services',
                                                icon: (
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                                    </svg>
                                                ),
                                                gradient: 'from-blue-500 to-indigo-600',
                                                delay: 0.2
                                            },
                                            {
                                                href: '#contact',
                                                name: contactLabel,
                                                icon: (
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                                    </svg>
                                                ),
                                                gradient: 'from-purple-500 to-pink-600',
                                                delay: 0.3
                                            }
                                        ].map((item, i) => (
                                            <motion.a
                                                key={item.href}
                                                href={item.href}
                                                onClick={(e) => handleNavClick(e, item.href)}
                                                initial={{ opacity: 0, x: 60, scale: 0.8 }}
                                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                                transition={{ delay: item.delay, type: 'spring', stiffness: 100 }}
                                                className="group relative block"
                                            >
                                                <motion.div
                                                    className="relative flex items-center gap-4 py-4 px-5 rounded-2xl bg-white/80 border border-gray-100 shadow-sm overflow-hidden"
                                                    whileHover={{ scale: 1.02, x: 5 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {/* Hover gradient overlay */}
                                                    <motion.div
                                                        className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                                    />

                                                    {/* Animated shine effect */}
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                                                    />

                                                    {/* Icon container */}
                                                    <motion.div
                                                        className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 group-hover:from-white/30 group-hover:to-white/20 shadow-inner transition-all duration-300 text-emerald-600 group-hover:text-white"
                                                        whileHover={{ rotate: [0, -10, 10, 0] }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        {item.icon}
                                                    </motion.div>

                                                    {/* Text */}
                                                    <span
                                                        className="relative z-10 text-lg font-bold text-gray-800 group-hover:text-white transition-colors duration-300"
                                                        style={{ fontFamily: currentLang === 'ta' ? "'Noto Sans Tamil', sans-serif" : "'Outfit', sans-serif" }}
                                                    >
                                                        {item.name}
                                                    </span>

                                                    {/* Arrow indicator */}
                                                    <motion.div
                                                        className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                        initial={{ x: -10 }}
                                                        whileHover={{ x: 0 }}
                                                    >
                                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </motion.div>
                                                </motion.div>
                                            </motion.a>
                                        ))}
                                    </div>

                                    {/* Language Selector - Premium Pill Design */}
                                    <motion.div
                                        className="px-5 py-6 mt-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <div className="p-1.5 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-2xl shadow-inner">
                                            <div className="flex gap-2 relative">
                                                {/* Animated background pill */}
                                                <motion.div
                                                    className="absolute inset-y-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg"
                                                    initial={false}
                                                    animate={{
                                                        left: currentLang === 'en' ? '0%' : '50%',
                                                        width: '50%'
                                                    }}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                                    style={{ boxShadow: '0 4px 15px rgba(16,185,129,0.4)' }}
                                                />

                                                <motion.button
                                                    onClick={() => { onSelectLang('en'); setIsMenuOpen(false); }}
                                                    className={`relative z-10 flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${currentLang === 'en' ? 'text-white' : 'text-gray-600'
                                                        }`}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <span className="text-lg">🇬🇧</span>
                                                    <span style={{ fontFamily: "'Outfit', sans-serif" }}>English</span>
                                                </motion.button>

                                                <motion.button
                                                    onClick={() => { onSelectLang('ta'); setIsMenuOpen(false); }}
                                                    className={`relative z-10 flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${currentLang === 'ta' ? 'text-white' : 'text-gray-600'
                                                        }`}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <span className="text-lg">🇮🇳</span>
                                                    <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>தமிழ்</span>
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Contact Info - Premium Card */}
                                    <motion.div
                                        className="px-5 py-4 mt-auto"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <motion.a
                                            href="tel:+917899978869"
                                            className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg group"
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{ boxShadow: '0 8px 30px rgba(16,185,129,0.4)' }}
                                        >
                                            {/* Animated phone icon */}
                                            <motion.div
                                                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"
                                                animate={{ rotate: [0, -10, 10, -10, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                                            >
                                                <span className="text-2xl">📞</span>
                                            </motion.div>

                                            <div className="flex-1">
                                                <p className="text-white/80 text-xs font-medium uppercase tracking-wider">
                                                    {currentLang === 'ta' ? 'இப்போது அழைக்கவும்' : 'Call Now'}
                                                </p>
                                                <p className="text-white text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                                    +91 78999 78869
                                                </p>
                                            </div>

                                            {/* Animated arrow */}
                                            <motion.div
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            >
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </motion.div>
                                        </motion.a>
                                    </motion.div>

                                    {/* Bottom decorative wave */}
                                    <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none overflow-hidden">
                                        <svg className="absolute bottom-0 w-full" viewBox="0 0 400 50" preserveAspectRatio="none">
                                            <motion.path
                                                d="M0,25 Q100,0 200,25 T400,25 L400,50 L0,50 Z"
                                                fill="rgba(16,185,129,0.1)"
                                                animate={{ d: ["M0,25 Q100,0 200,25 T400,25 L400,50 L0,50 Z", "M0,25 Q100,50 200,25 T400,25 L400,50 L0,50 Z", "M0,25 Q100,0 200,25 T400,25 L400,50 L0,50 Z"] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            />
                                        </svg>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>
        </>
    );
};

export default Navbar;