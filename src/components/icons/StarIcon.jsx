/**
 * A hand-drawn five-point star, sized to the current text.
 *
 * Deliberately not from an icon library: it is the only star we draw, it costs
 * no extra dependency, and it keeps a bespoke mark in place of the default
 * library glyph that made the ratings read as a template.
 */
export default function StarIcon({ size = 14, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z" />
    </svg>
  );
}
