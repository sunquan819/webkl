export const BASE = '/webkl';

export function link(path: string): string {
  if (path.startsWith(BASE)) return path;
  if (path === '/') return BASE + '/';
  return BASE + path;
}