import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp, X } from 'lucide-react';

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const actions = [
    {
      icon: Phone,
      label: 'Call Us',
      href: 'tel:+917899978869',
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/917899978869',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    }
  ];

  return (
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

      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3"
          >
            {actions.map((action, index) => (
              <motion.a
                key={action.label}
                href={action.href}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className={`group flex items-center gap-3 ${action.color} ${action.hoverColor} text-white px-4 py-3 rounded-full shadow-lg transition-all`}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {action.label}
                </span>
                <action.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-colors ${
          isOpen 
            ? 'bg-gray-900 text-white' 
            : 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.div>
        )}
      </motion.button>

      {/* Pulse Ring when closed */}
      {!isOpen && (
        <motion.div
          className="absolute bottom-0 right-0 w-14 h-14 rounded-full border-2 border-emerald-500"
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
      )}
    </div>
  );
};

export default FloatingActions;