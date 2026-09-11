import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const page = fs.readFileSync("src/app/page.tsx", "utf8");
const focusRecovery = fs.existsSync("src/components/sections/AskSaiFocusRecovery.tsx")
  ? fs.readFileSync("src/components/sections/AskSaiFocusRecovery.tsx", "utf8")
  : "";

test("stopping an Ask Sai response returns keyboard focus to the prompt", () => {
  assert.match(page, /AskSaiFocusRecovery/);
  assert.match(page, /<AskSaiFocusRecovery \/>/);
  assert.match(focusRecovery, /button\[aria-label="Stop Ask Sai response"\]/);
  assert.match(focusRecovery, /document\.addEventListener\("click", onClick\)/);
  assert.match(focusRecovery, /window\.requestAnimationFrame\(\(\) => \{/);
  assert.match(focusRecovery, /document\.getElementById\("ask-nitish-question"\)/);
  assert.match(focusRecovery, /questionInput instanceof HTMLInputElement/);
  assert.match(focusRecovery, /questionInput\.focus\(\)/);
  assert.match(focusRecovery, /document\.removeEventListener\("click", onClick\)/);
});
