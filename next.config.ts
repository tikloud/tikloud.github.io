import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

/**
 * Get the base path for GitHub Pages deployment
 * 
 * For project sites: https://<username>.github.io/<repo-name>/
 * The base path should be /<repo-name>
 * 
 * Can be overridden via:
 * - NEXT_PUBLIC_BASE_PATH environment variable
 * - GITHUB_PAGES=true (uses repository name from GITHUB_REPOSITORY)
 */
function getBasePath(): string | undefined {
  // Check for explicit base path
  const explicitBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
  if (explicitBasePath) {
    // Ensure it starts with / but doesn't end with /
    return explicitBasePath.replace(/\/$/, '');
  }

  // Check if deploying to GitHub Pages
  if (process.env.GITHUB_PAGES === 'true') {
    // Try to extract repo name from GITHUB_REPOSITORY (owner/repo)
    const githubRepo = process.env.GITHUB_REPOSITORY;
    if (githubRepo) {
      const repoName = githubRepo.split('/')[1];
      if (repoName) {
        return `/${repoName}`;
      }
    }
  }

  // No base path for local development
  return undefined;
}

const basePath = getBasePath();

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Static export for GitHub Pages
  output: 'export',

  // Base path for GitHub Pages subdirectory deployment
  ...(basePath && { basePath }),

  // Ensure trailing slashes for consistent routing on static hosts
  trailingSlash: true,

  // Disable image optimization for static export
  // Images will be served as-is from the public folder
  images: {
    unoptimized: true,
  },
};

// Initialize next-intl plugin with the request config path
const withNextIntl = createNextIntlPlugin('./i18n.ts');

export default withNextIntl(nextConfig);
