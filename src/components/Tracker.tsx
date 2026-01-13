'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { UAParser } from 'ua-parser-js';

export default function Tracker() {
    useEffect(() => {
        const trackVisit = async () => {
            try {
                // 1. Check Admin Status (Persistent)
                const { data: { session } } = await supabase.auth.getSession();

                // If user is logged in, mark this device as an Admin Device forever
                if (session) {
                    localStorage.setItem('isAdminDevice', 'true');
                }

                // Determine effective role: Real session OR persistent device memory
                const isPersistentAdmin = localStorage.getItem('isAdminDevice') === 'true';
                const role = (session || isPersistentAdmin) ? 'admin' : 'visitor';

                // 2. Anti-Duplicate Logic (Smart)
                // Only track if we haven't tracked this session OR if the role has upgraded (Visitor -> Admin)
                const lastTrackedRole = sessionStorage.getItem('last_tracked_role');
                if (lastTrackedRole === role) {
                    return; // Already tracked as this role in this session
                }

                // 3. Get Device Info
                const parser = new UAParser();
                const result = parser.getResult();
                const deviceType = result.device.type || 'desktop';
                const os = `${result.os.name || 'Unknown'} ${result.os.version || ''}`.trim();
                const browser = `${result.browser.name || 'Unknown'} ${result.browser.version || ''}`.trim();
                const userAgent = navigator.userAgent;

                // 4. Get IP & Location Info (Robust)
                let ipData = { ip: null, city: null, country_name: null };
                try {
                    // Try primary source
                    const res = await fetch('https://ipapi.co/json/');
                    if (res.ok) {
                        ipData = await res.json();
                    } else {
                        throw new Error('IPAPI failed');
                    }
                } catch (e) {
                    console.warn('Primary IP fetch failed, trying backup...');
                    // Optional: Fallback service or just log warning
                    // We could try 'https://api.db-ip.com/v2/free/self' or similar if needed
                }

                // 5. Save to Supabase
                await supabase.from('stats').insert({
                    type: 'visit',
                    ip: ipData.ip,
                    country: ipData.country_name,
                    city: ipData.city,
                    device: deviceType,
                    os: os,
                    browser: browser,
                    user_agent: userAgent,
                    role: role
                });

                // Update session tracker
                sessionStorage.setItem('last_tracked_role', role);

            } catch (err) {
                console.error('Error tracking visit:', err);
            }
        };

        trackVisit();
    }, []);

    return null;
}
