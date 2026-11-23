export const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

export function parseLink(
  raw: string
): { ok: true; value: string | null } | { ok: false } {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: true, value: null };

  const bare = trimmed.replace(/^https?:\/\//i, "");
  if (bare.length > 200 || /\s/.test(bare)) return { ok: false };

  try {
    const url = new URL(`https://${bare}`);
    if (!url.hostname.includes(".") || url.username || url.password) {
      return { ok: false };
    }
    return { ok: true, value: url.toString() };
  } catch {
    return { ok: false };
  }
}
