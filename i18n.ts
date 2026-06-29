import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale is a Promise in next-intl v4
  let locale = await requestLocale;

  // Fall back to default if locale is missing or unsupported
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  const messages = (
    await import(`./src/i18n/${locale}/portfolio.json`)
  ).default;

  return { locale, messages };
});
