import { readFileSync } from 'node:fs';

const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
const installedNext = lock.packages?.['node_modules/next']?.version;

// Next.js announced an August 26, 2026 security release for both the 15.5 and
// 16.3 lines that includes a critical fix. 15.5.23 predates that release, so a
// production candidate must be newer than this baseline. Keep this value
// deliberately fail-closed until the lockfile has been regenerated on the
// post-release patched maintenance build and upstream guidance has been checked.
const preAugustSecurityBaseline = '15.5.23';

function parts(version) {
  return String(version || '').split('.').map((value) => Number.parseInt(value, 10));
}

function compare(actual, baseline) {
  const a = parts(actual);
  const b = parts(baseline);
  for (let index = 0; index < Math.max(a.length, b.length); index += 1) {
    const left = Number.isFinite(a[index]) ? a[index] : 0;
    const right = Number.isFinite(b[index]) ? b[index] : 0;
    if (left > right) return 1;
    if (left < right) return -1;
  }
  return 0;
}

if (!installedNext) {
  console.error('Release dependency gate: package-lock.json does not contain node_modules/next.');
  process.exit(1);
}

if (compare(installedNext, preAugustSecurityBaseline) <= 0) {
  console.error(
    `Release dependency gate: Next.js ${installedNext} is not eligible for production promotion. ` +
      `The announced August 26, 2026 critical security release affects the maintained 15.5/16.3 lines, ` +
      `so the release lock must be regenerated on a version newer than ${preAugustSecurityBaseline} ` +
      `and checked against the current Next.js security advisory before deployment.`,
  );
  process.exit(1);
}

console.log(
  `Release dependency gate: Next.js ${installedNext} is newer than the pre-August-security baseline ${preAugustSecurityBaseline}.`,
);
console.log(
  'Before production promotion, confirm that this exact version is the patched version named by the current Next.js August 2026 security release.',
);
