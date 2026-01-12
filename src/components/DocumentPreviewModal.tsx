'use client';

import { Download } from 'lucide-react';
import Modal from './Modal';
import Image from 'next/image';

interface DocumentPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string | null;
    title: string;
}

export default function DocumentPreviewModal({ isOpen, onClose, url, title }: DocumentPreviewModalProps) {
    if (!url) return null;

    const isPdf = url.toLowerCase().includes('.pdf');

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="flex flex-col gap-4">
                <div className="bg-stone-100 rounded-lg overflow-hidden border border-stone-200 min-h-[400px] flex items-center justify-center relative">
                    {isPdf ? (
                        <iframe
                            src={url}
                            className="w-full h-[600px]"
                            title="Document Preview"
                        />
                    ) : (
                        <div className="relative w-full h-[600px]">
                            {/* Using standard img for external URLs to avoid Next.js Image Config issues with dynamic buckets */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={url}
                                alt={title}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                </div>

                <div className="flexjustify-end">
                    <a
                        href={url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-blue-dark font-bold rounded-xl hover:bg-brand-gold-dark transition-colors"
                    >
                        <Download size={20} />
                        Télécharger le document
                    </a>
                </div>
            </div>
        </Modal>
    );
}
