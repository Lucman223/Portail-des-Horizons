'use client';

import { login } from '@/actions/auth';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
            {pending ? 'Please wait...' : 'Login'}
        </button>
    );
}

export default function LoginPage() {
    // @ts-ignore - useActionState types
    const [state, formAction] = useActionState(login, null);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            router.push('/admin');
        }
    }, [state?.success, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-stone-200">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
                        A
                    </div>
                    <h1 className="text-2xl font-bold text-brand-blue-dark">Admin Portal</h1>
                    <p className="text-gray-500">Secure Access Only</p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {state?.error && (
                        <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                            {state.error}
                        </div>
                    )}

                    <SubmitButton />
                </form>
            </div>
        </div>
    );
}
