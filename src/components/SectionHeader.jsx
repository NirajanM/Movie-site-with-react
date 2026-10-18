export default function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="mb-5 flex items-end gap-4">
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-eyebrow uppercase text-fg-low">{eyebrow}</p>
        )}
        <h2 className="font-display text-h2 text-fg-hi [text-wrap:balance]">
          {title}
        </h2>
      </div>
      <div className="mb-2 hidden h-px flex-1 bg-white/10 sm:block" />
      {action && <div className="mb-1 shrink-0">{action}</div>}
    </div>
  );
}
