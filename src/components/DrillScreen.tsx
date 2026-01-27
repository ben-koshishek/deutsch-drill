import { useState, useEffect, useRef, useCallback } from "react";
import type { Deck, Word, DrillDirection } from "../types";
import { useDrill } from "../hooks/useDrill";
import { updateLastRun, resetDeckProgress, type UpdateLastRunResult } from "../db";
import { useTimer } from "../hooks/useTimer";
import { normalize } from "@/utils/normalize";
import { MAX_LIVES, AUTO_ADVANCE_DELAY_MS, GAME_OVER_DELAY_MS, MASTERY_THRESHOLD } from "@/constants";
import { TimeCompletionScreen } from "./TimeCompletionScreen";
import { ExampleBox } from "./ui/ExampleBox";
import { WordBadges } from "./ui/WordBadges";
import { StreakDots } from "./ui/StreakDots";
import { DrillInput } from "./ui/DrillInput";
import { ProgressBar } from "./ui/ProgressBar";
import { RunStats } from "./ui/RunStats";
import { ResetConfirmModal } from "./ui/ResetConfirmModal";
import { MeaningsCard } from "./ui/MeaningsCard";
import { GameOverScreen } from "./ui/GameOverScreen";
import { Layout } from "./Layout";
import "./DrillScreen.css";

interface DrillScreenProps {
  deck: Deck;
  onExit: () => void;
}

export interface SessionEndStats {
  totalAnswers: number;
  correctAnswers: number;
  accuracy: number;
  problemWords: { word: Word; direction: DrillDirection; errorCount: number }[];
}

function isAnswerCorrect(userAnswer: string, expectedAnswer: string, word?: Word): boolean {
  const normalizedUser = normalize(userAnswer);
  const alternatives = expectedAnswer.split(" / ").map(normalize);
  if (alternatives.some((alt) => alt === normalizedUser)) {
    return true;
  }
  if (word?.meanings) {
    for (const meaning of word.meanings) {
      if (normalize(meaning.english) === normalizedUser) {
        return true;
      }
    }
  }
  return false;
}

export function DrillScreen({ deck, onExit }: DrillScreenProps) {
  const [drillKey, setDrillKey] = useState(0);
  const { currentTask, submitAnswer, isFinished, completedCount, totalCount } =
    useDrill(deck, drillKey);

  const inputRef = useRef<HTMLInputElement>(null);
  const prevTaskKeyRef = useRef<string | null>(null);

  const taskKey = currentTask
    ? `${currentTask.word.id}_${currentTask.direction}`
    : null;

  const [formState, setFormState] = useState<{
    taskKey: string | null;
    input: string;
    status: "idle" | "wrong" | "correct";
  }>({
    taskKey: null,
    input: "",
    status: "idle",
  });

  const [promptKey, setPromptKey] = useState(0);
  const [shouldAutoAdvance, setShouldAutoAdvance] = useState(false);

  const timer = useTimer();
  const [timerStarted, setTimerStarted] = useState(false);
  const [mistakeCount, setMistakeCount] = useState(0);

  const [showCompletion, setShowCompletion] = useState(false);
  const [completionResult, setCompletionResult] = useState<UpdateLastRunResult | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);

  const input = formState.taskKey === taskKey ? formState.input : "";
  const status = formState.taskKey === taskKey ? formState.status : "idle";

  useEffect(() => {
    if (currentTask && prevTaskKeyRef.current !== taskKey) {
      prevTaskKeyRef.current = taskKey;
      setPromptKey((k) => k + 1);
      setShowNotes(false);
      inputRef.current?.focus();
    }
  }, [currentTask, taskKey]);

  useEffect(() => {
    if (isFinished && !showCompletion && timerStarted) {
      const finalTime = timer.stop();
      updateLastRun(deck.id, finalTime, mistakeCount).then((result) => {
        setCompletionResult(result);
        setShowCompletion(true);
      });
    }
  }, [isFinished, showCompletion, deck.id, timerStarted, timer, mistakeCount]);

  const handleTryAgain = useCallback(async () => {
    await resetDeckProgress(deck.id);
    setShowCompletion(false);
    setShowGameOver(false);
    setCompletionResult(null);
    setTimerStarted(false);
    setMistakeCount(0);
    timer.reset();
    prevTaskKeyRef.current = null;
    setFormState({ taskKey: null, input: "", status: "idle" });
    setDrillKey((k) => k + 1);
  }, [deck.id, timer]);

  const handleReset = useCallback(async () => {
    await resetDeckProgress(deck.id);
    setShowResetModal(false);
    setTimerStarted(false);
    setMistakeCount(0);
    timer.reset();
    prevTaskKeyRef.current = null;
    setFormState({ taskKey: null, input: "", status: "idle" });
    setDrillKey((k) => k + 1);
  }, [deck.id, timer]);

  useEffect(() => {
    if (isFinished && !timerStarted && !showCompletion) {
      handleTryAgain();
    }
  }, [isFinished, timerStarted, showCompletion, handleTryAgain]);

  useEffect(() => {
    if (shouldAutoAdvance) {
      const t = setTimeout(() => {
        submitAnswer(true);
        setShouldAutoAdvance(false);
        setFormState({ taskKey: null, input: "", status: "idle" });
      }, AUTO_ADVANCE_DELAY_MS);
      return () => clearTimeout(t);
    }
  }, [shouldAutoAdvance, submitAnswer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Esc to blur input (only when modal not showing)
      if (e.key === "Escape" && !showResetModal) {
        inputRef.current?.blur();
        return;
      }

      // Cmd+Left arrow to go back
      if (e.key === "ArrowLeft" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onExit();
        return;
      }

      // R key to reset (when not typing in input)
      if (e.key === "r" || e.key === "R") {
        const isInputFocused = document.activeElement === inputRef.current;
        if (!isInputFocused && !e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          setShowResetModal(true);
        }
        return;
      }

      if (e.key === " " && status !== "idle") {
        e.preventDefault();
        if (status === "wrong") {
          setFormState({ taskKey: null, input: "", status: "idle" });
          submitAnswer(false);
        } else if (status === "correct") {
          submitAnswer(true);
          setFormState({ taskKey: null, input: "", status: "idle" });
        }
      } else if (e.key === "Backspace") {
        const inp = inputRef.current;
        const inputEmpty = !inp || inp.value === "";
        if (inputEmpty || status !== "idle") {
          e.preventDefault();
          onExit();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, submitAnswer, onExit, showResetModal]);

  if (showGameOver) {
    return (
      <Layout
        headerLeft={<button className="drill__back-btn" onClick={onExit}>Back</button>}
        headerCenter={<span className="drill__title">{deck.name}</span>}
        headerRight={null}
      >
        <GameOverScreen onTryAgain={handleTryAgain} onExit={onExit} />
      </Layout>
    );
  }

  if (showCompletion && completionResult) {
    return (
      <TimeCompletionScreen
        finalTimeMs={completionResult.currentTime}
        isPerfect={completionResult.isPerfect}
        previousTimeMs={completionResult.previousTime}
        mistakeCount={completionResult.currentMistakes}
        previousMistakes={completionResult.previousMistakes}
        itemName={deck.name}
        onTryAgain={handleTryAgain}
        onExit={onExit}
      />
    );
  }

  if (!currentTask) {
    return (
      <Layout
        headerLeft={<button className="drill__back-btn" onClick={onExit}>Back</button>}
        headerCenter={<span className="drill__title">{deck.name}</span>}
        headerRight={<span className="drill__counter">Loading...</span>}
      >
        <div className="drill__loading">Loading...</div>
      </Layout>
    );
  }

  const { word, direction } = currentTask;
  const prompt = direction === "de_to_en"
    ? word.german
    : word.english.split(" / ")[0];
  const expectedAnswer = direction === "de_to_en" ? word.english : word.german;
  const progress = Math.round((completedCount / totalCount) * 100);

  const handleInputChange = (value: string) => {
    setFormState({ taskKey, input: value, status });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "wrong") {
      setFormState({ taskKey: null, input: "", status: "idle" });
      submitAnswer(false);
      return;
    }

    if (status === "correct") {
      submitAnswer(true);
      setFormState({ taskKey: null, input: "", status: "idle" });
      return;
    }

    if (!timerStarted) {
      timer.start();
      setTimerStarted(true);
    }

    const correct = isAnswerCorrect(input, expectedAnswer, word);
    setFormState({
      taskKey,
      input,
      status: correct ? "correct" : "wrong",
    });

    if (correct) {
      setShouldAutoAdvance(true);
    } else {
      const newMistakeCount = mistakeCount + 1;
      setMistakeCount(newMistakeCount);
      if (newMistakeCount >= MAX_LIVES) {
        // Delay to show the final wrong answer before game over
        setTimeout(() => setShowGameOver(true), GAME_OVER_DELAY_MS);
      }
    }
  };

  const displayValue =
    status === "idle" ? input : status === "correct" ? input : expectedAnswer;

  return (
    <Layout
      headerLeft={
        <div className="drill__header-left">
          <button className="drill__back-btn" onClick={onExit}>Back</button>
          <RunStats elapsedMs={timer.elapsedMs} mistakes={mistakeCount} />
        </div>
      }
      headerCenter={
        <span className="drill__title">{deck.name}</span>
      }
      headerRight={
        <div className="drill__header-right">
          <button
            className="drill__reset-btn"
            onClick={() => setShowResetModal(true)}
            title="Reset progress"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
          <span className="drill__counter">{completedCount} / {totalCount}</span>
        </div>
      }
    >
      {showResetModal && (
        <ResetConfirmModal
          deckName={deck.name}
          onConfirm={handleReset}
          onCancel={() => setShowResetModal(false)}
        />
      )}

      <div className="drill__content">
        <ProgressBar value={progress} size="sm" color="primary" />

        <form onSubmit={handleSubmit} className="drill__form">
          {/* Top section - prompt and example */}
          <div className="drill__prompt-section">
            <div key={promptKey} className="drill__prompt-container">
              <h2 className="drill__prompt">{prompt}</h2>
              <WordBadges word={word} size="md" />
            </div>

            {(() => {
              const exampleText = direction === "de_to_en"
                ? word.examples?.[0]?.german
                : word.examples?.[0]?.english;

              if (!exampleText) return null;

              return (
                <div key={`example-${promptKey}`} className="drill__example">
                  <ExampleBox size="lg">{exampleText}</ExampleBox>
                </div>
              );
            })()}

            {word.meanings && word.meanings.length > 0 && (showNotes || status !== "idle") && (
              <MeaningsCard
                meanings={word.meanings}
                onHide={status === "idle" ? () => setShowNotes(false) : undefined}
              />
            )}

            {word.notes && (!word.meanings || word.meanings.length === 0) && (showNotes || status !== "idle") && (
              <div className="drill__notes">
                <div className="drill__notes-content">
                  {word.notes}
                  {status === "idle" && (
                    <button type="button" onClick={() => setShowNotes(false)} className="drill__notes-hide">
                      Hide
                    </button>
                  )}
                </div>
              </div>
            )}

            {status === "idle" && !showNotes && (word.meanings?.length || word.notes) && (
              <div className="drill__hint-btn-container">
                <button type="button" onClick={() => setShowNotes(true)} className="drill__hint-btn">
                  Show hint
                </button>
              </div>
            )}
          </div>

          {/* Bottom section - input and feedback */}
          <div className="drill__input-section">
            <div className="drill__input-container">
              <DrillInput
                ref={inputRef}
                value={displayValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Type your answer"
                status={status}
                size="lg"
                readOnly={status !== "idle"}
              />
            </div>

            <div className="drill__feedback-row">
              {(() => {
                const baseStreak = currentTask.streak;
                const displayStreak = status === "correct"
                  ? Math.min(baseStreak + 1, MASTERY_THRESHOLD)
                  : status === "wrong" ? 0 : baseStreak;
                return <StreakDots current={displayStreak} size="lg" showLabel />;
              })()}

              <span className={`drill__feedback drill__feedback--${status}`}>
                {status === "idle" && "Press Enter"}
                {status === "wrong" && "Incorrect — streak reset"}
                {status === "correct" && (() => {
                  const newStreak = currentTask.streak + 1;
                  if (newStreak >= MASTERY_THRESHOLD) return "MASTERED!";
                  return `Correct! ${MASTERY_THRESHOLD - newStreak} more to master`;
                })()}
              </span>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
