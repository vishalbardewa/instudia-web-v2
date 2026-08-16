export const SITE_URL = 'https://www.instudianagaland.com'; // no trailing slash

export function canonicalFor(path: string): string {
  if (!path) return SITE_URL;
  const clean = path.split('?')[0].split('#')[0].replace(/\/+$/, '');
  if (clean === '' || clean === '/') return SITE_URL;
  const normalized = `${SITE_URL}${clean.startsWith('/') ? clean : `/${clean}`}`;
  if (!normalized.startsWith(SITE_URL)) {
    throw new Error(`Invalid canonical URL generated: ${normalized}. Must start with ${SITE_URL}`);
  }
  return normalized;
}
