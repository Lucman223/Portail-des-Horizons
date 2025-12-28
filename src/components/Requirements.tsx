import { useTranslations } from 'next-intl';
import { Clock, FileText, UserSquare2, GraduationCap, Plane, CheckCircle2, AlertOctagon } from 'lucide-react';

const docsIcons = {
    letter: FileText,
    cv: UserSquare2,
    diplomas: GraduationCap,
    passport: Plane
};

export default function Requirements() {
    const t = useTranslations('Requirements');
    const docKeys = ['letter', 'cv', 'diplomas', 'passport'] as const;

    return (
        <section className="py-24 bg-stone-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Conditions */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-10 border-s-8 border-brand-gold ps-6 bg-gradient-to-r from-brand-gold/10 to-transparent py-2 rounded-e-xl">
                            {t('title')}
                        </h2>

                        <div className="space-y-8">
                            {/* Ages */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 relative overflow-hidden group hover:border-brand-blue/30 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Clock size={100} />
                                </div>
                                <h3 className="font-bold text-xl mb-6 flex items-center text-brand-blue-dark">
                                    <Clock className="me-3 text-brand-gold" />
                                    Age Limits
                                </h3>
                                <ul className="space-y-4 text-gray-700">
                                    {['license', 'master', 'doctorate'].map((level) => (
                                        <li key={level} className="flex items-center p-3 bg-stone-50 rounded-lg">
                                            <div className="w-2 h-2 bg-brand-blue rounded-full me-4 flex-shrink-0"></div>
                                            <span className="font-medium text-lg">{t(`age.${level}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Scores */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 relative overflow-hidden group hover:border-green-500/30 transition-colors">
                                <h3 className="font-bold text-xl mb-6 flex items-center text-brand-blue-dark">
                                    <CheckCircle2 className="me-3 text-green-500" />
                                    Academic Score
                                </h3>
                                <ul className="space-y-4 text-gray-700">
                                    <li className="flex items-center p-4 bg-green-50 border border-green-100 rounded-lg">
                                        <span className="text-green-600 font-bold me-3">✓</span>
                                        <span className="text-lg font-bold text-gray-800">{t('score.license')}</span>
                                    </li>
                                    <li className="flex items-center p-4 bg-red-50 border border-red-100 rounded-lg">
                                        <AlertOctagon className="text-red-500 me-3" size={20} />
                                        <span className="text-lg font-bold text-brand-blue-dark">{t('score.medical')}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-10 border-s-8 border-brand-gold ps-6 bg-gradient-to-r from-brand-gold/10 to-transparent py-2 rounded-e-xl">
                            {t('docs_title')}
                        </h2>

                        <div className="grid grid-cols-2 gap-6">
                            {docKeys.map((key) => {
                                const Icon = docsIcons[key];
                                return (
                                    <div key={key} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center border border-stone-100 group hover:-translate-y-1">
                                        <div className="w-20 h-20 bg-brand-blue/5 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                                            <Icon size={40} strokeWidth={1.5} />
                                        </div>
                                        <p className="font-bold text-gray-800 text-lg group-hover:text-brand-gold transition-colors">{t(`documents.${key}`)}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
