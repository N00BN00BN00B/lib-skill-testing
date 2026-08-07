import { useEffect } from "react";
import { TopNav } from "@/site/TopNav";
import { Home, Footer } from "@/site/Home";
import { Detail } from "@/site/Detail";
import { COMPONENTS, ScrollProgress, useHashRoute } from "@/data/registry";

function PurpleBackdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(168,85,247,0.30) 0%, rgba(120,58,180,0.10) 35%, rgba(8,7,13,0) 70%), radial-gradient(40% 30% at 85% 20%, rgba(217,70,239,0.16) 0%, rgba(8,7,13,0) 60%), radial-gradient(50% 40% at 15% 30%, rgba(99,102,241,0.16) 0%, rgba(8,7,13,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[560px] blur-3xl"
        style={{
          background:
            "radial-gradient(45% 60% at 50% 20%, rgba(168,85,247,0.45) 0%, transparent 70%)",
        }}
      />
    </>
  );
}

function App() {
  const { entry } = useHashRoute();

  // Scroll-to-top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [entry?.id]);

  const scrollSections = entry
    ? [
        { id: "top", label: entry.title },
        { id: "components", label: "All components" },
      ]
    : [{ id: "components", label: "Components" }, ...COMPONENTS.map((c) => ({ id: c.id, label: c.title }))];

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <PurpleBackdrop />
      <TopNav />

      {!entry && (
        <ScrollProgress
          className="fixed top-[74px] left-1/2 z-40 -translate-x-1/2"
          sections={scrollSections}
        />
      )}

      {entry ? (
        <>
          <Detail entry={entry} />
          <Footer />
        </>
      ) : (
        <Home />
      )}
    </div>
  );
}

export default App;
