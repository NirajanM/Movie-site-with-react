/**
 * Shared button styles.
 *
 * Tailwind class strings are easy to copy around and then quietly drift apart,
 * so the button looks we reuse live here as named constants. They work on both
 * <button> and <Link> because both accept a className.
 *
 * Usage:  <button className={primaryButton}>Play</button>
 *         <Link className={secondaryButton} to="/movies">Details</Link>
 */

const base =
  "inline-flex items-center gap-2 rounded-md text-small transition duration-fast ease-state active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50";

// Yellow, filled. The main call to action.
export const primaryButton = `${base} bg-pahelo px-5 py-2.5 font-semibold text-ink-950 hover:bg-pahelo-deep`;
export const primaryButtonSm = `${base} bg-pahelo px-4 py-2 font-semibold text-ink-950 hover:bg-pahelo-deep`;

// Outlined, for secondary actions next to a primary one.
export const secondaryButton = `${base} border border-white/20 px-5 py-2.5 text-fg-hi hover:border-white/40 hover:bg-white/5`;
export const secondaryButtonSm = `${base} border border-white/20 px-4 py-2 text-fg-hi hover:border-white/40 hover:bg-white/5`;

// Quiet inline text action, currently only used by the "Remove" controls.
export const ghostButton =
  "mt-2 inline-flex items-center gap-1.5 text-meta text-fg-mid transition-colors duration-fast ease-state hover:text-danger";
