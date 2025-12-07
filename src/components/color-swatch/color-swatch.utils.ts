export function getIsCssColor(v: string): boolean {
  try {
    return typeof CSS !== "undefined" && typeof CSS.supports === "function" ? CSS.supports("color", v) : true;
  } catch {
    return false;
  }
}

export function getHasAlpha(v: string): boolean {
  const s = v.trim().toLowerCase();

  if (s === "transparent") return true;

  if (/^#(?:[0-9a-f]{4}|[0-9a-f]{8})$/i.test(s)) return true;

  if (/\b(?:rgba|hsla)\s*\(/i.test(s)) return true;

  if (/\b(?:rgb|hsl|lab|lch|oklab|oklch|color)\s*\([^)]*\/\s*[\d.]+%?\s*\)/i.test(s)) {
    return true;
  }

  return false;
}
