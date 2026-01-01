'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Tracker() {
    useEffect(() => {
        const trackVisit = async () => {
            const hasVisited = sessionStorage.getItem('has_visited');
            if (!hasVisited) {
                try {
                    await supabase.from('stats').insert({ type: 'visit' });
                    sessionStorage.setItem('has_visited', 'true');
                } catch (err) {
                    console.error('Error tracking visit:', err);
                }
            }
        };

        trackVisit();
    }, []);

    return null;
}
