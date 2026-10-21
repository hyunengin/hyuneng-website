// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 사이트 주소. 도메인이 바뀌면 여기만 수정합니다.
export default defineConfig({
  site: 'https://hyuneng.co.kr',
  integrations: [sitemap({ filter: (page) => !page.includes('/preview/') })],
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
