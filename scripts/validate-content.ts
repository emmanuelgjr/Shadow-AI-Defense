import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serviceSchema, detectionSchema, runbookSchema, stackSchema } from '../src/content/schemas.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');

let failed = 0;
let passed = 0;

const validateDir = (dir: string, label: string, schema: { parse: (x: unknown) => unknown }) => {
  const full = join(repoRoot, dir);
  const files = readdirSync(full).filter((f) => f.endsWith('.json'));
  for (const file of files) {
    try {
      const raw = JSON.parse(readFileSync(join(full, file), 'utf8'));
      schema.parse(raw);
      passed++;
    } catch (e) {
      failed++;
      console.error(`✗ ${label}/${file}`);
      console.error(`  ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  console.log(`${label}: ${files.length} files checked.`);
};

validateDir('src/content/services', 'services', serviceSchema);
validateDir('src/content/detections', 'detections', detectionSchema);
validateDir('src/content/runbooks', 'runbooks', runbookSchema);
validateDir('src/content/stacks', 'stacks', stackSchema);

// Cross-reference validation
const services = readdirSync(join(repoRoot, 'src/content/services'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(join(repoRoot, 'src/content/services', f), 'utf8')));
const detections = readdirSync(join(repoRoot, 'src/content/detections'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(join(repoRoot, 'src/content/detections', f), 'utf8')));
const runbooks = readdirSync(join(repoRoot, 'src/content/runbooks'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(join(repoRoot, 'src/content/runbooks', f), 'utf8')));

const serviceSlugs = new Set(services.map((s) => s.slug));
const detectionIds = new Set(detections.map((d) => d.id));
const runbookIds = new Set(runbooks.map((r) => r.id));

for (const d of detections) {
  for (const s of d.detects_services) {
    if (!serviceSlugs.has(s)) {
      failed++;
      console.error(`✗ detection ${d.id} references unknown service slug: ${s}`);
    }
  }
  if (d.recommended_response && !runbookIds.has(d.recommended_response)) {
    failed++;
    console.error(`✗ detection ${d.id} references unknown runbook: ${d.recommended_response}`);
  }
}
for (const s of services) {
  for (const id of s.detection_rules) {
    if (!detectionIds.has(id)) {
      failed++;
      console.error(`✗ service ${s.slug} references unknown detection: ${id}`);
    }
  }
}
for (const r of runbooks) {
  for (const id of r.applies_to) {
    if (!detectionIds.has(id)) {
      failed++;
      console.error(`✗ runbook ${r.id} references unknown detection: ${id}`);
    }
  }
}

console.log(`\n${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
