/**
 * Formats a TMDB date string (YYYY-MM-DD) as "Mon DD YYYY".
 * Returns "" for a missing or unparseable date so callers can render nothing
 * instead of the string "Invalid Date".
 */
export default function dateFormat(date) {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toDateString().slice(3);
}
