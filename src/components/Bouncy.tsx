import { useEffect, useRef, useState } from "react";
import { talkadoo } from "../data/content";

/**
 * Bouncy the penguin: hops continuously, drifts toward the cursor inside its
 * section, and does a happy spin when clicked. Falls still for reduced-motion.
 */
export function Bouncy({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = wrap.closest("section");
    if (!section) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;
    let running = false;
    let visible = false;

    const loop = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      wrap.style.transform = `translate(${curX.toFixed(2)}px, ${curY.toFixed(2)}px)`;
      // settle: once we're basically at the target, stop the loop until the next move
      if (Math.abs(targetX - curX) < 0.15 && Math.abs(targetY - curY) < 0.15) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const ensureRunning = () => {
      if (!running && visible) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      targetX = ((e.clientX - r.left) / r.width - 0.5) * 46;
      targetY = ((e.clientY - r.top) / r.height - 0.5) * 22;
      ensureRunning();
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      ensureRunning();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(section);
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`will-change-transform ${className}`}>
      <button
        type="button"
        onClick={() => {
          setSpin(true);
          window.setTimeout(() => setSpin(false), 700);
        }}
        aria-label="Make Bouncy jump"
        className="block cursor-pointer border-0 bg-transparent p-0"
      >
        <img
          src={talkadoo.bouncy}
          alt="Bouncy, the Talkadoo penguin mascot"
          draggable={false}
          style={{
            transition: spin ? "transform 0.7s cubic-bezier(.22,1.2,.36,1)" : undefined,
            transform: spin ? "rotate(360deg) scale(1.08)" : undefined,
          }}
          className="bouncy-hop w-40 select-none drop-shadow-[0_18px_24px_rgba(124,83,201,0.35)] sm:w-52"
        />
      </button>
    </div>
  );
}
