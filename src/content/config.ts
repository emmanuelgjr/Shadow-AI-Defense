import { defineCollection } from 'astro:content';
import { serviceSchema, detectionSchema, runbookSchema, stackSchema } from './schemas';

export * from './schemas';

const services = defineCollection({ type: 'data', schema: serviceSchema });
const detections = defineCollection({ type: 'data', schema: detectionSchema });
const runbooks = defineCollection({ type: 'data', schema: runbookSchema });
const stacks = defineCollection({ type: 'data', schema: stackSchema });

export const collections = { services, detections, runbooks, stacks };
