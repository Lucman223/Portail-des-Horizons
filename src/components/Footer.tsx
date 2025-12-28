import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="bg-stone-900 text-stone-400 py-20 border-t border-brand-gold/20" id="contact">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            <div className="w-10 h-10 overflow-hidden rounded-md border border-brand-gold/50">
                                <img src="/logo.jpeg" alt="Logo" className="object-cover w-full h-full" />
                            </div>
                            PORTAIL DES HORIZONS
                        </h3>
                        <p className="leading-relaxed text-stone-500 max-w-sm">
                            "Nous semons et le silence récolte, nous avançons et les autres suivent."
                            <br />
                            Your trusted partner for education in Turkey.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-brand-gold hover:text-stone-900 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-brand-gold hover:text-stone-900 transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 border-b border-stone-800 pb-2 inline-block">{t('contact_us')}</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center group">
                                <div className="w-10 h-10 rounded bg-stone-800 flex items-center justify-center me-4 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <div className="text-xs text-stone-500 uppercase tracking-wider">Turkey Office</div>
                                    <div className="text-white font-mono">+90 501 295 05 94</div>
                                </div>
                            </li>
                            <li className="flex items-center group">
                                <div className="w-10 h-10 rounded bg-stone-800 flex items-center justify-center me-4 group-hover:bg-brand-gold group-hover:text-stone-900 transition-colors">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <div className="text-xs text-stone-500 uppercase tracking-wider">Mali Office</div>
                                    <div className="text-white font-mono">+223 91 43 74 85</div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links (Static for now) */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 border-b border-stone-800 pb-2 inline-block">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-brand-gold transition-colors">Apply Now</a></li>
                            <li><a href="#" className="hover:text-brand-gold transition-colors">Scholarship Terms</a></li>
                            <li><a href="#" className="hover:text-brand-gold transition-colors">Student Guide</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-stone-800 mt-16 pt-8 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>{t('copyright')}</p>
                    <p className="flex items-center gap-2">Built with <span className="text-red-500">♥</span> for Education</p>
                </div>
            </div>
        </footer>
    )
}
