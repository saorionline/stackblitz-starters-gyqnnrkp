import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  // Redirect / → /en (or /es if browser prefers Spanish)
  localePrefix: 'always',
});

export const config = {
  // Match all paths except Next.js internals and static files
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
