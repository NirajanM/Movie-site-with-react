import { Link } from "react-router-dom";
import { primaryButtonSm } from "./ui/buttonStyles";

const cta = `mt-1 ${primaryButtonSm}`;

export default function EmptyState({
  title,
  message,
  actionLabel,
  actionTo,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div
        aria-hidden="true"
        className="h-16 w-16 rounded-xl border border-white/10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,223,43,0.10),transparent)]"
      />
      <h2 className="font-display text-lg text-fg-hi">{title}</h2>
      {message && (
        <p className="max-w-[46ch] text-small text-fg-mid [text-wrap:pretty]">
          {message}
        </p>
      )}
      {actionTo && actionLabel && (
        <Link to={actionTo} className={cta}>
          {actionLabel}
        </Link>
      )}
      {onAction && actionLabel && (
        <button type="button" onClick={onAction} className={cta}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
