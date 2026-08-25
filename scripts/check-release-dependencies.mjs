import { readFileSync } from 'node:fs';

const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
const installedNext = lock.packages?.['node_modules/next']?.version;

// Next.js published the August 2026 security release on August 25, 2026 and
// named 15.5.24 as the patched Maintenance LTS build for two Critical issues.
// Keep this explicit baseline current with upstream security guidance.
const minimumNext = '15.5.24';

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
  console.error(
    `Release dependency gate: Next.js ${installedNext} is below the August 2026 patched Maintenance LTS floor ${minimumNext}. ` +
      'Regenerate the lockfile on the patched release before production promotion.',
  );
  process.exit(1);
}

console.log(`Release dependency gate: Next.js ${installedNext} meets the August 2026 patched floor ${minimumNext}.`);
console.log('Before production promotion, re-check the current Next.js security page in case a newer security floor has superseded this baseline.');
