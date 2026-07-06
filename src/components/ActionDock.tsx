import { useEffect, useRef, useState } from "react";
import {
  ChatIcon, CloseIcon, ArrowIcon, CalendarIcon, SparkIcon,
} from "./icons";
import { chatbot, profile } from "../data/content";
import { confettiBurst } from "../lib/confetti";

type Msg = { role: "bot" | "user"; text: string };

function findAnswer(input: string): string {
  const q = input.toLowerCase();
  let best: { score: number; a: string } | null = null;
  for (const item of chatbot.qa) {
    let score = 0;
    for (const k of item.keywords) if (q.includes(k)) score += k.length;
    if (score > 0 && (!best || score > best.score)) best = { score, a: item.a };
  }
  return best ? best.a : chatbot.fallback;
}

/**
 * A single persistent control reachable at any scroll position, carrying both
 * calls to action ("See my work" and "Book a chat", the latter with a confetti
 * celebration) plus an "Ask" chat. Keyboard accessible; both CTAs work with no
 * animation.
 */
export function ActionDock() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: chatbot.intro },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, chatOpen]);

  const ask = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { role: "user", text: t }, { role: "bot", text: findAnswer(t) }]);
    setInput("");
  };

  const starterChips = chatbot.starters
    .map((id) => chatbot.qa.find((q) => q.id === id))
    .filter(Boolean) as { chip: string }[];

  const celebrate = (e: React.MouseEvent) => confettiBurst(e.clientX, e.clientY);

  return (
    <>
      {/* Chat panel */}
      {chatOpen && (
        <div className="fixed bottom-24 right-4 z-[80] flex h-[27rem] w-[21rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-line bg-cream shadow-lift sm:right-6">
          <div className="flex items-center gap-2 border-b border-line bg-paper px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-coral/15 text-coral">
              <ChatIcon className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-bold text-ink">Ask me anything</p>
              <p className="text-[11px] text-ink-faint">about Maira</p>
            </div>
            <button onClick={() => setChatOpen(false)} aria-label="Close chat" className="ml-auto text-ink-faint hover:text-ink">
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          <div ref={scrollRef} data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <p className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-coral text-white" : "bg-paper-2 text-ink"}`}>
                  {m.text}
                </p>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {starterChips.map((c) => (
                <button key={c.chip} onClick={() => ask(c.chip)} className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-coral hover:text-coral-deep">
                  {c.chip}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="flex items-center gap-2 border-t border-line bg-paper px-3 py-2.5">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a question..." aria-label="Ask a question" className="flex-1 rounded-full border border-line bg-cream px-3.5 py-2 text-sm text-ink outline-none focus:border-coral" />
            <button type="submit" aria-label="Send" className="flex h-9 w-9 items-center justify-center rounded-full bg-coral text-white transition-colors hover:bg-coral-deep">
              <ArrowIcon className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Persistent dock */}
      <div className="fixed inset-x-0 bottom-4 z-[81] mx-auto flex w-fit max-w-[calc(100vw-1rem)] items-center gap-1 rounded-full border border-line bg-cream/90 p-1.5 shadow-lift backdrop-blur-md" style={{ animation: "dock-in 0.6s var(--ease-out-back) both" }}>
        <a
          href="#highlights"
          data-cursor
          className="squash inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-semibold text-ink hover:bg-paper-2 sm:px-4"
        >
          <SparkIcon className="h-4 w-4 shrink-0 text-coral" />
          See my work
        </a>
        <a
          href={profile.calendly}
          target="_blank"
          rel="noopener noreferrer"
          onClick={celebrate}
          data-cursor
          className="squash inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-coral px-3.5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-coral-deep sm:px-4"
        >
          <CalendarIcon className="h-4 w-4" />
          Book a chat
        </a>
        <button
          type="button"
          onClick={() => setChatOpen((v) => !v)}
          aria-label={chatOpen ? "Close chat" : "Ask me anything"}
          aria-expanded={chatOpen}
          data-cursor
          className="squash inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink hover:border-coral hover:text-coral-deep"
        >
          {chatOpen ? <CloseIcon className="h-5 w-5" /> : <ChatIcon className="h-5 w-5 text-coral" />}
        </button>
      </div>
    </>
  );
}
