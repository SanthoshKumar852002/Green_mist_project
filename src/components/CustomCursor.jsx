import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  const ringX = useSpring(0, { stiffness: 150, damping: 15 });
  const ringY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
      ringX.set(e.clientX - 20);
      ringY.set(e.clientY - 20);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleElementHover = (e) => {
      const target = e.target;
      const isHoverableElement = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a');
      setIsHovering(isHoverableElement);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="w-2 h-2 bg-emerald-400 rounded-full"
          animate={{ scale: isClicking ? 0.5 : isHovering ? 0 : 1 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="rounded-full border-2 border-emerald-500/50"
          animate={{
            width: isHovering ? 60 : 40,
            height: isHovering ? 60 : 40,
            borderColor: isHovering ? 'rgba(16, 185, 129, 0.8)' : 'rgba(16, 185, 129, 0.3)',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;