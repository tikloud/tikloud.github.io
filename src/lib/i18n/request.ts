import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from '@/lib/i18n/routing';

/**
 * Server-side request configuration for next-intl
 * 
 * This is called during server-side rendering to load
 * the appropriate messages for the current locale.
 * 
 * For static export, this runs at build time to generate
 * localized static pages.
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
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
