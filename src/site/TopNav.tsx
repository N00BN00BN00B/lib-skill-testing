import { useEffect, useState } from "react";
import { REPO, REPO_URL } from "@/data/registry";

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.74-1.57-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.44-2.7 5.4-5.26 5.69.41.35.78 1.05.78 2.12v3.14c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LogoMark() {
  // small purple orb with radial highlight
  return (
    <span
      aria-hidden
      className="inline-block h-6 w-6 rounded-full ring-1 ring-white/10"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, #f3e8ff 0%, #a855f7 45%, #4c1d95 100%)",
        boxShadow: "0 0 18px rgba(168,85,247,0.6)",
      }}
    />
  );
}

function useStarCount(owner: string, repo: string) {
  const [stars, setStars] = useState<number | null>(null);
  useEffect(() => {
    let alive = true;
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d) setStars(d.stargazers_count ?? null);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [owner, repo]);
  return stars;
}

export function TopNav() {
  const [owner, repo] = REPO.split("/");
  const stars = useStarCount(owner, repo);
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div className="flex w-full max-w-5xl items-center justify-between gap-3">
        <a
          href="#/"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-sm font-semibold tracking-tight text-white backdrop-blur-xl transition hover:border-white/20"
        >
          <LogoMark />
          Lib&nbsp;Skill&nbsp;Testing
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/60 px-1.5 py-1 text-sm backdrop-blur-xl md:flex">
          <a
            href="#/"
            className="rounded-full px-4 py-1.5 text-white transition hover:bg-white/10"
          >
            Home
          </a>
          <a
            href="#components"
            className="rounded-full px-4 py-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Components
          </a>
        </nav>

        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-sm text-white/80 backdrop-blur-xl transition hover:border-white/20 hover:text-white"
          title="View swamimalode07/rare-ui on GitHub"
        >
          <GitHubIcon className="h-4 w-4" />
          <span className="tabular-nums">{stars ?? "—"}</span>
        </a>
      </div>
    </div>
  );
}
