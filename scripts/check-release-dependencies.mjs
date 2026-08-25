import { readFileSync } from 'node:fs';

const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
const installedNext = lock.packages?.['node_modules/next']?.version;
const minimumNext = '15.5.23';

function parts(version) {
  return String(version || '').split('.').map((value) => Number.parseInt(value, 10));
}

function atLeast(actual, minimum) {
  const a = parts(actual);
  const m = parts(minimum);
  for (let index = 0; index < Math.max(a.length, m.length); index += 1) {
    const left = Number.isFinite(a[index]) ? a[index] : 0;
    const right = Number.isFinite(m[index]) ? m[index] : 0;
    if (left > right) return true;
    if (left < right) return false;
  }
  return true;
}

if (!installedNext) {
  console.error('Release dependency gate: package-lock.json does not contain node_modules/next.');
  process.exit(1);
}

if (!atLeast(installedNext, minimumNext)) {
  console.error(`Release dependency gate: Next.js ${installedNext} is below the current 15.5 maintenance floor ${minimumNext}. Regenerate the lockfile with a patched maintenance release before deployment.`);
  process.exit(1);
}

console.log(`Release dependency gate: Next.js ${installedNext} meets the recorded maintenance floor ${minimumNext}.`);
console.log('Before production promotion, re-check the current Next.js security release page because upstream security floors can change after this repository check was written.');
