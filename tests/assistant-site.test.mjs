import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('portfolio assistant is grounded in portfolio-only facts', async () => {
  const config = JSON.parse(await read('public/assistant/site.json'));
  const knowledge = JSON.parse(await read('public/assistant/knowledge.json'));
  assert.equal(config.siteId, 'portfolio');
  assert.equal(config.assistantName, 'Ask Nitish');
  assert.equal(knowledge.siteId, 'portfolio');
  assert.ok(knowledge.entries.some((entry) => /Sai Nitish Reddy Kapa/.test(entry.text)));
  assert.ok(knowledge.entries.every((entry) => !/THRNS membership|Aasta Books sponsorship/.test(entry.text)));
});

test('root layout mounts the shared Syrava assistant runtime', async () => {
  const layout = await read('src/app/layout.tsx');
  assert.match(layout, /syrava-assistant/);
  assert.match(layout, /https:\/\/syrava\.com\/assistant\/v1\/widget\.js/);
  assert.match(layout, /\/assistant\/site\.json/);
});
