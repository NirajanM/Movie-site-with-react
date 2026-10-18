export default function OnOff({ opt, value, onChange }) {
  return (
    <div
      role="group"
      className="inline-flex rounded-md border border-line/10 bg-ink-850 p-0.5"
    >
      {opt.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`rounded-sm px-3 py-1 text-small transition-colors duration-fast ease-state ${
              active
                ? "bg-ink-700 text-fg-hi"
                : "text-fg-mid hover:text-fg-hi"
            }`}
          >
            {o.name}
          </button>
        );
      })}
    </div>
  );
}
