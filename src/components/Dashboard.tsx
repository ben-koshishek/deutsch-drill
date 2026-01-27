import { useEffect, useState, useMemo } from "react";
import { decks } from "../data/decks";
import { grammarLessons } from "../data/grammar";
import { getBatchDeckStats, type LastRunRecord } from "../db";
import type { Deck, GrammarLesson } from "../types";
import { DeckCard } from "./ui/DeckCard";
import "./Dashboard.css";

interface DashboardProps {
  onSelectDeck: (deck: Deck) => void;
  onSelectLesson: (lesson: GrammarLesson) => void;
  activeTab: "vocabulary" | "grammar";
  onStatsChange?: (stats: { practiced: string; mastered: string; wordsLearned: string }) => void;
}

const MASTERY_THRESHOLD = 3;

export function Dashboard({ onSelectDeck, onSelectLesson, activeTab, onStatsChange }: DashboardProps) {
  const [deckProgress, setDeckProgress] = useState<
    Map<string, { completed: number; total: number; wordsLearned: number }>
  >(new Map());
  const [lessonProgress, setLessonProgress] = useState<
    Map<string, { completed: number; total: number }>
  >(new Map());
  const [lastRunsMap, setLastRunsMap] = useState<Map<string, LastRunRecord | null>>(new Map());

  useEffect(() => {
    async function loadProgress() {
      const allIds = [
        ...decks.map(d => d.id),
        ...grammarLessons.map(l => l.id)
      ];

      const { progress: progressData, lastRuns: runsData } = await getBatchDeckStats(allIds);

      const deckData = new Map<string, { completed: number; total: number; wordsLearned: number }>();
      for (const deck of decks) {
        const progress = progressData.get(deck.id) ?? new Map();
        const total = deck.words.length * 2;
        let completed = 0;
        for (const streak of progress.values()) {
          if (streak >= MASTERY_THRESHOLD) completed++;
        }
        // Count words learned (both directions mastered)
        let wordsLearned = 0;
        for (const word of deck.words) {
          const deToEn = progress.get(`${word.id}_de_to_en`) ?? 0;
          const enToDe = progress.get(`${word.id}_en_to_de`) ?? 0;
          if (deToEn >= MASTERY_THRESHOLD && enToDe >= MASTERY_THRESHOLD) {
            wordsLearned++;
          }
        }
        deckData.set(deck.id, { completed, total, wordsLearned });
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
      setLastRunsMap(runsData);
    }
    loadProgress();
  }, []);

  const overallStats = useMemo(() => {
    let totalDecks = 0;
    let practicedDecks = 0;
    let totalWords = 0;
    let masteredWords = 0;
    let wordsLearned = 0;

    for (const deck of decks) {
      totalDecks++;
      const progress = deckProgress.get(deck.id);
      const lastRunRecord = lastRunsMap.get(deck.id);

      if (lastRunRecord !== null && lastRunRecord !== undefined) {
        practicedDecks++;
      }

      if (progress) {
        masteredWords += progress.completed;
        totalWords += progress.total;
        wordsLearned += progress.wordsLearned;
      } else {
        totalWords += deck.words.length * 2;
      }
    }

    return { totalDecks, practicedDecks, totalWords, masteredWords, wordsLearned };
  }, [deckProgress, lastRunsMap]);

  const masteredPercent = overallStats.totalWords > 0
    ? Math.round((overallStats.masteredWords / overallStats.totalWords) * 100)
    : 0;

  useEffect(() => {
    onStatsChange?.({
      practiced: `${overallStats.practicedDecks}/${overallStats.totalDecks}`,
      mastered: `${masteredPercent}%`,
      wordsLearned: `${overallStats.wordsLearned}`,
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
            const lastRunRecord = lastRunsMap.get(deck.id) ?? null;
            const animationDelay = `${deckIndex * 50}ms`;

            return (
              <DeckCard
                key={deck.id}
                title={deck.name}
                subtitle={`${deck.words.length} words`}
                progress={percent}
                accentColor="#f6019d"
                isComplete={isComplete}
                lastRunTimeMs={lastRunRecord?.timeMs ?? null}
                lastRunMistakes={lastRunRecord ? (lastRunRecord.mistakes ?? 0) : null}
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
            const lastRunRecord = lastRunsMap.get(lesson.id) ?? null;
            const animationDelay = `${lessonIndex * 50}ms`;

            return (
              <DeckCard
                key={lesson.id}
                title={lesson.name}
                subtitle={`${lesson.exercises.length} exercises`}
                progress={percent}
                accentColor="#f9c54e"
                isComplete={isComplete}
                lastRunTimeMs={lastRunRecord?.timeMs ?? null}
                lastRunMistakes={lastRunRecord ? (lastRunRecord.mistakes ?? 0) : null}
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
