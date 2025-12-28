'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Upload, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ApplicationForm() {
    const t = useTranslations('Form');
    const tReq = useTranslations('Requirements');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [files, setFiles] = useState<{ [key: string]: File | null }>({});

    const handleFileChange = (docKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFiles(prev => ({ ...prev, [docKey]: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        try {
            if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
                throw new Error("Database connection missing. Please configure .env variables.");
            }

            const uploadedUrls: string[] = [];

            // 1. Upload Files
            for (const [key, file] of Object.entries(files)) {
                if (file) {
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${key}.${fileExt}`;
                    const filePath = `${fileName}`;

                    const { error: uploadError } = await supabase.storage
                        .from('applications')
                        .upload(filePath, file);

                    if (uploadError) throw new Error(`Upload failed for ${key}: ${uploadError.message}`);

                    // Get Public URL (assuming public bucket) or just store path
                    const { data: { publicUrl } } = supabase.storage
                        .from('applications')
                        .getPublicUrl(filePath);

                    uploadedUrls.push(publicUrl);
                }
            }

            // 2. Insert Data
            const data = {
                full_name: formData.get('full_name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                study_level: formData.get('study_level'),
                documents_url: uploadedUrls
            };

            const { error: insertError } = await supabase
                .from('enrollments')
                .insert([data]);

            if (insertError) throw insertError;

            setSuccess(true);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (success) {
        return (
            <div className="text-center py-20 animate-fade-in-up">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={48} />
                </div>
                <h2 className="text-3xl font-bold text-brand-blue-dark mb-4">{t('success_title')}</h2>
                <p className="text-lg text-gray-600">{t('success_msg')}</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-3xl font-bold text-brand-blue-dark mb-6">{t('title')}</h1>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">{t('full_name')}</label>
                    <input name="full_name" type="text" required className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-brand-gold outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">{t('email')}</label>
                    <input name="email" type="email" required className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-brand-gold outline-none" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">{t('phone')}</label>
                    <input name="phone" type="tel" required className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-brand-gold outline-none" placeholder="+123..." />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">{t('level')}</label>
                    <select name="study_level" className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-brand-gold outline-none">
                        <option value="Licence">Licence</option>
                        <option value="Master">Master</option>
                        <option value="Doctorat">Doctorat</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4 pt-4">
                <h3 className="font-bold text-lg border-b border-stone-100 pb-2">{t('docs_required')}</h3>
                {['letter', 'cv', 'diplomas', 'passport'].map((docKey) => (
                    <div key={docKey} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg border border-dashed border-stone-300 hover:border-brand-blue transition-colors">
                        <span className="font-medium text-gray-700">
                            {tReq(`documents.${docKey}`)}
                            {files[docKey] && <span className="ml-2 text-xs text-green-600 font-bold">({files[docKey]?.name})</span>}
                        </span>
                        <label className={`cursor-pointer px-4 py-2 rounded-md shadow-sm border border-stone-200 text-sm font-bold flex items-center gap-2 transition-all ${files[docKey] ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' : 'bg-white hover:bg-stone-50'}`}>
                            {files[docKey] ? <CheckCircle size={16} /> : <Upload size={16} />}
                            {files[docKey] ? 'Selected' : 'Upload'}
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => handleFileChange(docKey, e)}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                        </label>
                    </div>
                ))}
            </div>

            <button disabled={isSubmitting} className="w-full py-4 bg-brand-gold text-brand-blue-dark font-bold text-lg rounded-xl hover:bg-brand-gold-light transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {isSubmitting ? <><Loader2 className="animate-spin" /> {t('sending')}</> : t('submit')}
            </button>
        </form>
    );
}
