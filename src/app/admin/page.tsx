import { createClient } from '@/utils/supabase/server';
import { logout } from '@/actions/auth';
import { Users, MousePointer2, FileText, LogOut, CheckCircle, XCircle, User } from 'lucide-react';
import ApplicationsTable from './ApplicationsTable';

export const dynamic = 'force-dynamic'; // Ensure real-time data

export default async function AdminPage() {
    const supabase = await createClient();

    let visitCount = 0;
    let whatsAppCount = 0;
    let appCount = 0;
    let applications = [];
    let error = null;
    let userEmail = '';

    try {
        // 0. Fetch User
        const { data: { user } } = await supabase.auth.getUser();
        userEmail = user?.email || 'Administrateur';

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

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-full shadow-sm">
                            <div className="bg-brand-blue-dark text-white p-1 rounded-full">
                                <User size={14} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-stone-400 font-bold leading-none">Connecté en tant que</span>
                                <span className="text-sm font-semibold text-brand-blue-dark leading-none">{userEmail || 'Utilisateur inconnu'}</span>
                            </div>
                        </div>

                        <form action={logout}>
                            <button className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-2">
                                <LogOut size={18} />
                                <span className="hidden sm:inline">Déconnexion</span>
                            </button>
                        </form>
                    </div>
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
                <ApplicationsTable applications={applications} />
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
