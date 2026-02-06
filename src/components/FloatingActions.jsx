import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowUp } from 'lucide-react';

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      setShowScrollDown(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct WhatsApp click handler
  const openWhatsApp = () => {
    window.open('https://wa.me/917899978869?text=Hi%2C%20I%20am%20interested%20in%20your%20agricultural%20drone%20services', '_blank');
  };

  return (
    <>
      {/* Floating Scroll Down Arrow - Premium Capsule Design */}
      <AnimatePresence>
        {showScrollDown && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40"
          >
            <motion.button
              onClick={() => {
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }
              }}
              className="group flex flex-col items-center gap-3"
            >
              {/* Refined Scroll Text */}
              <motion.span
                className="text-white/50 text-[10px] font-bold uppercase tracking-[0.3em] font-sans"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Scroll Away
              </motion.span>
              
              {/* Premium Capsule UI */}
              <div className="relative w-7 h-12 rounded-full border-2 border-white/10 flex justify-center pt-2 backdrop-blur-md bg-emerald-950/20 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-500">
                {/* Smooth Bouncing Indicator */}
                <motion.div
                  className="w-1 h-3 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full"
                  animate={{ 
                    y: [0, 18, 0],
                    opacity: [1, 0.5, 1],
                    scaleY: [1, 1.5, 1]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: [0.45, 0.05, 0.55, 0.95] 
                  }}
                />
              </div>

              {/* Subtle Arrow below capsule */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg className="w-4 h-4 text-white/20 group-hover:text-emerald-500/50 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Scroll to Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-gray-900 text-white shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Call Button */}
        <motion.a
          href="tel:+917899978869"
          className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Phone className="w-5 h-5" />
        </motion.a>

        {/* WhatsApp Button - Direct Click */}
        <motion.button
          onClick={openWhatsApp}
          className="w-12 h-12 rounded-full shadow-xl flex items-center justify-center bg-green-500 hover:bg-green-600 text-white cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.button>

        {/* Pulse Ring */}
        <motion.div
          className="absolute bottom-0 right-0 w-12 h-12 rounded-full border-2 border-green-500 pointer-events-none"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </div>
    </>
  );
};

export default FloatingActions;