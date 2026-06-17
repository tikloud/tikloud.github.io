/**
 * Root layout for Next.js App Router with i18n
 * 
 * This is a minimal pass-through layout. The actual layout
 * with locale-aware rendering is in [locale]/layout.tsx
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
