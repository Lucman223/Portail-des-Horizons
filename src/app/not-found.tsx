'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 text-center p-4">
            <h1 className="text-6xl font-bold text-brand-blue-dark mb-4">404</h1>
            <p className="text-xl text-stone-600 mb-8">Page Not Found</p>
            {/* Hardcoded generic link to default locale */}
            <Link href="/fr" className="px-6 py-3 bg-brand-gold text-brand-blue-dark font-bold rounded-full hover:bg-brand-gold-light transition-colors">
                Go Home
            </Link>
        </div>
    );
}
