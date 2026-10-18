export default function ErrorState({
  title = "Something went wrong",
  message = "We could not load this right now. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div
        aria-hidden="true"
        className="h-16 w-16 rounded-xl border border-danger/30 bg-danger/5"
      />
      <h2 className="font-display text-lg text-fg-hi">{title}</h2>
      <p className="max-w-[46ch] text-small text-fg-mid [text-wrap:pretty]">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 rounded-md border border-white/20 px-4 py-2 text-small text-fg-hi transition duration-fast ease-state hover:border-white/40 hover:bg-white/5 active:translate-y-px"
        >
          Try again
        </button>
      )}
    </div>
  );
}
