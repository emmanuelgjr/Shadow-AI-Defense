import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://shadowaidefense.dev',
  output: 'static',
  integrations: [tailwind({ applyBaseStyles: false }), react(), sitemap(), mdx()],
  markdown: { shikiConfig: { theme: 'github-dark-dimmed' } },
  build: { inlineStylesheets: 'auto' },
});
