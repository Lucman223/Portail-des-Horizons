import { supabase } from '@/lib/supabase';
import { logout } from '@/actions/auth';
import { Users, MousePointer2, FileText, LogOut, CheckCircle, XCircle, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic'; // Ensure real-time data

export default async function AdminPage() {
    let visitCount = 0;
    let whatsAppCount = 0;
    let appCount = 0;
    let applications = [];
    let error = null;

    try {
        // 1. Fetch Stats
        const { count: vCount, error: vError } = await supabase.from('stats').select('*', { count: 'exact', head: true }).eq('type', 'visit');
        if (vError) throw vError;
        visitCount = vCount || 0;

        const { count: wCount } = await supabase.from('stats').select('*', { count: 'exact', head: true }).eq('type', 'whatsapp_click');
        whatsAppCount = wCount || 0;

        const { count: aCount } = await supabase.from('enrollments').select('*', { count: 'exact', head: true });
        appCount = aCount || 0;

        // 2. Fetch Recent Applications
        const { data: apps, error: aError } = await supabase
            .from('enrollments')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);

        if (aError) throw aError;
        applications = apps || [];

    } catch (err: any) {
        console.error("Admin Dashboard Error:", err);
        error = err.message || "Database connection failed";
    }

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Header */}
            <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-brand-blue-dark flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center text-brand-blue-dark">
                            <span className="font-bold text-sm">A</span>
                        </div>
                        Pannel Administrateur
                    </h1>

                    <form action={logout}>
                        <button className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
                            <LogOut size={16} />
                            Déconnexion
                        </button>
                    </form>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-8">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-2">
                        <XCircle size={20} />
                        <span>Erreur de connexion base de données: {error}</span>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Visites Totales"
                        value={visitCount}
                        icon={Users}
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="Clics WhatsApp"
                        value={whatsAppCount}
                        icon={MousePointer2}
                        color="bg-green-500"
                    />
                    <StatCard
                        title="Dossiers Reçus"
                        value={appCount}
                        icon={FileText}
                        color="bg-brand-gold"
                    />
                </div>

                {/* Applications Table */}
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                    <div className="p-6 border-b border-stone-200">
                        <h2 className="text-lg font-bold text-gray-800">Dernières Inscriptions</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-stone-50 text-gray-500 font-medium border-b border-stone-200">
                                <tr>
                                    <th className="px-6 py-4">Estudiante</th>
                                    <th className="px-6 py-4">Niveau</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {applications.map((app: any) => (
                                    <tr key={app.id} className="hover:bg-stone-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{app.full_name}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 uppercase">
                                                {app.study_level}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <div className="flex flex-col">
                                                <span>{app.email}</span>
                                                <span className="text-xs text-gray-400">{app.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={app.status || 'pending'} />
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(app.created_at).toLocaleDateString('fr-FR', {
                                                day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </td>
                                    </tr>
                                ))}
                                {(!applications || applications.length === 0) && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-400 italic">
                                            Aucune inscription pour le moment.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-10 flex items-center justify-center text-${color.replace('bg-', '')}`}>
                <Icon size={24} className={color === 'bg-brand-gold' ? 'text-yellow-600' : 'text-current'} />
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'approved') return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
            <CheckCircle size={12} /> Approuvé
        </span>
    );
    if (status === 'rejected') return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
            <XCircle size={12} /> Rejeté
        </span>
    );
    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">
            <Clock size={12} /> En attente
        </span>
    );
}
