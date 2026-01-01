'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap, Wallet, Home, Plane, HeartPulse } from 'lucide-react';
import { useState } from 'react';
import Modal from './Modal';

const icons = {
    tuition: GraduationCap,
    stipend: Wallet,
    housing: Home,
    flight: Plane,
    health_language: HeartPulse
};

export default function Benefits() {
    const t = useTranslations('Benefits');
    const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
    const keys = ['tuition', 'stipend', 'housing', 'flight', 'health_language'] as const;

    const handleBenefitClick = (key: string) => {
        if (key === 'housing' || key === 'tuition' || key === 'stipend') {
            setSelectedBenefit(key);
        }
    };

    const isInteractive = (key: string) => {
        return key === 'housing' || key === 'tuition' || key === 'stipend';
    };

    const getModalTitle = () => {
        if (!selectedBenefit) return '';
        if (selectedBenefit === 'housing') return t('items.housing');
        if (selectedBenefit === 'tuition') return t('tuition_details.title');
        if (selectedBenefit === 'stipend') return t('stipend_details.title');
        return '';
    };

    return (
        <section id="benefits" className="py-24 bg-white relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-2 block">Pourquoi choisir cette bourse?</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-dark">
                        {t('title')}
                    </h2>
                    <div className="w-24 h-1.5 bg-brand-gold mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {keys.map((key, index) => {
                        const Icon = icons[key];
                        const interactive = isInteractive(key);

                        return (
                            <div
                                key={key}
                                onClick={() => handleBenefitClick(key)}
                                className={`bg-stone-50 p-8 rounded-2xl border border-stone-100 md:hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all md:hover:-translate-y-1 group duration-300 ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''} ${interactive ? 'cursor-pointer active:scale-95' : ''}`}
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 md:group-hover:bg-brand-gold md:group-hover:text-white transition-colors text-brand-blue duration-300">
                                    <Icon size={32} strokeWidth={1.5} />
                                </div>
                                <p className="text-xl font-bold text-brand-blue-dark leading-tight">
                                    {t(`items.${key}`)}
                                </p>
                                {interactive && (
                                    <p className="text-sm text-brand-gold mt-4 font-medium flex items-center gap-1">
                                        Voir les détails →
                                    </p>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            <Modal
                isOpen={!!selectedBenefit}
                onClose={() => setSelectedBenefit(null)}
                title={getModalTitle()}
            >
                <div className="space-y-8">
                    {selectedBenefit === 'housing' && (
                        <>
                            {/* Diyanet Scholarship */}
                            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                <h4 className="text-lg font-bold text-brand-blue mb-3">
                                    {t('housing_details.diyanet.title')}
                                </h4>
                                <div className="space-y-2 text-stone-600">
                                    <p>{t('housing_details.diyanet.p1')}</p>
                                    <p>{t('housing_details.diyanet.p2')}</p>
                                </div>
                            </div>

                            {/* Government Scholarship */}
                            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                <h4 className="text-lg font-bold text-brand-blue mb-3">
                                    {t('housing_details.government.title')}
                                </h4>
                                <div className="space-y-2 text-stone-600">
                                    <p>{t('housing_details.government.p1')}</p>
                                    <p>{t('housing_details.government.p2')}</p>
                                </div>
                            </div>
                        </>
                    )}

                    {selectedBenefit === 'tuition' && (
                        <div className="text-stone-600 leading-relaxed">
                            {t('tuition_details.content')}
                        </div>
                    )}

                    {selectedBenefit === 'stipend' && (
                        <div className="text-stone-600 leading-relaxed">
                            {t('stipend_details.content')}
                        </div>
                    )}
                </div>
            </Modal>
        </section>
    )
}
