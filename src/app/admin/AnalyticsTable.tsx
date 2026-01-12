"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MapPin, Smartphone, Calendar, Search } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function AnalyticsTable() {
    const [stats, setStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Ensure we handle client-side only rendering for dates to avoid hydration mismatches
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        // We fetch the last 100 visits for performance
        // Note: 'country', 'city', 'device' etc. must exist in the table. 
        // If they don't exist yet (SQL not run), this might return nulls for those fields, which is handled.
        const { data, error } = await supabase
            .from("stats")
            .select("*")
            .eq("type", "visit")
            .order("created_at", { ascending: false })
            .limit(100);

        if (!error && data) {
            setStats(data);
        }
        setLoading(false);
    };

    const filteredStats = stats.filter((stat) => {
        const term = searchTerm.toLowerCase();
        return (
            (stat.country && stat.country.toLowerCase().includes(term)) ||
            (stat.city && stat.city.toLowerCase().includes(term)) ||
            (stat.device && stat.device.toLowerCase().includes(term)) ||
            (stat.os && stat.os.toLowerCase().includes(term))
        );
    });

    if (!isMounted) return null;

    if (loading) return <div className="p-4 text-center text-stone-500">Chargement des données...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <MapPin size={20} className="text-brand-blue-dark" />
                        Visiteurs Récents
                    </h2>
                    <p className="text-sm text-stone-500">Dernières connexions sur la plateforme (Top 100)</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                    <input
                        type="text"
                        placeholder="Rechercher (Pays, Ville, OS)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold outline-none w-full md:w-64"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-200">
                        <tr>
                            <th className="px-6 py-4">Date & Heure</th>
                            <th className="px-6 py-4">Localisation</th>
                            <th className="px-6 py-4">Appareil</th>
                            <th className="px-6 py-4">Détails Système</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {filteredStats.map((stat) => (
                            <tr key={stat.id} className="hover:bg-stone-50/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-stone-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-stone-400" />
                                        {format(new Date(stat.created_at), "dd MMM yyyy, HH:mm", { locale: fr })}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {stat.country ? (
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-800">{stat.country}</span>
                                            <span className="text-xs text-stone-500">{stat.city || 'Ville inconnue'}</span>
                                        </div>
                                    ) : (
                                        <span className="text-stone-400 italic">Inconnu</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <Smartphone size={16} className={stat.device === 'mobile' ? "text-purple-500" : "text-stone-400"} />
                                        <span className="capitalize text-gray-700">{stat.device || 'Desktop'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-stone-600">
                                    <div className="flex flex-col">
                                        <span className="text-gray-700">{stat.os || 'OS Inconnu'}</span>
                                        <span className="text-xs text-stone-500">{stat.browser || 'Navigateur Inconnu'}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredStats.length === 0 && (
                <div className="p-8 text-center text-stone-500 bg-stone-50">
                    Aucune donnée trouvée pour cette recherche.
                </div>
            )}
        </div>
    );
}
