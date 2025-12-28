'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const backgrounds = [
    "/images/hero/hero-1.jpg", // Sultan Ahmed (Blue Mosque)
    "/images/hero/hero-2.jpg", // Bosphorus 
    "/images/hero/hero-3.jpg", // Istanbul Bridge
    "/images/hero/hero-4.jpg", // Cappadocia Balloons
    "/images/hero/hero-5.jpg", // Maiden's Tower (Kiz Kulesi)
    "/images/hero/hero-6.jpg", // Pamukkale
    "/images/hero/hero-7.jpg", // Ephesus
    "/images/hero/hero-8.jpg", // Galata Tower
    "/images/hero/hero-9.jpg", // Hagia Sophia
    "/images/hero/hero-10.jpg" // Kas (Coast)
];

export default function Hero() {
    const t = useTranslations('Hero');
    const [index, setIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);

    // Initial preload of all images to ensure smooth loop
    useEffect(() => {
        backgrounds.forEach((src) => {
            const img = new window.Image();
            img.src = src;
        });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((current) => {
                setPrevIndex(current); // Set current image as the "background"
                return (current + 1) % backgrounds.length; // Set new image as the "foreground"
            });
        }, 6000); // 6 seconds per slide
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white py-20">
            {/* Background Layer: Previous Image (Always Visible - prevents black gap) */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src={backgrounds[prevIndex]}
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Foreground Layer: Current Image (Fades In) */}
            <div className="absolute inset-0 z-10 select-none pointer-events-none">
                <AnimatePresence mode="sync">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={backgrounds[index]}
                            alt="Turkey Landscape"
                            fill
                            priority
                            className="object-cover"
                        />
                        {/* Neutral Overlay attached to image */}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Constant Dark Overlay (Consistent across all images) */}
            <div className="absolute inset-0 z-20 bg-black/40 pointer-events-none" />
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

            {/* Golden Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold opacity-20 blur-[100px] rounded-full z-30 pointer-events-none"></div>

            <div className="relative z-30 text-center px-4 max-w-5xl mx-auto space-y-8">
                <div className="animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/40 mb-4 font-medium backdrop-blur-md shadow-lg">
                        2026 Edition
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
                        {t('title')}
                    </h1>
                </div>

                <p className="text-2xl md:text-3xl text-brand-gold font-serif font-semibold animate-fade-in-up delay-100 drop-shadow-md">
                    {t('subtitle')}
                </p>

                <p className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto italic font-light animate-fade-in-up delay-200 opacity-90">
                    "{t('slogan')}"
                </p>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
                    <Link href="/apply" className="inline-flex items-center px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-blue-dark font-bold rounded-full text-lg transition-transform hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                        {t('cta')}
                        <ArrowRight className="ml-2 w-5 h-5 rtl:rotate-180" />
                    </Link>

                    <a
                        href="https://wa.me/22391437485?text=Bonjour,%20je%20souhaite%20plus%20d'informations%20sur%20la%20bourse."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-full backdrop-blur-md border border-white/20 transition-transform hover:scale-105"
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-[#25D366]"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.029.575 1.933.871 3.16.871l.001-.001c3.181 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.766-5.766-5.766zm9.261 1.634c1.606 2.376 1.704 5.378.293 7.822-1.411 2.445-4.038 3.944-6.858 3.943l-.004.001c-.004.001-3.321 0-4.634-.447l-4.72 1.24.84-2.12c-1.353-1.39-2.102-3.21-2.103-5.093 0-4.14 3.368-7.508 7.508-7.508 2.006 0 3.892.781 5.309 2.199l3.369-1.037z" fillRule="evenodd" /></svg>
                        WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
}
