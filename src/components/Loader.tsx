import { useEffect, useState } from "react";

/**
 * A short branded loading state so the page never opens on a blank flash.
 * The name assembles letter by letter, then the panel fades away. Skipped
 * entirely for reduced-motion (CSS hides it, and we unmount immediately).
 */
export function Loader() {
  const [gone, setGone] = useState(false);
  const [done, setDone] = useState(false);
  const word = "Maira.";

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    const t1 = window.setTimeout(() => setDone(true), 850);
    const t2 = window.setTimeout(() => setGone(true), 1500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div id="loader" className={done ? "done" : ""} aria-hidden>
      <span className="loader-word">
        {word.split("").map((c, i) => (
          <span
            key={i}
            className={c === "." ? "dot" : ""}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            {c}
          </span>
        ))}
      </span>
    </div>
  );
}
