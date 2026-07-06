import { useEffect, useRef } from "react";

/** A slim warm progress line that tracks how far you are through the story. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed left-0 top-0 z-[85] h-1 w-full origin-left bg-gradient-to-r from-coral via-tangerine to-amber"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
