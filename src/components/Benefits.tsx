import { useTranslations } from 'next-intl';
import { GraduationCap, Wallet, Home, Plane, HeartPulse } from 'lucide-react';

const icons = {
    tuition: GraduationCap,
    stipend: Wallet,
    housing: Home,
    flight: Plane,
    health_language: HeartPulse
};

export default function Benefits() {
    const t = useTranslations('Benefits');
    const keys = ['tuition', 'stipend', 'housing', 'flight', 'health_language'] as const;

    return (
        <section className="py-24 bg-white relative">
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
                        return (
                            <div key={key} className={`bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-1 group duration-300 ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-white transition-colors text-brand-blue duration-300">
                                    <Icon size={32} strokeWidth={1.5} />
                                </div>
                                <p className="text-xl font-bold text-brand-blue-dark leading-tight">
                                    {t(`items.${key}`)}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
