import { useEffect, useRef } from "react";

/**
 * Ambient warm background: an animated cream gradient, a few slow drifting
 * abstract blobs, and a whisper of grain. Gentle mouse parallax on desktop.
 * Purely decorative and non-blocking. Abstract and personal, never scenery.
 */
export function LivingBackground() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 30;
      ty = (e.clientY / window.innerHeight - 0.5) * 30;
    };
    const loop = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
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
      <div className="bg-living" aria-hidden>
        <div ref={layerRef} className="absolute inset-[-8%]">
          <span
            className="bg-blob"
            style={{ width: 460, height: 460, top: "-6%", left: "-4%", background: "#ffd3b8", animation: "drift-a 22s ease-in-out infinite" }}
          />
          <span
            className="bg-blob"
            style={{ width: 380, height: 380, top: "35%", right: "-6%", background: "#ffc0c9", animation: "drift-b 26s ease-in-out infinite" }}
          />
          <span
            className="bg-blob"
            style={{ width: 420, height: 420, bottom: "-8%", left: "30%", background: "#ffe0a3", animation: "drift-a 30s ease-in-out infinite" }}
          />
        </div>
      </div>
      <div className="bg-grain" aria-hidden />
    </>
  );
}
