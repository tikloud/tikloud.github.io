import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono, Inter } from 'next/font/google';

import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProviderWrapper } from '@/components/auth-provider-wrapper';

import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Validate locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  
  // Enable static generation for this locale
  // This MUST be called before any other next-intl server functions
  // to avoid dynamic rendering via headers()
  setRequestLocale(locale);
  
  // Get all messages for the current locale
  // Pass locale explicitly to avoid headers() usage
  const messages = await getMessages({ locale });
  
  // Import metadata based on locale
  const messagesModule = await import(`@/messages/${locale}.json`);
  const metadata = messagesModule.default.metadata;
  
  return (
    <html lang={locale} className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider 
          messages={messages} 
          locale={locale}
          timeZone="Europe/Paris"
        >
          <TooltipProvider>
            <AuthProviderWrapper>
              {children}
            </AuthProviderWrapper>
          </TooltipProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
