import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { LanguageSwitcher } from '@/components/language-switcher';
import Link from 'next/link';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  // Enable static generation for this locale
  setRequestLocale(locale);
  
  // Get translations at build time
  const t = await getTranslations({ locale });
  
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        <LanguageSwitcher />
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            {t('homepage.heading')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('homepage.description')}
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            {t('navigation.sign_in')}
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            {t('navigation.sign_up')}
          </Link>
        </div>
      </div>
    </main>
  );
}
