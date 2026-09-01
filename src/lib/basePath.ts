/**
 * Prefixes an absolute asset/link path with the build's base path.
 *
 * Next.js auto-prefixes `basePath` for `next/link` and (usually) `next/image`,
 * but not for plain `<a href>` attributes or `next/image` in `unoptimized`
 * mode with a bare string `src` — both of which this site uses. Set
 * `NEXT_PUBLIC_BASE_PATH` only for the static-export (GitHub Pages) build;
 * it's empty for the normal build, so this is a no-op there.
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
