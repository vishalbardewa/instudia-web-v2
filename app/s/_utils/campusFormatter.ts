const CAMPUS_OVERRIDES: Record<string, string> = {
  "nit-nagaland": "NIT Nagaland",
  "tetso-college": "Tetso College",
  "patkai": "Patkai Christian College",
  "patkai-christian-college": "Patkai Christian College",
  "dimapur-govt-college": "Dimapur Government College",
  "dgc": "Dimapur Government College",
  "st-joseph": "St. Joseph University",
  "st-joseph-university": "St. Joseph University",
  "nagaland-university": "Nagaland University",
  "kohima-science-college": "Kohima Science College",
  "immanuel-college": "Immanuel College",
  "sd-jain-girls-college": "S.D. Jain Girls' College",
  "unity-college": "Unity College",
  "sakus-mission-college": "Sakus Mission College",
};

const LOWERCASE_WORDS = new Set(["of", "and", "the", "in", "at", "for"]);

/**
 * Converts a URL campus slug (e.g. "tetso-college") into a clean display name
 * ("Tetso College").
 */
export function formatCampusName(slug: string): string {
  const decoded = decodeURIComponent(slug || "").trim();
  const normalized = decoded.toLowerCase();

  if (!normalized) return "Campus Seminar";
  if (CAMPUS_OVERRIDES[normalized]) {
    return CAMPUS_OVERRIDES[normalized];
  }

  return normalized
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word, idx) => {
      if (idx > 0 && LOWERCASE_WORDS.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Converts a display campus name into a URL-safe slug.
 */
export function toCampusSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

