import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const backgrounds = [
    "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a6b?q=80&w=2000&auto=format&fit=crop", // Blue Mosque
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2000&auto=format&fit=crop", // Bosphorus
    "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2000&auto=format&fit=crop", // Cappadocia
    "https://images.unsplash.com/photo-1527838832700-50592524d78c?q=80&w=2000&auto=format&fit=crop"  // Maiden's Tower
];

export default function Hero() {
    const t = useTranslations('Hero');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % backgrounds.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-blue-dark text-white py-20">
            {/* Dynamic Background Slideshow */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={backgrounds[index]}
                            alt="Turkey Landscape"
                            fill
                            priority
                            className="object-cover"
                        />
                        {/* Dark Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-brand-blue-dark/70 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-transparent to-transparent" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Golden Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold opacity-20 blur-[100px] rounded-full z-10 pointer-events-none"></div>

            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto space-y-8">
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

                <div className="pt-8 animate-fade-in-up delay-300">
                    <Link href="/apply" className="inline-flex items-center px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-blue-dark font-bold rounded-full text-lg transition-transform hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                        {t('cta')}
                        <ArrowRight className="ml-2 w-5 h-5 rtl:rotate-180" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
