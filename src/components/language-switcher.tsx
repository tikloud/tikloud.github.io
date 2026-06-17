'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/lib/i18n/routing';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';

/**
 * Language switcher component that preserves the current route
 * when switching between locales.
 * 
 * For example, if the user is on /en/about and switches to French,
 * they will be redirected to /fr/about.
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('language_switcher');
  
  /**
   * Handle locale change by replacing the locale segment in the path
   * 
   * Examples:
   * - /en/about -> /fr/about
   * - /en -> /fr
   * - /en/blog/post-1 -> /fr/blog/post-1
   */
  function handleLocaleChange(newLocale: string) {
    // Replace the locale segment in the path
    const newPathname = pathname.replace(
      new RegExp(`^/${locale}(/|$)`),
      `/${newLocale}$1`
    );
    
    router.push(newPathname);
  }
  
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-sm text-muted-foreground">
        {t('label')}
      </label>
      <Select
        value={locale}
        onValueChange={handleLocaleChange}
      >
        <SelectTrigger 
          id="language-select"
          className="w-[140px] h-9"
        >
          <SelectValue placeholder={locale} />
        </SelectTrigger>
        <SelectContent>
          {locales.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {t(loc)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
