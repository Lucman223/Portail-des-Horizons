'use server';

import { supabase } from '@/lib/supabase';

export async function submitPartnership(prevState: any, formData: FormData) {
    const organization_name = formData.get('organization_name') as string;
    const contact_person = formData.get('contact_person') as string;
    const email = formData.get('email') as string;
    const type = formData.get('type') as string;
    const message = formData.get('message') as string;

    try {
        const { error } = await supabase.from('partnerships').insert({
            organization_name,
            contact_person,
            email,
            type,
            message
        });

        if (error) throw error;

        return { success: true };
    } catch (err) {
        console.error('Error submitting partnership:', err);
        return { error: 'Une erreur est survenue. Veuillez réessayer le plus tard.' };
    }
}
