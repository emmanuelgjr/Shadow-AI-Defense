import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://emmanuelgjr.github.io',
  base: '/Shadow-AI-Defense/',
  output: 'static',
  integrations: [react(), sitemap()],
  markdown: { shikiConfig: { theme: 'github-dark-dimmed' } },
  build: { inlineStylesheets: 'auto' },
});
