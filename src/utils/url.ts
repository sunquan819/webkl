export const BASE_PATH = '/webkl';

export function url(path: string): string {
  if (path.startsWith(BASE_PATH)) return path;
  if (path === '/') return BASE_PATH + '/';
  return BASE_PATH + path;
}