import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({
    text,
    delay = 0,
    stagger = 0.02, // Reduced default stagger for faster feel
    yInitial = 10,
    className = "",
    wordSpacing = "0.3em"
}) => {
    if (!text) return null;

    // Memoize the split logic to avoid recalculation on every render
    const words = useMemo(() => text.split(' '), [text]);

    // Parent container variant to handle staggering
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
                delayChildren: delay
            }
        }
    };

    // Child variant for individual characters/words
    const childVariants = {
        hidden: { opacity: 0, y: yInitial },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3, // Slightly faster duration
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.span
            className={`inline-block ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }} // trigger a bit earlier
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={childVariants}
                    className="inline-block whitespace-nowrap"
                    style={{ marginRight: i < words.length - 1 ? wordSpacing : 0 }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default React.memo(TypewriterText);
