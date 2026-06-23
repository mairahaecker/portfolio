import { useRef, useState, type PointerEvent } from "react";

type Item = { src: string; caption: string };

type Pos = { x: number; y: number; r: number };

/**
 * A scattered set of polaroid photos you can grab and nudge around.
 * Pointer-based dragging, works with mouse and touch.
 */
export function DraggableCollage({
  items,
  className = "",
}: {
  items: Item[];
  className?: string;
}) {
  // initial scattered layout (percentages of the container)
  const initial: Pos[] = [
    { x: 4, y: 8, r: -6 },
    { x: 34, y: 22, r: 4 },
    { x: 60, y: 6, r: 7 },
    { x: 22, y: 46, r: -3 },
    { x: 54, y: 44, r: -8 },
  ];
  const [pos, setPos] = useState<Pos[]>(
    items.map((_, i) => initial[i % initial.length])
  );
  const [top, setTop] = useState(items.length - 1);
  const drag = useRef<{ i: number; dx: number; dy: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const onDown = (i: number) => (e: PointerEvent) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    drag.current = { i, dx: px - pos[i].x, dy: py - pos[i].y };
    setTop(i);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    const d = drag.current;
    const wrap = wrapRef.current;
    if (!d || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setPos((p) =>
      p.map((q, idx) =>
        idx === d.i
          ? { ...q, x: Math.max(-6, Math.min(86, px - d.dx)), y: Math.max(-6, Math.min(80, py - d.dy)) }
          : q
      )
    );
  };
  const onUp = () => (drag.current = null);

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      className={`relative touch-none select-none ${className}`}
    >
      <span className="pointer-events-none absolute right-3 top-3 z-0 rounded-full bg-ink/5 px-3 py-1 text-[11px] font-medium text-ink-faint">
        drag the photos
      </span>
      {items.map((it, i) => (
        <div
          key={it.src}
          onPointerDown={onDown(i)}
          style={{
            left: `${pos[i].x}%`,
            top: `${pos[i].y}%`,
            transform: `rotate(${pos[i].r}deg)`,
            zIndex: top === i ? 30 : 10 + i,
          }}
          className="absolute w-32 cursor-grab rounded-lg bg-white p-2 pb-5 shadow-lift active:cursor-grabbing sm:w-36"
        >
          <img
            src={it.src}
            alt={it.caption}
            draggable={false}
            className="pointer-events-none aspect-square w-full rounded-sm object-cover"
            loading="lazy"
          />
          <p className="pointer-events-none mt-1.5 text-center font-accent text-xs italic text-ink-soft">
            {it.caption}
          </p>
        </div>
      ))}
    </div>
  );
}
