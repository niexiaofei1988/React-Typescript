export function processSize(size: string | number) {
  return !/^\d+$/.test(`${size}`) ? size : `${size}px`;
}
