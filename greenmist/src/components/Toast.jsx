import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    // This creates the notification at the end of <body> so it is always on top
    return createPortal(
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[10000] w-[90%] max-w-md pointer-events-none">
            <motion.div
                initial={{ opacity: 0, y: -100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className={`pointer-events-auto flex items-center gap-4 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-2 ${type === 'success'
                        ? 'bg-white border-green-500 text-green-900'
                        : 'bg-white border-red-500 text-red-900'
                    }`}
            >
                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                    <span className="text-xl font-bold">{type === 'success' ? '✓' : '!'}</span>
                </div>

                <div className="flex-1">
                    <p className="font-bold text-lg leading-tight">
                        {type === 'success' ? 'Success!' : 'Error'}
                    </p>
                    <p className="text-sm opacity-80">{message}</p>
                </div>

                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    ✕
                </button>
            </motion.div>
        </div>,
        document.body
    );
};

export default Toast;
