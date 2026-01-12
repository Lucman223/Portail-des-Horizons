'use client';

import { useTranslations } from 'next-intl';
import Mission from '@/components/Mission';
import { PlayCircle, Image as ImageIcon, School } from 'lucide-react';

export default function PresentationPage() {
    const t = useTranslations('Presentation');

    return (
        <main className="min-h-screen bg-stone-50 pt-20">
            {/* Mission Section - Previously on Homepage */}
            <Mission />

            {/* Gallery Section Placeholder */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-2 block">
                            {t('gallery.subtitle')}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-dark">
                            {t('gallery.title')}
                        </h2>
                        <div className="w-24 h-1.5 bg-brand-gold mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-center">
                        <div className="bg-stone-50 p-12 rounded-2xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center group hover:border-brand-gold transition-colors">
                            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-stone-400 group-hover:text-brand-gold transition-colors">
                                <PlayCircle size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-stone-600 mb-2">{t('gallery.videos')}</h3>
                            <p className="text-stone-400 text-sm">{t('coming_soon')}</p>
                        </div>
                        <div className="bg-stone-50 p-12 rounded-2xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center group hover:border-brand-gold transition-colors">
                            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-stone-400 group-hover:text-brand-gold transition-colors">
                                <ImageIcon size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-stone-600 mb-2">{t('gallery.photos')}</h3>
                            <p className="text-stone-400 text-sm">{t('coming_soon')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Universities Section Placeholder */}
            <section className="py-24 bg-stone-50 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-2 block">
                            {t('universities.subtitle')}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-dark">
                            {t('universities.title')}
                        </h2>
                        <div className="w-24 h-1.5 bg-brand-gold mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl border border-stone-100 shadow-sm text-center">
                        <div className="w-20 h-20 bg-brand-blue/5 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-blue">
                            <School size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-blue-dark mb-4">{t('universities.partner_network')}</h3>
                        <p className="text-stone-600 leading-relaxed">
                            {t('universities.description')}
                        </p>
                        <p className="text-brand-gold font-medium mt-6">{t('coming_soon')}</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
