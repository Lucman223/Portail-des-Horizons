'use client';

import { useState } from 'react';
import { Eye, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import DocumentPreviewModal from '@/components/DocumentPreviewModal';

export default function ApplicationsTable({ applications }: { applications: any[] }) {
    const [selectedDoc, setSelectedDoc] = useState<{ url: string; title: string } | null>(null);

    // Helpers to parse document lists safely
    const getDocs = (app: any) => {
        if (!app.documents_url) return [];
        // Handle if string or array
        const docs = Array.isArray(app.documents_url) ? app.documents_url : [app.documents_url];
        return docs.filter(Boolean);
    };

    const getDocName = (url: string) => {
        // e.g., 81273918_cv.pdf -> cv.pdf
        const parts = url.split('_');
        return parts.length > 1 ? parts[parts.length - 1] : 'Document';
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-6 border-b border-stone-200">
                    <h2 className="text-lg font-bold text-gray-800">Dernières Inscriptions</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-stone-50 text-gray-500 font-medium border-b border-stone-200">
                            <tr>
                                <th className="px-6 py-4">Etudiant</th>
                                <th className="px-6 py-4">Niveau</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Documents</th>
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
                                        <div className="flex flex-wrap gap-2">
                                            {getDocs(app).map((docUrl: string, idx: number) => {
                                                const name = getDocName(docUrl);
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setSelectedDoc({ url: docUrl, title: `${app.full_name} - ${name}` })}
                                                        className="inline-flex items-center gap-1 px-2 py-1 bg-stone-100 hover:bg-brand-gold hover:text-white rounded border border-stone-200 transition-colors text-stone-600 text-xs"
                                                        title="Voir document"
                                                    >
                                                        <Eye size={12} />
                                                        {name.substring(0, 10)}...
                                                    </button>
                                                );
                                            })}
                                            {getDocs(app).length === 0 && <span className="text-gray-300 italic text-xs">Aucun</span>}
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
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400 italic">
                                        Aucune inscription pour le moment.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <DocumentPreviewModal
                isOpen={!!selectedDoc}
                onClose={() => setSelectedDoc(null)}
                url={selectedDoc?.url || null}
                title={selectedDoc?.title || ''}
            />
        </>
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
