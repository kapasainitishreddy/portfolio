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

test('root layout mounts a consent-gated assistant launcher instead of loading third-party code immediately', async () => {
  const layout = await read('src/app/layout.tsx');
  const launcher = await read('src/components/assistant/AssistantConsentLauncher.tsx');

  assert.match(layout, /syrava-assistant-host/);
  assert.match(layout, /AssistantConsentLauncher/);
  assert.doesNotMatch(layout, /https:\/\/syrava\.com\/assistant\/v1\/widget\.js/);

  assert.match(launcher, /https:\/\/syrava\.com\/assistant\/v1\/widget\.js/);
  assert.match(launcher, /site-config/);
  assert.match(launcher, /\/assistant\/site\.json/);
  assert.match(launcher, /onClick=\{loadAssistant\}/);
  assert.match(launcher, /No third-party guide request is made before you choose this button/);
});
