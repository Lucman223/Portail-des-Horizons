'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
    const password = formData.get('password') as string;
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Default fallback for dev

    if (password === adminPassword) {
        // Set a cookie valid for 1 day
        const oneDay = 24 * 60 * 60 * 1000;
        (await cookies()).set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: Date.now() + oneDay,
            path: '/',
        });
        return { success: true };
    } else {
        return { error: 'Mot de passe incorrect' };
    }
}

export async function logout() {
    (await cookies()).delete('admin_session');
    redirect('/admin/login');
}
