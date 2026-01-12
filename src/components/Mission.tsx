'use client';

import { useTranslations } from 'next-intl';
import { Target, Globe, HeartHandshake } from 'lucide-react';

export default function Mission() {
    const t = useTranslations('Mission');

    return (
        <section id="mission" className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-2 block">
                            À propos de nous
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-dark mb-6">
                            {t('title')}
                        </h2>
                        <div className="w-24 h-1.5 bg-brand-gold mx-auto rounded-full"></div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        {/* Description Column */}
                        <div className="space-y-6">
                            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-lg transition-shadow duration-300">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-brand-blue">
                                    <Globe size={24} />
                                </div>
                                <p className="text-stone-600 leading-relaxed text-lg">
                                    {t('description')}
                                </p>
                            </div>
                        </div>

                        {/* Commitment Column */}
                        <div className="space-y-6">
                            <div className="bg-brand-blue-dark text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                                {/* Decorative circle */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>

                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-brand-gold backdrop-blur-sm">
                                        <HeartHandshake size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-brand-gold">
                                        {t('commitment_title')}
                                    </h3>
                                    <p className="text-stone-300 leading-relaxed text-lg">
                                        {t('commitment')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features/Values Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                        {[
                            { icon: Target, label: "Excellence" },
                            { icon: Globe, label: "Portée Mondiale" },
                            { icon: HeartHandshake, label: "Accompagnement" }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-center gap-3 p-4 rounded-xl bg-stone-50 text-brand-blue-dark font-medium">
                                <item.icon size={20} className="text-brand-gold" />
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
