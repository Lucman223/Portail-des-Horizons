"use client";

import { MessageCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function WhatsAppButton() {
    const t = useTranslations("WhatsApp");
    const [showWelcome, setShowWelcome] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Show welcome message after a short delay
        const timer = setTimeout(() => {
            setShowWelcome(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Hide welcome message when path changes (optional behavior)
    useEffect(() => {
        // setShowWelcome(false); 
        // Uncomment if you want to re-trigger the timer on navigation or keep persistent
    }, [pathname]);

    const phoneNumber = "22391437485";
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* Welcome Bubble */}
            {showWelcome && (
                <div className="bg-white p-4 rounded-lg shadow-xl max-w-[250px] relative animate-in slide-in-from-bottom-5 fade-in duration-500 border border-brand-gold/20">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowWelcome(false);
                        }}
                        className="absolute -top-2 -right-2 bg-stone-100 hover:bg-stone-200 rounded-full p-1 text-stone-500 transition-colors"
                    >
                        <X size={14} />
                    </button>
                    <p className="text-sm text-stone-700 leading-relaxed">
                        {t("welcome")}
                    </p>
                    <div className="absolute right-6 -bottom-2 w-4 h-4 bg-white transform rotate-45 border-b border-r border-brand-gold/20"></div>
                </div>
            )}

            {/* WhatsApp Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                aria-label={t("action")}
            >
                <MessageCircle size={32} />

                {/* Pulse Effect */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping -z-10"></span>
            </a>
        </div>
    );
}
