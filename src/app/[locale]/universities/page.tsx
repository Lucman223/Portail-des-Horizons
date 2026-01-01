import { useTranslations } from 'next-intl';
import { BookOpen, GraduationCap, Building2, Globe, CheckCircle2, Wallet, FileText, BadgeCheck } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function UniversitiesPage() {
    const t = useTranslations('Universities');

    return (
        <div className="min-h-screen bg-stone-50 pt-20">
            {/* Hero Section */}
            <div className="bg-brand-blue-dark text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
                    <p className="text-xl text-stone-300 max-w-2xl">{t('subtitle')}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 space-y-16">
                {/* Introduction */}
                <section className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
                    <p className="text-lg text-stone-700 leading-relaxed">
                        {t('description')}
                    </p>
                </section>

                {/* General Conditions */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-brand-gold p-3 rounded-xl text-brand-blue-dark">
                            <BadgeCheck size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-brand-blue-dark">{t('general_conditions.title')}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {['0', '1', '2', '3', '4', '5', '6'].map((i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-brand-blue mb-2">{t(`general_conditions.items.${i}.title`)}</h3>
                                <p className="text-stone-600 text-sm">{t(`general_conditions.items.${i}.content`)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Public vs Private Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Public Universities */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                <Building2 size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-brand-blue-dark">{t('public_universities.title')}</h2>
                                <p className="text-stone-500 text-sm mt-1">{t('public_universities.description')}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {['0', '1', '2'].map((i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 text-brand-gold">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{t(`public_universities.items.${i}.title`)}</h3>
                                        <p className="text-gray-600 text-sm mt-1">{t(`public_universities.items.${i}.content`)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Private Universities */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                                <GraduationCap size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-brand-blue-dark">{t('private_universities.title')}</h2>
                                <p className="text-stone-500 text-sm mt-1">{t('private_universities.description')}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {['0', '1', '2'].map((i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 text-brand-gold">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{t(`private_universities.items.${i}.title`)}</h3>
                                        <p className="text-gray-600 text-sm mt-1">{t(`private_universities.items.${i}.content`)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Graduate Studies */}
                <section className="bg-brand-blue-dark text-white p-8 md:p-12 rounded-3xl relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-white/10 p-3 rounded-xl">
                                <BookOpen size={32} />
                            </div>
                            <h2 className="text-3xl font-bold">{t('graduate_studies.title')}</h2>
                        </div>

                        <p className="text-stone-300 mb-8 max-w-2xl">
                            {t('graduate_studies.description')}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {['0', '1', '2'].map((i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                                    <h3 className="font-bold text-brand-gold mb-2">{t(`graduate_studies.items.${i}.title`)}</h3>
                                    <p className="text-sm text-stone-300">{t(`graduate_studies.items.${i}.content`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center py-12">
                    <h2 className="text-3xl font-bold text-brand-blue-dark mb-4">{t('cta.title')}</h2>
                    <p className="text-stone-600 max-w-2xl mx-auto mb-8">{t('cta.text')}</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
                    >
                        Contactez-nous
                    </Link>
                </section>
            </div>
        </div>
    );
}
