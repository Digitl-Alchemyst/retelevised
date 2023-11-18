export function ensureValidURL(urlStr: string): void {
  const url = new URL(urlStr);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`rejecting attempt to load non-http URL '${urlStr}'`);
  }
}
