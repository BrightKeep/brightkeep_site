import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  output: 'static',
  site: process.env.PUBLIC_SITE_URL || 'https://www.brightkeep.com.au',
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind(), sitemap()],
  security: {
    checkOrigin: false,
  },
});
