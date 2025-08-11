export const $ = (sel: string, root: Document | HTMLElement = document) =>
  root.querySelector(sel) as HTMLElement;
export const $$ = (sel: string, root: Document | HTMLElement = document) =>
  Array.from(root.querySelectorAll(sel)) as HTMLElement[];

export function formatMoney(value: number): string {
  const abs = Math.abs(value);
  const decimals = abs >= 0.01 ? 2 : 10;
  return `$${value.toFixed(decimals)}`;
}

export function setURLParam(key: string, val: string) {
  const url = new URL(location.href);
  url.searchParams.set(key, val);
  history.replaceState(null, "", url);
}

export function getURLParam(key: string, fallback: string) {
  const url = new URL(location.href);
  return url.searchParams.get(key) || fallback;
}
