import { useEffect, useState } from "react";
import {
  Container,
  SimpleGrid,
  Tabs,
  Stack,
} from "@mantine/core";
import { decks } from "../data/decks";
import { grammarLessons } from "../data/grammar";
import { getDeckProgress } from "../db";
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

  useEffect(() => {
    async function loadProgress() {
      const deckData = new Map<string, { completed: number; total: number }>();
      for (const deck of decks) {
        const progress = await getDeckProgress(deck.id);
        const total = deck.words.length * 2;
        let completed = 0;
        for (const streak of progress.values()) {
          if (streak >= MASTERY_THRESHOLD) completed++;
        }
        deckData.set(deck.id, { completed, total });
      }
      setDeckProgress(deckData);

      const lessonData = new Map<string, { completed: number; total: number }>();
      for (const lesson of grammarLessons) {
        const progress = await getDeckProgress(lesson.id);
        const total = lesson.exercises.length;
        let completed = 0;
        for (const streak of progress.values()) {
          if (streak >= MASTERY_THRESHOLD) completed++;
        }
        lessonData.set(lesson.id, { completed, total });
      }
      setLessonProgress(lessonData);
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

  const tabStyles = {
    tab: {
      fontSize: "var(--text-lg)",
      fontWeight: 600,
      padding: "var(--space-3) var(--space-6)",
      color: "var(--color-text-muted)",
      borderBottom: "3px solid transparent",
      transition: "all var(--transition-base)",
      "&[data-active]": {
        color: "var(--color-primary)",
        borderBottomColor: "var(--color-primary)",
        background: "var(--color-primary-glow)",
      },
      "&:hover": {
        background: "rgba(246, 1, 157, 0.05)",
      },
    },
    list: {
      borderBottom: "1px solid var(--color-border)",
      gap: "var(--space-2)",
    },
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
              fontSize: "var(--text-lg)",
              margin: 0,
            }}
          >
            Master each item by getting 3 correct answers in a row.
          </p>
        </header>

        <Tabs defaultValue="vocabulary" styles={tabStyles}>
          <Tabs.List mb="xl">
            <Tabs.Tab value="vocabulary">Vocabulary</Tabs.Tab>
            <Tabs.Tab value="grammar">Grammar</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="vocabulary">
            <Stack gap={56}>
              {decksByCategory.map(({ category, title, description, decks: categoryDecks }, categoryIndex) => (
                <section key={category}>
                  <header
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-3)",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: "var(--space-8)",
                        background: categoryColors[category],
                        borderRadius: 2,
                        boxShadow: `0 0 8px ${categoryColors[category]}66`,
                      }}
                    />
                    <h2
                      style={{
                        color: "var(--color-text)",
                        fontSize: "var(--text-2xl)",
                        fontWeight: 700,
                        margin: 0,
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
          </Tabs.Panel>

          <Tabs.Panel value="grammar">
            <section>
              <header
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: "var(--space-8)",
                    background: "var(--color-neon-yellow)",
                    borderRadius: 2,
                    boxShadow: "0 0 8px rgba(249, 197, 78, 0.4)",
                  }}
                />
                <h2
                  style={{
                    color: "var(--color-text)",
                    fontSize: "var(--text-2xl)",
                    fontWeight: 700,
                    margin: 0,
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
          </Tabs.Panel>
        </Tabs>
      </Container>
    </main>
  );
}
