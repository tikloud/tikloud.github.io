import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from '@/lib/i18n/routing';

/**
 * next-intl configuration
 * 
 * This file is required by next-intl and is used to
 * load messages for the current locale during SSR/SSG.
 * 
 * For static export, this runs at build time to generate
 * localized static pages for each locale.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the [locale] segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // Load messages using dynamic import for better bundling
    // Messages are loaded at build time for static export
    messages: (await import(`./src/messages/${locale}.json`)).default
  };
});
