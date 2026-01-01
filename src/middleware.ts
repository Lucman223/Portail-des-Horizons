import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Admin Auth Protection
    if (pathname.startsWith('/admin')) {
        // Allow access to login page
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for session cookie
        const session = request.cookies.get('admin_session');
        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Allow access to admin pages if authenticated
        return NextResponse.next();
    }

    // Internationalization for other routes
    return intlMiddleware(request);
}

export const config = {
    // Matcher now includes admin routes but they are handled by logic above
    matcher: ['/', '/(fr|ar|en)/:path*', '/admin/:path*']
};
