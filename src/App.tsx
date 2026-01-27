import { useState } from "react";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { DrillScreen } from "./components/DrillScreen";
import { FillBlankScreen } from "./components/FillBlankScreen";
import { useHashRouter } from "./hooks/useHashRouter";
import type { Deck, GrammarLesson } from "./types";

const theme = createTheme({
  primaryColor: "pink",
  colors: {
    pink: [
      "#fff0f7",
      "#ffe0ef",
      "#ffc0df",
      "#ff80bf",
      "#ff409f",
      "#f6019d",
      "#d40078",
      "#a30060",
      "#720048",
      "#410030",
    ],
    ink: [
      "#f0f0ff",
      "#e0e0ff",
      "#c8c8e0",
      "#9898c0",
      "#6060a0",
      "#4040a0",
      "#303080",
      "#202060",
      "#161640",
      "#0a0a20",
    ],
  },
  fontFamily: "'VT323', 'Courier New', monospace",
  headings: {
    fontFamily: "'Press Start 2P', 'Courier New', monospace",
    fontWeight: "400",
  },
  radius: {
    xs: "2px",
    sm: "4px",
    md: "4px",
    lg: "8px",
    xl: "8px",
  },
  defaultRadius: "sm",
});

export default function App() {
  const { view, navigate } = useHashRouter();
  const [activeTab, setActiveTab] = useState<"vocabulary" | "grammar">("vocabulary");
  const [stats, setStats] = useState<{ practiced: string; mastered: string; wordsLearned: string } | undefined>();

  const handleHome = () => navigate({ type: "dashboard" });
  const handleSelectDeck = (deck: Deck) => navigate({ type: "drill", deck });
  const handleSelectLesson = (lesson: GrammarLesson) =>
    navigate({ type: "grammar", lesson });

  return (
    <MantineProvider theme={theme}>
      {view.type === "dashboard" && (
        <Layout
          activeTab={activeTab}
          onTabChange={setActiveTab}
          showTabs
          stats={stats}
        >
          <Dashboard
            onSelectDeck={handleSelectDeck}
            onSelectLesson={handleSelectLesson}
            activeTab={activeTab}
            onStatsChange={setStats}
          />
        </Layout>
      )}
      {view.type === "drill" && (
        <DrillScreen
          key={view.deck.id}
          deck={view.deck}
          onExit={handleHome}
        />
      )}
      {view.type === "grammar" && (
        <FillBlankScreen
          key={view.lesson.id}
          lesson={view.lesson}
          onExit={handleHome}
        />
      )}
    </MantineProvider>
  );
}
