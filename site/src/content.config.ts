import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 공지사항: src/content/notices/ 안의 .md 파일 하나가 공지 하나입니다.
const notices = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notices' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    pinned: z.boolean().default(false),
  }),
});

export const collections = { notices };
