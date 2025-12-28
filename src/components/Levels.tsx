import { useTranslations } from 'next-intl';
import { BookOpen, Award, ScrollText, Info } from 'lucide-react';

export default function Levels() {
    const t = useTranslations('Levels');

    return (
        <section className="py-24 bg-brand-blue-dark text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white">{t('title')}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                    {/* License */}
                    <div className="group bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2">
                        <div className="w-20 h-20 mx-auto bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 border border-brand-gold/20 group-hover:scale-110 transition-transform">
                            <BookOpen className="w-10 h-10 text-brand-gold" />
                        </div>
                        <h3 className="text-2xl font-bold">{t('items.license')}</h3>
                    </div>
                    {/* Master */}
                    <div className="group bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2">
                        <div className="w-20 h-20 mx-auto bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 border border-brand-gold/20 group-hover:scale-110 transition-transform">
                            <Award className="w-10 h-10 text-brand-gold" />
                        </div>
                        <h3 className="text-2xl font-bold">{t('items.master')}</h3>
                    </div>
                    {/* Doctorate */}
                    <div className="group bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2">
                        <div className="w-20 h-20 mx-auto bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 border border-brand-gold/20 group-hover:scale-110 transition-transform">
                            <ScrollText className="w-10 h-10 text-brand-gold" />
                        </div>
                        <h3 className="text-2xl font-bold">{t('items.doctorate')}</h3>
                    </div>
                </div>

                <div className="inline-flex items-center bg-brand-gold text-brand-blue-dark px-8 py-4 rounded-full font-bold shadow-lg animate-bounce-slow">
                    <Info className="w-6 h-6 me-3" />
                    <span className="text-lg">{t('note')}</span>
                </div>
            </div>
        </section>
    )
}
