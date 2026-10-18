import StarIcon from "./icons/StarIcon";

/**
 * A TMDB score out of 10.
 *
 * On cards we show just the number, which is what keeps the page from being a
 * wall of star glyphs. Pass `withStar` where a single star genuinely helps
 * (the detail view).
 */
export default function Rating({ value, withStar = false, className = "" }) {
  if (!value) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 tabular-nums ${className}`}
    >
      {withStar && <StarIcon size={12} />}
      <span className="sr-only">Rating </span>
      {value}
    </span>
  );
}
