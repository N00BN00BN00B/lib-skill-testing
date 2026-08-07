import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import CodeBlock from "@/components/ui/code-block";
import { COMPONENTS, PURPLE, type ComponentEntry } from "@/data/registry";

function IconButton({
  active,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={active}
      className={`grid h-9 w-9 place-items-center rounded-full border transition ${
        active
          ? "border-purple-400/50 bg-purple-500/15 text-purple-200"
          : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Sidebar({ current }: { current: ComponentEntry }) {
  return (
    <aside className="hidden w-56 shrink-0 pr-6 md:block">
      <div className="sticky top-24 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="mb-3 px-2 text-xs font-medium uppercase tracking-widest text-white/40">
          Components
        </div>
        <nav className="flex flex-col gap-0.5">
          {COMPONENTS.map((c) => {
            const active = c.id === current.id;
            return (
              <a
                key={c.id}
                href={`#/c/${c.id}`}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${
                  active
                    ? "bg-white/[0.04] text-white"
                    : "text-white/60 hover:bg-white/[0.03] hover:text-white/90"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    active ? "bg-purple-400" : "bg-white/15"
                  }`}
                />
                {c.title}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

function Meta({ entry }: { entry: ComponentEntry }) {
  return (
    <div className="mt-8 grid gap-8">
      <section>
        <div className="mb-2 text-xs font-medium uppercase tracking-widest text-white/40">
          {entry.title}
        </div>
        <h1 className="text-3xl font-semibold leading-snug tracking-tight text-white md:text-4xl">
          {entry.description}
        </h1>
      </section>

      <section>
        <div className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">
          Dependencies
        </div>
        <div className="flex flex-wrap gap-2">
          {entry.dependencies.map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-white/80"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: PURPLE }}
              />
              {d}
            </span>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-2 text-xs font-medium uppercase tracking-widest text-white/40">
          Interaction
        </div>
        <p className="text-white/75">{entry.interaction}</p>
      </section>

      <section>
        <div className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">
          Installation
        </div>
        <CodeBlock
          code={entry.install}
          language="bash"
          filename="terminal"
          accent={PURPLE}
        />
      </section>

      <section>
        <div className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">
          How to use
        </div>
        <CodeBlock
          code={entry.usage}
          language="tsx"
          filename="demo.tsx"
          accent={PURPLE}
        />
      </section>
    </div>
  );
}

export function Detail({ entry }: { entry: ComponentEntry }) {
  const [showCode, setShowCode] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <a
        href="#/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        All components
      </a>

      <div className="flex gap-0">
        <Sidebar current={entry} />

        <div className="min-w-0 flex-1">
          {/* Preview surface — always full width */}
          <div className="relative min-h-[520px] rounded-2xl border border-white/[0.08] bg-gradient-to-br from-purple-950/25 via-black/40 to-black/60 shadow-[0_0_80px_-40px_rgba(168,85,247,0.6)]">
            <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
              <IconButton
                title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
                active={fullscreen}
                onClick={() => setFullscreen((f) => !f)}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 4H4v5M20 9V4h-5M4 15v5h5M15 20h5v-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </IconButton>
              <IconButton
                title={showCode ? "Hide code" : "Show code"}
                active={showCode}
                onClick={() => setShowCode((s) => !s)}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </IconButton>
            </div>
            <div
              className={`flex w-full items-center justify-center p-8 ${
                fullscreen ? "min-h-[70vh]" : "min-h-[520px]"
              }`}
            >
              <div className="w-full">{entry.preview()}</div>
            </div>
          </div>

          {/* Code panel — appears BELOW preview so preview keeps its full width */}
          <AnimatePresence initial={false}>
            {showCode && (
              <motion.div
                key="code"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/60"
              >
                <div className="max-h-[560px] overflow-auto">
                  <CodeBlock
                    code={entry.source}
                    language="tsx"
                    filename={`${entry.id}.tsx`}
                    accent={PURPLE}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Meta entry={entry} />
        </div>
      </div>
    </div>
  );
}
