import { useEffect, useRef, useState } from "react";
import { ChatIcon, CloseIcon, ArrowIcon } from "./icons";
import { chatbot } from "../data/content";

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

export function AskMeAnything() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: chatbot.intro },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const ask = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { role: "user", text: t }, { role: "bot", text: findAnswer(t) }]);
    setInput("");
  };

  const starterChips = chatbot.starters
    .map((id) => chatbot.qa.find((q) => q.id === id))
    .filter(Boolean) as { chip: string }[];

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[30rem] w-[21rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl border border-line bg-cream shadow-lift">
          <div className="flex items-center gap-2 border-b border-line bg-paper px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-coral/15 text-coral">
              <ChatIcon className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-bold text-ink">Ask me anything</p>
              <p className="text-[11px] text-ink-faint">about Maira</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="ml-auto text-ink-faint hover:text-ink">
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <p
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-coral text-white"
                      : "bg-paper-2 text-ink"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}

            {/* starter chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {starterChips.map((c) => (
                <button
                  key={c.chip}
                  onClick={() => ask(c.chip)}
                  className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-coral hover:text-coral-deep"
                >
                  {c.chip}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); ask(input); }}
            className="flex items-center gap-2 border-t border-line bg-paper px-3 py-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question..."
              className="flex-1 rounded-full border border-line bg-cream px-3.5 py-2 text-sm text-ink outline-none focus:border-coral"
            />
            <button type="submit" aria-label="Send" className="flex h-9 w-9 items-center justify-center rounded-full bg-coral text-white transition-colors hover:bg-coral-deep">
              <ArrowIcon className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close ask me anything" : "Ask me anything"}
        className="group inline-flex items-center gap-2 self-end rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-paper shadow-lift transition-transform hover:scale-[1.03] active:scale-95"
      >
        {open ? <CloseIcon className="h-5 w-5" /> : <ChatIcon className="h-5 w-5 text-amber" />}
        {open ? "Close" : "Ask me anything"}
      </button>
    </div>
  );
}
