import { useEffect, useState } from "react";
import {
  Container,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import { decks } from "../data/decks";
import { grammarLessons } from "../data/grammar";
import { getDeckProgress, getCircleCount } from "../db";
import type { Deck, DeckCategory, GrammarLesson } from "../types";
import { DeckCard } from "./ui/DeckCard";

interface DashboardProps {
  onSelectDeck: (deck: Deck) => void;
  onSelectLesson: (lesson: GrammarLesson) => void;
}

const MASTERY_THRESHOLD = 3;

const CATEGORY_INFO: Record<DeckCategory, { title: string; description: string }> = {
  "sentence-structure": {
    title: "Sentence Structure",
    description: "Grammar words that connect and modify sentences",
  },
  "descriptive-words": {
    title: "Descriptive Words",
    description: "Vocabulary that adds detail to your sentences",
  },
  miscellaneous: {
    title: "Miscellaneous",
    description: "Numbers, dates, and other useful vocabulary",
  },
};

const CATEGORY_ORDER: DeckCategory[] = ["sentence-structure", "descriptive-words", "miscellaneous"];

export function Dashboard({ onSelectDeck, onSelectLesson }: DashboardProps) {
  const [deckProgress, setDeckProgress] = useState<
    Map<string, { completed: number; total: number }>
  >(new Map());
  const [lessonProgress, setLessonProgress] = useState<
    Map<string, { completed: number; total: number }>
  >(new Map());
  const [circleCountsMap, setCircleCountsMap] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    async function loadProgress() {
      const deckData = new Map<string, { completed: number; total: number }>();
      const circlesData = new Map<string, number>();

      for (const deck of decks) {
        const progress = await getDeckProgress(deck.id);
        const circles = await getCircleCount(deck.id);
        const total = deck.words.length * 2;
        let completed = 0;
        for (const streak of progress.values()) {
          if (streak >= MASTERY_THRESHOLD) completed++;
        }
        deckData.set(deck.id, { completed, total });
        circlesData.set(deck.id, circles);
      }
      setDeckProgress(deckData);
      setCircleCountsMap(circlesData);

      const lessonData = new Map<string, { completed: number; total: number }>();
      for (const lesson of grammarLessons) {
        const progress = await getDeckProgress(lesson.id);
        const circles = await getCircleCount(lesson.id);
        const total = lesson.exercises.length;
        let completed = 0;
        for (const streak of progress.values()) {
          if (streak >= MASTERY_THRESHOLD) completed++;
        }
        lessonData.set(lesson.id, { completed, total });
        circlesData.set(lesson.id, circles);
      }
      setLessonProgress(lessonData);
      setCircleCountsMap(new Map(circlesData)); // Update with lessons too
    }
    loadProgress();
  }, []);

  const decksByCategory = CATEGORY_ORDER.map((category) => ({
    category,
    ...CATEGORY_INFO[category],
    decks: decks.filter((d) => d.category === category),
  }));

  const categoryColors: Record<DeckCategory, string> = {
    "sentence-structure": "#f6019d",
    "descriptive-words": "#2de2e6",
    miscellaneous: "#9d00ff",
  };

  const [activeTab, setActiveTab] = useState<string | null>(() => {
    return localStorage.getItem("dashboard-tab") || "vocabulary";
  });

  // Persist tab selection
  useEffect(() => {
    if (activeTab) {
      localStorage.setItem("dashboard-tab", activeTab);
    }
  }, [activeTab]);

  // Keyboard shortcuts: 1 = Vocabulary, 2 = Grammar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "1") {
        setActiveTab("vocabulary");
      } else if (e.key === "2") {
        setActiveTab("grammar");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getTabStyle = (tabValue: string) => {
    const isActive = activeTab === tabValue;
    return {
      fontSize: "var(--text-lg)",
      fontWeight: isActive ? 700 : 500,
      padding: "var(--space-3) var(--space-6)",
      color: isActive ? "#ffffff" : "var(--color-text-muted)",
      background: isActive
        ? "linear-gradient(180deg, rgba(246, 1, 157, 0.25) 0%, rgba(246, 1, 157, 0.08) 100%)"
        : "transparent",
      border: "none",
      borderBottom: isActive
        ? "3px solid var(--color-primary)"
        : "3px solid transparent",
      borderRadius: "var(--radius-md) var(--radius-md) 0 0",
      cursor: "pointer",
      transition: "all var(--transition-base)",
      position: "relative" as const,
      textShadow: isActive
        ? "0 0 10px rgba(246, 1, 157, 0.8), 0 0 20px rgba(246, 1, 157, 0.4)"
        : "none",
      transform: isActive ? "translateY(-1px)" : "translateY(0)",
      boxShadow: isActive
        ? "0 2px 12px rgba(246, 1, 157, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
        : "none",
    };
  };

  const tabListStyle = {
    display: "flex",
    gap: "var(--space-2)",
    borderBottom: "1px solid var(--color-border)",
    marginBottom: "var(--space-8)",
  };

  return (
    <main>
      <Container size="xl" py="xl">
        <header style={{ marginBottom: "var(--space-8)" }}>
          <h1
            style={{
              color: "var(--color-text)",
              fontSize: "var(--text-3xl)",
              marginBottom: "var(--space-1)",
            }}
          >
            Learn German
          </h1>
          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: "var(--text-md)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Practice by typing your answers. Get 3 correct in a row to master a word — miss one and it comes back until you get it right.
          </p>
        </header>

        <div>
          <div style={tabListStyle}>
            <button
              style={getTabStyle("vocabulary")}
              onClick={() => setActiveTab("vocabulary")}
              onMouseEnter={(e) => {
                if (activeTab !== "vocabulary") {
                  e.currentTarget.style.background = "rgba(246, 1, 157, 0.08)";
                  e.currentTarget.style.color = "var(--color-text)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== "vocabulary") {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--color-text-muted)";
                }
              }}
            >
              Vocabulary
            </button>
            <button
              style={getTabStyle("grammar")}
              onClick={() => setActiveTab("grammar")}
              onMouseEnter={(e) => {
                if (activeTab !== "grammar") {
                  e.currentTarget.style.background = "rgba(246, 1, 157, 0.08)";
                  e.currentTarget.style.color = "var(--color-text)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== "grammar") {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--color-text-muted)";
                }
              }}
            >
              Grammar
            </button>
          </div>

          {activeTab === "vocabulary" && (
            <Stack gap={56}>
              {decksByCategory.map(({ category, title, description, decks: categoryDecks }, categoryIndex) => (
                <section key={category}>
                  <header
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-3)",
                      marginBottom: "var(--space-3)",
                      padding: "var(--space-3) var(--space-4)",
                      background: `linear-gradient(90deg, ${categoryColors[category]}15 0%, transparent 70%)`,
                      borderRadius: "var(--radius-md)",
                      borderLeft: `4px solid ${categoryColors[category]}`,
                    }}
                  >
                    <h2
                      style={{
                        color: "var(--color-text)",
                        fontSize: "var(--text-2xl)",
                        fontWeight: 700,
                        margin: 0,
                        textShadow: `0 0 30px ${categoryColors[category]}40`,
                      }}
                    >
                      {title}
                    </h2>
                  </header>
                  <p
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "var(--text-md)",
                      marginLeft: "var(--space-4)",
                      marginBottom: "var(--space-6)",
                      marginTop: 0,
                    }}
                  >
                    {description}
                  </p>

                  <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, lg: 4 }} spacing="lg">
                    {categoryDecks.map((deck, deckIndex) => {
                      const progress = deckProgress.get(deck.id);
                      const completed = progress?.completed ?? 0;
                      const total = progress?.total ?? deck.words.length * 2;
                      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                      const isComplete = completed === total && total > 0;
                      const circles = circleCountsMap.get(deck.id) ?? 0;
                      // Stagger animation delay based on position
                      const animationDelay = `${categoryIndex * 100 + deckIndex * 50}ms`;

                      return (
                        <DeckCard
                          key={deck.id}
                          title={deck.name}
                          subtitle={`${deck.words.length} words`}
                          progress={percent}
                          accentColor={categoryColors[category]}
                          isComplete={isComplete}
                          circleCount={circles}
                          onClick={() => onSelectDeck(deck)}
                          style={{
                            opacity: 0,
                            animation: `fadeIn 0.4s ease-out ${animationDelay} forwards`,
                          }}
                        />
                      );
                    })}
                  </SimpleGrid>
                </section>
              ))}
            </Stack>
          )}

          {activeTab === "grammar" && (
            <section>
              <header
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  marginBottom: "var(--space-3)",
                  padding: "var(--space-3) var(--space-4)",
                  background: "linear-gradient(90deg, rgba(249, 197, 78, 0.1) 0%, transparent 70%)",
                  borderRadius: "var(--radius-md)",
                  borderLeft: "4px solid var(--color-neon-yellow)",
                }}
              >
                <h2
                  style={{
                    color: "var(--color-text)",
                    fontSize: "var(--text-2xl)",
                    fontWeight: 700,
                    margin: 0,
                    textShadow: "0 0 30px rgba(249, 197, 78, 0.4)",
                  }}
                >
                  Grammar Lessons
                </h2>
              </header>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "var(--text-md)",
                  marginLeft: "var(--space-4)",
                  marginBottom: "var(--space-6)",
                  marginTop: 0,
                }}
              >
                Practice verb conjugations and sentence structure
              </p>

              <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, lg: 4 }} spacing="lg">
                {grammarLessons.map((lesson, lessonIndex) => {
                  const progress = lessonProgress.get(lesson.id);
                  const completed = progress?.completed ?? 0;
                  const total = progress?.total ?? lesson.exercises.length;
                  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                  const isComplete = completed === total && total > 0;
                  const circles = circleCountsMap.get(lesson.id) ?? 0;
                  const accentColor = "#f9c54e";
                  const animationDelay = `${lessonIndex * 50}ms`;

                  return (
                    <DeckCard
                      key={lesson.id}
                      title={lesson.name}
                      subtitle={`${lesson.exercises.length} exercises`}
                      progress={percent}
                      accentColor={accentColor}
                      isComplete={isComplete}
                      circleCount={circles}
                      onClick={() => onSelectLesson(lesson)}
                      style={{
                        opacity: 0,
                        animation: `fadeIn 0.4s ease-out ${animationDelay} forwards`,
                      }}
                    />
                  );
                })}
              </SimpleGrid>
            </section>
          )}
        </div>
      </Container>
    </main>
  );
}
