export function getContrastColor(hexColor: string) {
  const color =
    hexColor.substring(0, 1) === '#' ? hexColor.substring(1) : hexColor;
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'var(--color-text-90)' : 'var(--color-global-white)';
}
