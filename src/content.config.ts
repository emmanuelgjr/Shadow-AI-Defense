import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { serviceSchema, detectionSchema, runbookSchema, stackSchema } from './content/schemas';

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services' }),
  schema: serviceSchema,
});

const detections = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/detections' }),
  schema: detectionSchema,
});

const runbooks = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/runbooks' }),
  schema: runbookSchema,
});

const stacks = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/stacks' }),
  schema: stackSchema,
});

export const collections = { services, detections, runbooks, stacks };
