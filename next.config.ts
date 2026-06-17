import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  trailingSlash: true,
};

// Initialize next-intl plugin (uses default path: ./src/i18n/request.ts)
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
