import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TypewriterText from './TypewriterText';

const ScrollVideo = ({ src, title, subtitle }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);

    useEffect(() => {
        const video = videoRef.current;
        const loadObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    loadObserver.disconnect();
                }
            },
            { rootMargin: "200px" }
        );

        if (containerRef.current) {
            loadObserver.observe(containerRef.current);
        }

        const playObserver = new IntersectionObserver(
            ([entry]) => {
                if (!video) return;
                if (entry.isIntersecting) {
                    video.play().catch(e => {
                        if (e.name !== 'AbortError') console.log("Video auto-play blocked:", e);
                    });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.2 }
        );

        if (video) {
            playObserver.observe(video);
        }

        return () => {
            loadObserver.disconnect();
            playObserver.disconnect();
        };
    }, [shouldLoad]);

    return (
        <section ref={containerRef} className="py-6 sm:py-8 md:py-12 lg:py-16 bg-white overflow-hidden relative">
            <motion.div
                initial={{ opacity: 0, scale: 1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8"
            >
                <div className="relative rounded-xl sm:rounded-2xl md:rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-[0_10px_30px_rgba(5,150,105,0.1)] sm:shadow-[0_20px_50px_rgba(5,150,105,0.15)] bg-primary-900 aspect-[16/10] sm:aspect-video">
                    <video
                        ref={videoRef}
                        src={shouldLoad ? src : undefined}
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-950/20 to-transparent flex items-end p-4 sm:p-6 md:p-8 lg:p-12">
                        <motion.div
                            style={{ y: yText }}
                            className="max-w-2xl"
                        >
                            <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-black text-white mb-1 sm:mb-2 md:mb-3 lg:mb-4 uppercase tracking-tighter leading-tight">
                                <TypewriterText text={title || "Witness The Future"} />
                            </h3>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="text-primary-50/90 text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-snug"
                            >
                                {subtitle || "Our drones are designed for extreme agricultural environments."}
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default ScrollVideo;
