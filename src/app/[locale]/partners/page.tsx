'use client';

import { useTranslations } from 'next-intl';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitPartnership } from '@/actions/partners';
import { Building2, Handshake, Globe2, Send } from 'lucide-react';

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
            {pending ? (
                <span className="w-5 h-5 border-2 border-brand-blue-dark/30 border-t-brand-blue-dark rounded-full animate-spin"></span>
            ) : (
                <>
                    <Send size={20} />
                    {label}
                </>
            )}
        </button>
    );
}

export default function PartnersPage() {
    const t = useTranslations('Partners');
    // @ts-ignore
    const [state, formAction] = useActionState(submitPartnership, null);

    return (
        <div className="min-h-screen bg-stone-50 pt-20">
            {/* Hero Section */}
            <section className="bg-brand-blue-dark text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-brand-gold border border-white/20 mb-6 font-medium backdrop-blur-md">
                        Partenariats
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-stone-300">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Info / Value Prop */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-3xl font-bold text-brand-blue-dark mb-6">Pourquoi devenir partenaire ?</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {t('description')}
                            </p>
                        </div>

                        <div className="grid gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex gap-4">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                    <Building2 size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-2">Universités</h3>
                                    <p className="text-gray-500">Connectez-vous avec des étudiants talentueux du monde entier.</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex gap-4">
                                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                                    <Handshake size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-2">Associations</h3>
                                    <p className="text-gray-500">Collaborez sur des projets éducatifs et sociaux.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-stone-100 relative">
                        {state?.success ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-green-800 mb-2">Merci !</h3>
                                <p className="text-gray-600">{t('success')}</p>
                            </div>
                        ) : (
                            <form action={formAction} className="space-y-6">
                                <h3 className="text-2xl font-bold text-brand-blue-dark mb-6 border-b border-stone-100 pb-4">
                                    {t('form_title')}
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('org_name')}</label>
                                        <input type="text" name="organization_name" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact_person')}</label>
                                            <input type="text" name="contact_person" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('type')}</label>
                                        <select name="type" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all bg-white">
                                            <option value="university">Université</option>
                                            <option value="association">Association</option>
                                            <option value="government">Institution Gouvernementale</option>
                                            <option value="other">Autre</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('message')}</label>
                                        <textarea name="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"></textarea>
                                    </div>
                                </div>

                                {state?.error && (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium">
                                        {state.error}
                                    </div>
                                )}

                                <SubmitButton label={t('submit')} />
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

import { CheckCircle } from 'lucide-react';
