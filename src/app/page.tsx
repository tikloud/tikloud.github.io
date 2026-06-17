/**
 * Root page for static export
 * 
 * Since static export cannot perform dynamic redirects,
 * this page serves as a landing that directs users to the
 * default locale (/fr for this application).
 * 
 * For GitHub Pages, we use a meta refresh as a fallback
 * since JavaScript may be disabled or the file may be
 * accessed directly.
 */
import { defaultLocale } from '@/lib/i18n/routing';

export default function RootPage() {
  // This will be statically rendered at build time
  // The meta refresh provides immediate redirect
  // The script provides a faster redirect if JS is enabled
  return (
    <html lang={defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0;url=/${defaultLocale}`} />
        <title>Redirecting...</title>
      </head>
      <body>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h1>Redirecting...</h1>
          <p>
            If you are not redirected,{' '}
            <a href={`/${defaultLocale}`}>click here</a>
          </p>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.href = '/${defaultLocale}';`
          }}
        />
      </body>
    </html>
  );
}
