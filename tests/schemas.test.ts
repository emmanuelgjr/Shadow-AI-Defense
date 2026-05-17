import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { serviceSchema, detectionSchema, runbookSchema, stackSchema } from '../src/content/schemas';

const servicesDir = join(__dirname, '../src/content/services');
const detectionsDir = join(__dirname, '../src/content/detections');
const runbooksDir = join(__dirname, '../src/content/runbooks');
const stacksDir = join(__dirname, '../src/content/stacks');

describe('service schemas', () => {
  const files = readdirSync(servicesDir).filter((f) => f.endsWith('.json'));
  it('has at least 20 services', () => expect(files.length).toBeGreaterThanOrEqual(20));
  for (const file of files) {
    it(`${file} validates`, () => {
      expect(() => serviceSchema.parse(JSON.parse(readFileSync(join(servicesDir, file), 'utf8')))).not.toThrow();
    });
  }
});

describe('detection schemas', () => {
  const files = readdirSync(detectionsDir).filter((f) => f.endsWith('.json'));
  it('has at least 15 detections', () => expect(files.length).toBeGreaterThanOrEqual(15));
  for (const file of files) {
    it(`${file} validates`, () => {
      expect(() => detectionSchema.parse(JSON.parse(readFileSync(join(detectionsDir, file), 'utf8')))).not.toThrow();
    });
  }
});

describe('runbook schemas', () => {
  const files = readdirSync(runbooksDir).filter((f) => f.endsWith('.json'));
  it('has at least 4 runbooks', () => expect(files.length).toBeGreaterThanOrEqual(4));
  for (const file of files) {
    it(`${file} validates`, () => {
      expect(() => runbookSchema.parse(JSON.parse(readFileSync(join(runbooksDir, file), 'utf8')))).not.toThrow();
    });
  }
});

describe('stack schemas', () => {
  const files = readdirSync(stacksDir).filter((f) => f.endsWith('.json'));
  it('has at least 4 stacks', () => expect(files.length).toBeGreaterThanOrEqual(4));
  for (const file of files) {
    it(`${file} validates`, () => {
      expect(() => stackSchema.parse(JSON.parse(readFileSync(join(stacksDir, file), 'utf8')))).not.toThrow();
    });
  }
});

describe('cross-references', () => {
  const services = readdirSync(servicesDir).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(join(servicesDir, f), 'utf8')));
  const detections = readdirSync(detectionsDir).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(join(detectionsDir, f), 'utf8')));
  const runbooks = readdirSync(runbooksDir).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(join(runbooksDir, f), 'utf8')));
  const serviceSlugs = new Set(services.map((s) => s.slug));
  const detectionIds = new Set(detections.map((d) => d.id));
  const runbookIds = new Set(runbooks.map((r) => r.id));

  it('every detection.detects_services resolves', () => {
    for (const d of detections) {
      for (const s of d.detects_services) expect(serviceSlugs.has(s)).toBe(true);
    }
  });
  it('every detection.recommended_response resolves', () => {
    for (const d of detections) {
      if (d.recommended_response) expect(runbookIds.has(d.recommended_response)).toBe(true);
    }
  });
  it('every runbook.applies_to resolves', () => {
    for (const r of runbooks) {
      for (const id of r.applies_to) expect(detectionIds.has(id)).toBe(true);
    }
  });
});
