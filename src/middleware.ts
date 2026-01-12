import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from '@/utils/supabase/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    // 1. Run Supabase auth check (refreshes session & protects admin routes)
    const response = await updateSession(request);

    // If redirect happened in updateSession (e.g. to login), return it immediately
    if (response.headers.get('location')) {
        return response;
    }

    // 2. Run i18n middleware for non-api/non-admin routes
    // We only run intl middleware if it's not an internal admin/api route or static file
    const pathname = request.nextUrl.pathname;
    if (!pathname.startsWith('/admin') && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
        // We pass the response from updateSession so cookies are preserved
        return intlMiddleware(request);
    }

    return response;
}

export const config = {
    // Matcher:
    // 1. / (homepage)
    // 2. /(fr|ar|en)/:path* (localized routes)
    // 3. /admin/:path* (admin routes)
    matcher: ['/', '/(fr|ar|en)/:path*', '/admin/:path*']
};
