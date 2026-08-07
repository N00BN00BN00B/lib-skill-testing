import { motion } from "motion/react";
import { COMPONENTS, PURPLE, REPO, REPO_URL } from "@/data/registry";

function InstallPill() {
  const cmd = `npx shadcn add ${REPO}/fluid-orb`;
  return (
    <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <div className="flex w-full items-center justify-between gap-3 rounded-full border border-white/10 bg-black/70 px-5 py-3 font-mono text-sm text-white/85 shadow-[0_0_60px_-15px_rgba(168,85,247,0.6)] backdrop-blur-xl">
        <span className="truncate">
          <span className="text-white/50">$ </span>
          {cmd}
        </span>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(cmd)}
          className="shrink-0 rounded-full p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
          aria-label="Copy install command"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>
      </div>
      <a
        href="#components"
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(168,85,247,0.9)] transition hover:bg-purple-400"
      >
        Quick Start
      </a>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 pt-40 pb-24 text-center">
      <p className="mb-4 text-xs uppercase tracking-[0.24em] text-purple-300/80">
        Lib Skill Testing · Local sandbox for Rare UI
      </p>
      <h1 className="mx-auto max-w-4xl bg-gradient-to-b from-white via-white to-purple-200/60 bg-clip-text text-6xl font-semibold leading-[1.02] tracking-[-0.03em] text-transparent md:text-7xl">
        Tasteful Components,
        <br /> Made to Stand Out.
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
        A local playground for{" "}
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="text-purple-300 underline decoration-purple-500/50 underline-offset-4 hover:text-purple-200"
        >
          swamimalode07/rare-ui
        </a>
        . Browse every component below, click one to inspect, copy, or read the source.
      </p>
      <InstallPill />
    </section>
  );
}

function Card({
  id,
  title,
  thumbnail,
  index,
}: {
  id: string;
  title: string;
  thumbnail: () => React.ReactNode;
  index: number;
}) {
  return (
    <motion.a
      href={`#/c/${id}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: (index % 12) * 0.03 }}
      whileHover={{ y: -3 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition hover:border-purple-400/30 hover:bg-white/[0.035]"
    >
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-br from-purple-950/40 to-black/60">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          {thumbnail()}
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(168,85,247,0.18) 0%, transparent 70%)" }} />
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-4">
        <div className="text-sm font-medium text-white">{title}</div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4 text-white/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-purple-300"
        >
          <path d="M7 17L17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.a>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <section id="components" className="mx-auto max-w-6xl scroll-mt-28 px-6 pb-32">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Components
          </h2>
          <span className="text-sm text-white/40">
            {COMPONENTS.length} tasteful pieces
          </span>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COMPONENTS.map((c, i) => (
            <Card
              key={c.id}
              id={c.id}
              title={c.title}
              thumbnail={c.thumbnail}
              index={i}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl border-t border-white/[0.06] px-6 py-10 text-center text-sm text-white/40">
      Powered by Vite + React + Tailwind · accent{" "}
      <span className="font-mono" style={{ color: PURPLE }}>
        {PURPLE}
      </span>{" "}
      ·{" "}
      <a
        href={REPO_URL}
        target="_blank"
        rel="noreferrer"
        className="text-purple-300/70 hover:text-purple-200"
      >
        {REPO}
      </a>
    </footer>
  );
}
