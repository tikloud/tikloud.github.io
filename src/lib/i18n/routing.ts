import { defineRouting } from 'next-intl/routing';

/**
 * Supported locales for the application
 * Extend this array to add more locales
 */
export const locales = ['en', 'fr'] as const;

/**
 * Default locale used when no locale is specified
 */
export const defaultLocale: Locale = 'fr';

/**
 * Type definition for locale
 * Derived from the locales array for type safety
 */
export type Locale = (typeof locales)[number];

/**
 * Check if a given string is a valid locale
 */
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * next-intl routing configuration
 * 
 * For static export, we use localePrefix: 'as-needed' to generate
 * clean URLs without redundant locale prefixes for the default locale
 * when desired. However, for GitHub Pages with explicit /en and /fr
 * paths, we keep the locale in the path for all locales.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  // For static export with explicit locale paths, we always show the locale
  // This ensures /en and /fr routes are both generated
  localePrefix: 'always'
});
