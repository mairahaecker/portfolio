import { useEffect, useRef } from "react";

/**
 * Desktop custom cursor: a soft coral ring that eases toward the pointer and
 * grows over interactive elements, plus a small warm star that trails behind.
 * Disabled on touch devices and for reduced-motion.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const starRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const star = starRef.current;
    if (!ring || !star) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) {
      ring.style.display = "none";
      star.style.display = "none";
      return;
    }

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let sx = mx;
    let sy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      star.style.opacity = "0.9";
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor], input, textarea")) {
        ring.classList.add("hovering");
      } else {
        ring.classList.remove("hovering");
      }
    };
    const loop = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      sx += (mx - sx) * 0.12;
      sy += (my - sy) * 0.12;
      ring.style.transform = `translate(${rx.toFixed(1)}px, ${ry.toFixed(1)}px) translate(-50%, -50%)`;
      star.style.transform = `translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div
        ref={starRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[91] opacity-0 transition-opacity duration-300 will-change-transform"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" className="drop-shadow-[0_2px_6px_rgba(255,92,57,0.5)]">
          <path d="M12 2c.5 4.2 1.8 5.5 6 6-4.2.5-5.5 1.8-6 6-.5-4.2-1.8-5.5-6-6 4.2-.5 5.5-1.8 6-6Z" fill="#ff8a3d" />
        </svg>
      </div>
    </>
  );
}
