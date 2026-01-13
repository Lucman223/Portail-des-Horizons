'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { UAParser } from 'ua-parser-js';

export default function Tracker() {
    useEffect(() => {
        const trackVisit = async () => {
            // Check session storage to avoid duplicate counting in same session
            const hasVisited = sessionStorage.getItem('has_visited');
            if (hasVisited) return;

            try {
                // 1. Get Device Info
                const parser = new UAParser();
                const result = parser.getResult();
                const deviceType = result.device.type || 'desktop'; // default to desktop if undefined (mobile/tablet are explicit)
                const os = `${result.os.name || 'Unknown'} ${result.os.version || ''}`.trim();
                const browser = `${result.browser.name || 'Unknown'} ${result.browser.version || ''}`.trim();
                const userAgent = navigator.userAgent;

                // 2. Get IP & Location Info
                // Using ipapi.co (free tier, no key required for low volume)
                let ipData = { ip: null, city: null, country_name: null };
                try {
                    const res = await fetch('https://ipapi.co/json/');
                    if (res.ok) {
                        ipData = await res.json();
                    }
                } catch (e) {
                    console.error('Failed to fetch IP data:', e);
                }

                // 3. Get User Session (for Admin detection)
                const { data: { session } } = await supabase.auth.getSession();
                const role = session ? 'admin' : 'visitor';

                // 4. Save to Supabase
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

                // Mark as visited for this session
                sessionStorage.setItem('has_visited', 'true');

            } catch (err) {
                console.error('Error tracking visit:', err);
            }
        };

        trackVisit();
    }, []);

    return null;
}
