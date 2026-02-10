import { useState, useEffect, lazy, Suspense } from "react";
import { ColorSchemeProvider } from "./hooks/useColorScheme";
import "./reset.css";
import "./theme.css";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useHashRouter } from "./hooks/useHashRouter";
import type { Deck, GrammarLesson } from "./types";
import { trackPageView } from "./analytics";

const FlowScreen = lazy(() => import("./components/FlowScreen").then(m => ({ default: m.FlowScreen })));
const HowGermanWorks = lazy(() => import("./components/HowGermanWorks").then(m => ({ default: m.HowGermanWorks })));

export default function App() {
  const { view, navigate } = useHashRouter();
  const [stats, setStats] = useState<{ mastered: string } | undefined>();

  const viewKey = view.type === 'flow'
    ? `flow:${view.sources.map(s => s.id).join(',')}`
    : view.type;
  useEffect(() => { trackPageView(viewKey); }, [viewKey]);

  const handleHome = () => navigate({ type: "dashboard" });
  const handleSelectDeck = (deck: Deck) => navigate({ type: "flow", sources: [deck] });
  const handleSelectLesson = (lesson: GrammarLesson) =>
    navigate({ type: "flow", sources: [lesson] });
  const handleStartFlow = (sources: Array<Deck | GrammarLesson>) =>
    navigate({ type: "flow", sources });

  return (
    <ColorSchemeProvider>
      <ErrorBoundary>
      {view.type === "dashboard" && (
        <Layout stats={stats}>
          <Dashboard
            onSelectDeck={handleSelectDeck}
            onSelectLesson={handleSelectLesson}
            onStartFlow={handleStartFlow}
            onStatsChange={setStats}
          />
        </Layout>
      )}
      {view.type === "how-german-works" && (
        <Layout stats={stats} onHome={handleHome}>
          <Suspense>
            <HowGermanWorks />
          </Suspense>
        </Layout>
      )}
      {view.type === "flow" && (
        <Suspense>
          <FlowScreen
            key={view.sources.map(s => s.id).join(",")}
            sources={view.sources}
            onExit={handleHome}
          />
        </Suspense>
      )}
      </ErrorBoundary>
    </ColorSchemeProvider>
  );
}
