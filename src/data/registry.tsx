import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

import { BounceSidebar } from "@/components/ui/bounce-sidebar";
import CodeBlock from "@/components/ui/code-block";
import DurationPicker, { type DurationValue } from "@/components/ui/duration-picker";
import EmojiReaction from "@/components/ui/emoji-reaction";
import FluidOrb from "@/components/ui/fluid-orb";
import FolderComponent from "@/components/ui/folder-component";
import GitHubActivity from "@/components/ui/github-activity";
import type { Contribution } from "@/components/ui/github-activity";
import GravityLetters from "@/components/ui/gravity-letters";
import OtpInput from "@/components/ui/otp-input";
import ProximitySidebar from "@/components/ui/proximity-sidebar";
import ScrollProgress from "@/components/ui/scroll-progress";

// Raw source strings, one per component, for the "view code" panel.
import bounceSidebarSrc from "@/components/ui/bounce-sidebar.tsx?raw";
import codeBlockSrc from "@/components/ui/code-block.tsx?raw";
import durationPickerSrc from "@/components/ui/duration-picker.tsx?raw";
import emojiReactionSrc from "@/components/ui/emoji-reaction.tsx?raw";
import fluidOrbSrc from "@/components/ui/fluid-orb.tsx?raw";
import folderSrc from "@/components/ui/folder-component.tsx?raw";
import githubActivitySrc from "@/components/ui/github-activity.tsx?raw";
import gravityLettersSrc from "@/components/ui/gravity-letters.tsx?raw";
import otpInputSrc from "@/components/ui/otp-input.tsx?raw";
import proximitySidebarSrc from "@/components/ui/proximity-sidebar.tsx?raw";
import scrollProgressSrc from "@/components/ui/scroll-progress.tsx?raw";

export const PURPLE = "#a855f7";
export const REPO = "swamimalode07/rare-ui";
export const REPO_URL = `https://github.com/${REPO}`;

/* ------------ smooth fluid orb wrapper ------------ */

function InteractiveOrb({
  size = 200,
  color = PURPLE,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <motion.div
      className="group relative cursor-pointer"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      style={{ width: size, height: size }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 0 80px 10px ${color}66` }}
      />
      <FluidOrb size={size} color={color} className="h-full w-full" />
    </motion.div>
  );
}

/* ------------ synthesized GitHub contributions ------------ */

export const GH_USER = "cheshire137";
export const YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

type ApiPayload = { contributions: Contribution[]; total?: Record<string, number> };

const cache = new Map<string | number, Promise<ApiPayload>>();

export function fetchContributions(year: number | "last"): Promise<ApiPayload> {
  const hit = cache.get(year);
  if (hit) return hit;
  const p = fetch(
    `https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=${year}`,
  ).then(async (r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return (await r.json()) as ApiPayload;
  });
  cache.set(year, p);
  return p;
}

/* ------------ stateful demos ------------ */

function OtpDemo() {
  const [v, setV] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const reset = () => {
    setV("");
    setStatus("idle");
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <OtpInput
        length={6}
        value={v}
        onChange={(x) => {
          setV(x);
          if (status !== "idle") setStatus("idle");
        }}
        onComplete={(x) => setStatus(x === "123456" ? "success" : "error")}
        status={status}
        autoFocus
      />
      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500/30">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Access granted — welcome in.
            <button
              type="button"
              onClick={reset}
              className="ml-1 text-xs text-emerald-100/70 underline underline-offset-4 hover:text-white"
            >
              try again
            </button>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            key="err"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-200"
          >
            Wrong code — try{" "}
            <span className="font-mono">123456</span>.
            <button
              type="button"
              onClick={reset}
              className="ml-1 text-xs text-rose-100/70 underline underline-offset-4 hover:text-white"
            >
              reset
            </button>
          </motion.div>
        )}
        {status === "idle" && (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-muted-foreground"
          >
            Enter <span className="font-mono">123456</span> to succeed.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function DurationDemo() {
  const [v, setV] = useState<DurationValue>({ hours: 0, minutes: 25 });
  return (
    <div className="flex flex-col items-center gap-3">
      <DurationPicker value={v} onChange={setV} />
      <p className="text-sm text-muted-foreground">
        {v.hours}h {v.minutes}m
      </p>
    </div>
  );
}

function BounceDemo() {
  const items = ["Home", "Docs", "Components", "Blog", "Contact"];
  const [i, setI] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const lastWheel = useRef(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      if (now - lastWheel.current < 140) return;
      if (Math.abs(e.deltaY) < 6) return;
      lastWheel.current = now;
      const dir = e.deltaY > 0 ? 1 : -1;
      setI((prev) => (prev + dir + items.length) % items.length);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [items.length]);

  return (
    <div
      ref={boxRef}
      onMouseEnter={() => setLocked(true)}
      onMouseLeave={() => setLocked(false)}
      className={`relative flex min-h-[360px] w-full flex-col items-center justify-center gap-8 rounded-xl border py-8 transition ${
        locked
          ? "border-purple-400/40 bg-purple-500/[0.04] shadow-[inset_0_0_60px_-20px_rgba(168,85,247,0.4)]"
          : "border-white/[0.06] bg-black/20"
      }`}
    >
      <BounceSidebar
        items={items}
        value={i}
        onChange={setI}
        dotColor={PURPLE}
      />
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2">
        <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur transition ${
          locked
            ? "border-purple-400/40 bg-purple-500/10 text-purple-200"
            : "border-white/10 bg-black/40 text-white/50"
        }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${locked ? "bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" : "bg-white/30"}`} />
          {locked ? "scroll locked — spin to cycle" : "hover here to lock scroll & cycle"}
        </div>
      </div>
    </div>
  );
}

function ProximityDemo() {
  const sections = [
    { id: "intro", label: "Introduction", kind: "title" as const },
    { id: "hist", label: "History", kind: "section" as const },
    { id: "over", label: "Overview", kind: "section" as const },
    { id: "arch", label: "Architecture", kind: "section" as const },
    { id: "usage", label: "Usage", kind: "section" as const },
    { id: "refs", label: "References", kind: "subtitle" as const },
  ];
  const content: Record<string, string> = {
    intro:
      "A dash-style scroll sidebar. The bars near your cursor swell — the further away, the smaller they stay. Zero JS scroll math, just proximity.",
    hist:
      "Inspired by macOS Dock magnification. It felt right for tables of contents where you want to see the shape of a document without clutter.",
    over:
      "Every section is a bar with a kind (title, subtitle, section, body). The bar length is a function of the pointer's Y distance to it.",
    arch:
      "Uses MotionValues so the animation stays off the React render loop. Frames run inside a single rAF and don't cause re-renders.",
    usage:
      "Drop it beside any scrollable content. Pass sections and it just works — no wiring needed.",
    refs:
      "Similar work: Apple's floating table of contents, Vercel Docs sidebar, macOS Dock magnification.",
  };
  return (
    <div className="grid h-full min-h-[520px] w-full grid-cols-[auto_1fr] gap-6">
      <div className="relative h-full shrink-0">
        <ProximitySidebar side="left" sections={sections} />
      </div>
      <div className="relative h-full overflow-y-auto rounded-xl border border-white/[0.06] bg-black/20 p-6">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="mb-6 scroll-mt-6">
            <h4
              className={`mb-2 ${
                s.kind === "title"
                  ? "text-2xl font-semibold text-white"
                  : s.kind === "subtitle"
                    ? "text-lg font-medium text-white/90"
                    : "text-sm font-semibold uppercase tracking-widest text-purple-300"
              }`}
            >
              {s.label}
            </h4>
            <p className="text-base leading-relaxed text-white/60">
              {content[s.id]}
            </p>
          </section>
        ))}
        <p className="text-xs text-white/30">— end of preview —</p>
      </div>
    </div>
  );
}

function useContributionsForYear(year: number) {
  const [state, setState] = useState<{
    loading: boolean;
    days: Contribution[];
    total: number;
    error?: string;
  }>({ loading: true, days: [], total: 0 });

  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true }));
    fetchContributions(year)
      .then((d) => {
        if (!alive) return;
        const days = d.contributions ?? [];
        const total = days.reduce((s, c) => s + c.count, 0);
        setState({ loading: false, days, total });
      })
      .catch((e) => {
        if (!alive) return;
        setState({ loading: false, days: [], total: 0, error: String(e) });
      });
    return () => {
      alive = false;
    };
  }, [year]);

  return state;
}

function YearPill({
  years,
  value,
  onChange,
}: {
  years: number[];
  value: number;
  onChange: (y: number) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/50 p-1 backdrop-blur">
      {years.map((y) => {
        const active = y === value;
        return (
          <button
            key={y}
            type="button"
            onClick={() => onChange(y)}
            className={`relative rounded-full px-3 py-1 text-xs font-medium tabular-nums transition ${
              active ? "text-white" : "text-white/50 hover:text-white/80"
            }`}
          >
            {active && (
              <motion.span
                layoutId="year-pill-active"
                className="absolute inset-0 rounded-full bg-purple-500/25 ring-1 ring-purple-400/50"
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
              />
            )}
            <span className="relative">{y}</span>
          </button>
        );
      })}
    </div>
  );
}

function GitHubDemo() {
  const [year, setYear] = useState<number>(2025);
  const [open, setOpen] = useState(false);
  const { loading, days, total } = useContributionsForYear(year);
  const contribs = useMemo(() => (days.length ? days : undefined), [days]);

  return (
    <div className="flex w-full max-w-[760px] flex-col items-stretch gap-4">
      {/* Header row — always visible */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-3 text-left"
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition group-hover:text-white"
            aria-hidden
          >
            <motion.svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
            >
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </span>
          <span>
            <span className="block text-xs uppercase tracking-widest text-white/40">
              @{GH_USER} · {year}
            </span>
            <span className="block text-base font-semibold tabular-nums text-white">
              {loading ? "…" : total.toLocaleString()}{" "}
              <span className="text-sm font-normal text-white/50">
                contributions
              </span>
            </span>
          </span>
        </button>
        <YearPill years={YEARS} value={year} onChange={setYear} />
      </div>

      {/* Collapsible calendar + repos */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col items-center gap-4 pt-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="flex w-full justify-center"
                >
                  <GitHubActivity
                    username={GH_USER}
                    contributions={contribs ?? []}
                    accent={PURPLE}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ScrollProgressDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [meters, setMeters] = useState(0);
  const MAX_METERS = 500;

  const stops = useMemo(
    () =>
      Array.from({ length: 21 }, (_, i) => ({
        id: `m${i * 25}`,
        label: `${i * 25}m`,
      })),
    [],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const p = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
      setProgress(p);
      setMeters(Math.round(p * MAX_METERS));
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full">
      {/* Live custom progress bar */}
      <div className="mb-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="mb-1.5 flex items-baseline justify-between text-xs">
            <span className="uppercase tracking-widest text-white/40">
              Scrolling Progress
            </span>
            <span className="font-mono tabular-nums text-white/70">
              {meters}m / {MAX_METERS}m
            </span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${PURPLE}, #d946ef)`,
                boxShadow: `0 0 16px ${PURPLE}80`,
              }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable content bound to the ScrollProgress via containerRef */}
      <div
        ref={ref}
        className="relative h-[440px] overflow-y-auto rounded-xl border border-white/[0.06] bg-black/20"
      >
        <div className="sticky top-4 z-10 mx-auto w-fit">
          <ScrollProgress containerRef={ref} sections={stops} />
        </div>

        <div className="space-y-16 px-8 py-10">
          {stops.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-16 border-l-2 border-purple-500/30 pl-6"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-purple-300/80">
                {s.label}
              </div>
              <h4 className="mt-1 text-lg font-semibold text-white">
                Checkpoint {s.label}
              </h4>
              <p className="mt-2 max-w-md text-sm text-white/55">
                Keep scrolling — the pill above tracks your position inside this
                box, and the bar at the top fills as you approach 500m.
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------ registry ------------ */

export type ComponentEntry = {
  id: string;
  title: string;
  description: string;
  dependencies: string[];
  interaction: string;
  preview: () => ReactNode;
  thumbnail: () => ReactNode;
  source: string;
  install: string;
  usage: string;
};

const REG = "swamimalode07/rare-ui";

function makeInstall(id: string) {
  return `npx shadcn add ${REG}/${id}`;
}

export const COMPONENTS: ComponentEntry[] = [
  {
    id: "folder-component",
    title: "Folder Component",
    description:
      "An animated folder whose cards fan out on hover and lift open on click, with a 3D-tilted flap. Supports color and size (sm/md/lg) props.",
    dependencies: ["motion"],
    interaction: "Hover to fan the cards out, then click to lift the folder open.",
    preview: () => (
      <div className="flex flex-wrap items-end justify-center gap-8 py-6">
        <FolderComponent color="black" size="md" />
        <FolderComponent color="blue" size="md" />
        <FolderComponent color="white" size="md" />
      </div>
    ),
    thumbnail: () => (
      <div className="grid h-full place-items-center">
        <FolderComponent color="black" size="sm" />
      </div>
    ),
    source: folderSrc,
    install: makeInstall("folder-component"),
    usage: `import { Folder } from "@/components/ui/folder-component";

export function Demo() {
  return <Folder color="blue" size="md" />;
}`,
  },
  {
    id: "bounce-sidebar",
    title: "Bounce Sidebar",
    description:
      "A vertical navigation list with a bouncy, spring-animated active indicator.",
    dependencies: ["motion"],
    interaction: "Click any item — the indicator springs to the new selection.",
    preview: () => (
      <div className="grid place-items-center py-6">
        <BounceDemo />
      </div>
    ),
    thumbnail: () => (
      <div className="grid h-full place-items-center">
        <BounceDemo />
      </div>
    ),
    source: bounceSidebarSrc,
    install: makeInstall("bounce-sidebar"),
    usage: `import { BounceSidebar } from "@/components/ui/bounce-sidebar";

export function Demo() {
  return <BounceSidebar items={["Home", "Docs", "Blog"]} />;
}`,
  },
  {
    id: "proximity-sidebar",
    title: "Proximity Sidebar",
    description:
      "A dash-style scroll sidebar whose items expand as the pointer approaches.",
    dependencies: ["motion"],
    interaction: "Move the pointer near the edge to reveal expanded labels.",
    preview: () => <ProximityDemo />,
    thumbnail: () => (
      <div className="flex h-full items-center justify-start pl-8">
        <div className="flex flex-col gap-2">
          {[36, 60, 24, 48, 30, 42, 22].map((w, i) => (
            <div
              key={i}
              className="h-[3px] rounded-full bg-white/40"
              style={{ width: w }}
            />
          ))}
        </div>
      </div>
    ),
    source: proximitySidebarSrc,
    install: makeInstall("proximity-sidebar"),
    usage: `import ProximitySidebar from "@/components/ui/proximity-sidebar";

export function Demo() {
  return (
    <ProximitySidebar
      sections={[
        { id: "intro", label: "Intro", kind: "title" },
        { id: "one", label: "Section 1", kind: "section" },
      ]}
    />
  );
}`,
  },
  {
    id: "duration-picker",
    title: "Duration Picker",
    description:
      "A gooey, spring-animated picker for entering a duration in hours and minutes.",
    dependencies: ["motion", "figma-squircle", "react-use-measure"],
    interaction: "Click a slot to edit, type, then confirm with the check.",
    preview: () => (
      <div className="grid place-items-center py-8">
        <DurationDemo />
      </div>
    ),
    thumbnail: () => (
      <div className="grid h-full place-items-center">
        <DurationDemo />
      </div>
    ),
    source: durationPickerSrc,
    install: makeInstall("duration-picker"),
    usage: `import { DurationPicker } from "@/components/ui/duration-picker";

export function Demo() {
  return <DurationPicker />;
}`,
  },
  {
    id: "fluid-orb",
    title: "Fluid Orb",
    description:
      "An animated WebGL orb with drifting fluid shading. Supports size and color props.",
    dependencies: ["react"],
    interaction: "Hover for a soft glow lift, click to squish. Reduced-motion aware.",
    preview: () => (
      <div className="flex flex-wrap items-center justify-center gap-10 py-6">
        <InteractiveOrb size={200} color={PURPLE} />
        <InteractiveOrb size={200} color="#d946ef" />
        <InteractiveOrb size={200} color="#6366f1" />
      </div>
    ),
    thumbnail: () => (
      <div className="grid h-full place-items-center">
        <FluidOrb size={140} color={PURPLE} />
      </div>
    ),
    source: fluidOrbSrc,
    install: makeInstall("fluid-orb"),
    usage: `import FluidOrb from "@/components/ui/fluid-orb";

export function Demo() {
  return <FluidOrb size={240} color="#a855f7" />;
}`,
  },
  {
    id: "scroll-progress",
    title: "Scroll Progress",
    description:
      "A scroll progress pill that tracks reading position and expands into a squircle menu of sections you can jump to.",
    dependencies: ["motion"],
    interaction: "Click the pill to open the section menu.",
    preview: () => <ScrollProgressDemo />,
    thumbnail: () => (
      <div className="grid h-full place-items-center">
        <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 backdrop-blur">
          <span className="h-4 w-4 rounded-full border-2 border-purple-400/40 border-t-purple-400" />
          <span className="text-xs">Scroll Progress</span>
        </div>
      </div>
    ),
    source: scrollProgressSrc,
    install: makeInstall("scroll-progress"),
    usage: `import ScrollProgress from "@/components/ui/scroll-progress";

export function Demo() {
  return <ScrollProgress sections={[{ id: "a", label: "A" }]} />;
}`,
  },
  {
    id: "code-block",
    title: "Code Block",
    description:
      "A clean code block that builds its entire theme from a single accent color. Pass code and a hex, it does the rest.",
    dependencies: ["prism-react-renderer"],
    interaction: "Copy the code with the button in the header.",
    preview: () => (
      <div className="mx-auto max-w-2xl">
        <CodeBlock
          code={`import FluidOrb from "@/components/ui/fluid-orb";\n\nexport default function Hero() {\n  return (\n    <div className="grid min-h-screen place-items-center">\n      <FluidOrb size={320} color="#a855f7" />\n    </div>\n  );\n}\n`}
          language="tsx"
          filename="hero.tsx"
          accent={PURPLE}
        />
      </div>
    ),
    thumbnail: () => (
      <div className="grid h-full w-full grid-cols-[auto_1fr] items-center gap-3 p-6 text-left font-mono text-[10px] leading-4">
        <div className="text-white/25">1</div>
        <div>
          <span className="text-purple-300">import</span> FluidOrb …
        </div>
        <div className="text-white/25">2</div>
        <div className="text-white/40">// glowing WebGL sphere</div>
        <div className="text-white/25">3</div>
        <div>
          <span className="text-purple-300">export</span> …
        </div>
      </div>
    ),
    source: codeBlockSrc,
    install: makeInstall("code-block"),
    usage: `import CodeBlock from "@/components/ui/code-block";

export function Demo() {
  return <CodeBlock code="hi" language="tsx" accent="#a855f7" />;
}`,
  },
  {
    id: "gravity-letters",
    title: "Gravity Letters",
    description:
      "A playful gravity field where letters, numbers, emoji, or any components you pass fall and pile up like real objects.",
    dependencies: ["motion"],
    interaction: "Click and hold in the box to pour a stream of letters.",
    preview: () => (
      <div className="relative h-[420px] w-full cursor-crosshair overflow-hidden rounded-xl border border-white/[0.06] bg-black/30">
        <GravityLetters
          type="both"
          gravity={900}
          size={44}
          color={PURPLE}
          className="absolute inset-0 h-full w-full"
        />
        <div className="pointer-events-none absolute inset-x-0 top-4 text-center text-xs uppercase tracking-widest text-white/30">
          click &amp; hold to pour
        </div>
      </div>
    ),
    thumbnail: () => (
      <div className="grid h-full place-items-center font-semibold text-purple-300/60">
        A B C 1 2 3
      </div>
    ),
    source: gravityLettersSrc,
    install: makeInstall("gravity-letters"),
    usage: `import GravityLetters from "@/components/ui/gravity-letters";

export function Demo() {
  return <GravityLetters type="both" size={40} color="#a855f7" />;
}`,
  },
  {
    id: "otp-input",
    title: "OTP Input",
    description:
      "A one-time-code input whose characters roll into place behind a caret that slides from slot to slot.",
    dependencies: ["motion"],
    interaction: "Type digits — the caret slides and characters roll in.",
    preview: () => (
      <div className="grid place-items-center py-8">
        <OtpDemo />
      </div>
    ),
    thumbnail: () => (
      <div className="flex h-full items-center justify-center gap-1.5">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className={`grid h-8 w-6 place-items-center rounded-md border ${
              n === 1
                ? "border-purple-400 text-white"
                : "border-white/10 text-white/20"
            }`}
          >
            •
          </div>
        ))}
      </div>
    ),
    source: otpInputSrc,
    install: makeInstall("otp-input"),
    usage: `import OtpInput from "@/components/ui/otp-input";

export function Demo() {
  return <OtpInput length={6} />;
}`,
  },
  {
    id: "github-activity",
    title: "GitHub Activity",
    description:
      "A contribution heatmap with a footer panel that expands over the grid to rank your top repositories.",
    dependencies: ["motion", "lucide-react"],
    interaction:
      "Click a year to swap the heatmap; the footer expands into a ranked list of top repos.",
    preview: () => <GitHubDemo />,
    thumbnail: () => (
      <div className="grid h-full grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-6 gap-[3px] p-6">
        {Array.from({ length: 120 }).map((_, i) => {
          const lvl = Math.random();
          const bg =
            lvl > 0.85
              ? "bg-purple-400"
              : lvl > 0.7
                ? "bg-purple-500/70"
                : lvl > 0.55
                  ? "bg-purple-500/40"
                  : "bg-white/10";
          return <div key={i} className={`aspect-square rounded-[3px] ${bg}`} />;
        })}
      </div>
    ),
    source: githubActivitySrc,
    install: makeInstall("github-activity"),
    usage: `import GitHubActivity from "@/components/ui/github-activity";

export function Demo() {
  return <GitHubActivity username="octocat" />;
}`,
  },
  {
    id: "emoji-reaction",
    title: "Emoji Reaction",
    description:
      "A tapback-style reaction button that opens a bar of Apple emoji and sends copies of your pick floating up out of it.",
    dependencies: ["motion", "react-apple-emojis"],
    interaction: "Click the smiley to open the picker; tap or hold an emoji.",
    preview: () => (
      <div className="relative flex min-h-[420px] w-full items-end justify-center pb-16">
        <div className="pointer-events-none absolute inset-x-0 top-6 text-center text-xs uppercase tracking-widest text-white/30">
          click the smiley — hold an emoji to burst it
        </div>
        <EmojiReaction />
      </div>
    ),
    thumbnail: () => (
      <div className="grid h-full place-items-center text-2xl">😍 🥰 🤩</div>
    ),
    source: emojiReactionSrc,
    install: makeInstall("emoji-reaction"),
    usage: `import EmojiReaction from "@/components/ui/emoji-reaction";

export function Demo() {
  return <EmojiReaction />;
}`,
  },
];

export function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const id = hash.startsWith("#/c/") ? hash.slice(4) : null;
  const entry = id ? (COMPONENTS.find((c) => c.id === id) ?? null) : null;
  return { hash, entry };
}

export { ScrollProgress };
