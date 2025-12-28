import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-brand-blue text-white py-20">
            {/* Decorative Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-dark via-brand-blue to-blue-900"></div>

            {/* Golden Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold opacity-20 blur-[100px] rounded-full"></div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8">
                <div className="animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-4 font-medium backdrop-blur-sm">
                        2026 Edition
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                        {t('title')}
                    </h1>
                </div>

                <p className="text-2xl md:text-3xl text-brand-gold font-serif font-semibold animate-fade-in-up delay-100">
                    {t('subtitle')}
                </p>

                <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto italic font-light animate-fade-in-up delay-200">
                    "{t('slogan')}"
                </p>

                <div className="pt-8 animate-fade-in-up delay-300">
                    <Link href="/apply" className="inline-flex items-center px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-blue-dark font-bold rounded-full text-lg transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                        {t('cta')}
                        <ArrowRight className="ml-2 w-5 h-5 rtl:rotate-180" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
