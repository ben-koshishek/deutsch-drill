import { useEffect, useState, useMemo } from "react";
import { decks } from "../data/decks";
import { grammarLessons } from "../data/grammar";
import { getBatchDeckStats } from "../db";
import type { Deck, GrammarLesson } from "../types";
import { DeckCard } from "./ui/DeckCard";
import "./Dashboard.css";

interface DashboardProps {
  onSelectDeck: (deck: Deck) => void;
  onSelectLesson: (lesson: GrammarLesson) => void;
  activeTab: "vocabulary" | "grammar";
  onStatsChange?: (stats: { practiced: string; mastered: string }) => void;
}

const MASTERY_THRESHOLD = 3;

export function Dashboard({ onSelectDeck, onSelectLesson, activeTab, onStatsChange }: DashboardProps) {
  const [deckProgress, setDeckProgress] = useState<
    Map<string, { completed: number; total: number }>
  >(new Map());
  const [lessonProgress, setLessonProgress] = useState<
    Map<string, { completed: number; total: number }>
  >(new Map());
  const [bestTimesMap, setBestTimesMap] = useState<Map<string, number | null>>(new Map());

  useEffect(() => {
    async function loadProgress() {
      const allIds = [
        ...decks.map(d => d.id),
        ...grammarLessons.map(l => l.id)
      ];

      const { progress: progressData, bestTimes: timesData } = await getBatchDeckStats(allIds);

      const deckData = new Map<string, { completed: number; total: number }>();
      for (const deck of decks) {
        const progress = progressData.get(deck.id) ?? new Map();
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
        const progress = progressData.get(lesson.id) ?? new Map();
        const total = lesson.exercises.length;
        let completed = 0;
        for (const streak of progress.values()) {
          if (streak >= MASTERY_THRESHOLD) completed++;
        }
        lessonData.set(lesson.id, { completed, total });
      }
      setLessonProgress(lessonData);
      setBestTimesMap(timesData);
    }
    loadProgress();
  }, []);

  const overallStats = useMemo(() => {
    let totalDecks = 0;
    let practicedDecks = 0;
    let totalWords = 0;
    let masteredWords = 0;

    for (const deck of decks) {
      totalDecks++;
      const progress = deckProgress.get(deck.id);
      const bestTime = bestTimesMap.get(deck.id);

      if (bestTime !== null && bestTime !== undefined) {
        practicedDecks++;
      }

      if (progress) {
        masteredWords += progress.completed;
        totalWords += progress.total;
      } else {
        totalWords += deck.words.length * 2;
      }
    }

    return { totalDecks, practicedDecks, totalWords, masteredWords };
  }, [deckProgress, bestTimesMap]);

  const masteredPercent = overallStats.totalWords > 0
    ? Math.round((overallStats.masteredWords / overallStats.totalWords) * 100)
    : 0;

  useEffect(() => {
    onStatsChange?.({
      practiced: `${overallStats.practicedDecks}/${overallStats.totalDecks}`,
      mastered: `${masteredPercent}%`,
    });
  }, [overallStats, masteredPercent, onStatsChange]);

  return (
    <>
      {activeTab === "vocabulary" && (
        <div className="dashboard__card-grid">
          {decks.map((deck, deckIndex) => {
            const progress = deckProgress.get(deck.id);
            const completed = progress?.completed ?? 0;
            const total = progress?.total ?? deck.words.length * 2;
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
            const isComplete = completed === total && total > 0;
            const bestTime = bestTimesMap.get(deck.id) ?? null;
            const animationDelay = `${deckIndex * 50}ms`;

            return (
              <DeckCard
                key={deck.id}
                title={deck.name}
                subtitle={`${deck.words.length} words`}
                progress={percent}
                accentColor="#f6019d"
                isComplete={isComplete}
                bestTimeMs={bestTime}
                onClick={() => onSelectDeck(deck)}
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.4s ease-out ${animationDelay} forwards`,
                }}
              />
            );
          })}
        </div>
      )}

      {activeTab === "grammar" && (
        <div className="dashboard__card-grid">
          {grammarLessons.map((lesson, lessonIndex) => {
            const progress = lessonProgress.get(lesson.id);
            const completed = progress?.completed ?? 0;
            const total = progress?.total ?? lesson.exercises.length;
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
            const isComplete = completed === total && total > 0;
            const bestTime = bestTimesMap.get(lesson.id) ?? null;
            const animationDelay = `${lessonIndex * 50}ms`;

            return (
              <DeckCard
                key={lesson.id}
                title={lesson.name}
                subtitle={`${lesson.exercises.length} exercises`}
                progress={percent}
                accentColor="#f9c54e"
                isComplete={isComplete}
                bestTimeMs={bestTime}
                onClick={() => onSelectLesson(lesson)}
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.4s ease-out ${animationDelay} forwards`,
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
