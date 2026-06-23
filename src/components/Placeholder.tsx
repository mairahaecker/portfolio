import { ImageIcon } from "./icons";

/**
 * A clearly-marked, on-brand stand-in for photos that are still being added.
 * Not lorem-ipsum: it tells the visitor (and Maira) exactly what goes here.
 */
export function Placeholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-coral/35 bg-gradient-to-br from-paper-2 to-paper-3/60 p-6 text-center ${className}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-coral/12 text-coral">
        <ImageIcon className="h-5 w-5" />
      </span>
      <span className="text-xs font-medium uppercase tracking-wider text-coral-deep/80">
        {label}
      </span>
      <span className="text-[11px] text-ink-faint">photo coming soon</span>
    </div>
  );
}
