'use client';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { Globe, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const t = useTranslations('Navigation');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleLocaleChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-stone-100 shadow-sm">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-brand-gold shadow-md">
                        <img src="/logo.jpeg" alt="Portail Des Horizons Logo" className="object-cover w-full h-full" />
                    </div>
                    <span className="text-xl font-extrabold text-brand-blue-dark tracking-tight hidden sm:block">
                        PORTAIL<span className="text-brand-gold">.</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
                    {['benefits', 'levels', 'requirements', 'contact'].map((key) => (
                        <Link key={key} href={`#${key}`} className="text-stone-600 hover:text-brand-blue font-medium transition-colors">
                            {t(key)}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Language Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-3 py-2 hover:bg-stone-50 rounded-full transition-colors border border-transparent hover:border-stone-200">
                            <Globe size={18} className="text-stone-600" />
                            <span className="uppercase font-bold text-sm text-stone-700">{locale}</span>
                        </button>
                        <div className="absolute top-full end-0 mt-2 bg-white rounded-xl shadow-xl border border-stone-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right w-40 z-50">
                            {['fr', 'en', 'ar'].map((l) => (
                                <button
                                    key={l}
                                    onClick={() => handleLocaleChange(l)}
                                    className={`w-full text-start px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-50 transition-colors flex items-center justify-between ${locale === l ? 'text-brand-gold bg-stone-50' : 'text-stone-600'}`}
                                >
                                    <span>{l === 'fr' ? 'Français' : l === 'ar' ? 'العربية' : 'English'}</span>
                                    {locale === l && <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Link href="/apply" className="hidden md:inline-flex bg-brand-blue text-white px-6 py-2.5 rounded-full font-bold hover:bg-brand-blue-dark transition-all shadow-lg hover:shadow-brand-blue/30 hover:-translate-y-0.5">
                        {t('apply')}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 text-stone-600" onClick={() => setIsOpen(!isOpen)}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </nav>
    )
}
