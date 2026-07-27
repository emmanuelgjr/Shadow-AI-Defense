import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// The comms page offers a Download link for every template marked available.
// If the .docx is missing the link 404s on the live site, so the page's
// `available` flags must stay in step with what generate-comms.ts emits.
const commsPage = readFileSync(join(__dirname, '../src/pages/comms.astro'), 'utf8');
const templatesDir = join(__dirname, '../public/templates');

const entries = [...commsPage.matchAll(/\{ id: '([^']+)'.*?available: (true|false) \}/g)].map((m) => ({
  id: m[1],
  available: m[2] === 'true',
}));

describe('comms templates', () => {
  it('parses the template list from comms.astro', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  for (const { id, available } of entries) {
    if (available) {
      it(`${id} is offered for download and the .docx exists`, () => {
        expect(existsSync(join(templatesDir, `${id}.docx`))).toBe(true);
      });
    } else {
      it(`${id} is not offered for download while its .docx is absent`, () => {
        // If the file has been written, flip `available` to true so it is linked.
        expect(existsSync(join(templatesDir, `${id}.docx`))).toBe(false);
      });
    }
  }
});
