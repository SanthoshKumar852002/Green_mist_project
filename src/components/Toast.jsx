import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    const isSuccess = type === 'success';

    return createPortal(
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[10000] w-[95%] max-w-md pointer-events-auto">
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className={`flex items-center gap-4 p-6 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] border-2 backdrop-blur-xl ${
                    isSuccess
                        ? 'bg-gradient-to-br from-green-600 to-emerald-800 border-green-400 text-white'
                        : 'bg-gradient-to-br from-red-600 to-rose-800 border-red-400 text-white'
                }`}
            >
                {/* Icon Container with glowing effect */}
                <div className={`flex-shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12 ${
                    isSuccess ? 'bg-white text-green-700' : 'bg-white text-red-700'
                }`}>
                    <span className="text-3xl font-black">{isSuccess ? '✓' : '!'}</span>
                </div>

                {/* Engaging Message Text */}
                <div className="flex-1">
                    <p className="font-black text-xl tracking-tight uppercase mb-0.5">
                        {isSuccess ? 'Awesome!' : 'Oops!'}
                    </p>
                    <p className="text-base font-bold text-white/90 leading-tight italic">
                        {message}
                    </p>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="h-10 w-10 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full transition-all duration-300 font-bold"
                >
                    ✕
                </button>
            </motion.div>
        </div>,
        document.body
    );
};

export default Toast;
