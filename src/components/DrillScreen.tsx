import { useState, useEffect, useRef, useCallback } from "react";
import type { Deck, Word, DrillDirection } from "../types";
import { useDrill } from "../hooks/useDrill";
import { getCircleCount, incrementCircle, resetDeckProgress } from "../db";
import { CircleCompletionScreen } from "./CircleCompletionScreen";
import { ExampleBox } from "./ui/ExampleBox";
import { GrammarBadges } from "./ui/GrammarBadges";
import { StreakDots } from "./ui/StreakDots";
import { DrillInput } from "./ui/DrillInput";
import { ProgressBar } from "./ui/ProgressBar";
import { CircleBadge } from "./ui/CircleBadge";
import { ResetConfirmModal } from "./ui/ResetConfirmModal";

interface DrillScreenProps {
  deck: Deck;
  onExit: () => void;
  onComplete?: () => void; // Optional - completion handled internally now
}

export interface SessionEndStats {
  totalAnswers: number;
  correctAnswers: number;
  accuracy: number;
  problemWords: { word: Word; direction: DrillDirection; errorCount: number }[];
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/[.,!?;:'"]/g, "")
    .trim();
}

function isAnswerCorrect(userAnswer: string, expectedAnswer: string): boolean {
  const normalizedUser = normalize(userAnswer);
  const alternatives = expectedAnswer.split(" / ").map(normalize);
  return alternatives.some((alt) => alt === normalizedUser);
}

export function DrillScreen({ deck, onExit }: DrillScreenProps) {
  const [drillKey, setDrillKey] = useState(0); // Key to force re-mount useDrill
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

  // Track prompt key for animation reset
  const [promptKey, setPromptKey] = useState(0);

  // Auto-advance flag for correct answers
  const [shouldAutoAdvance, setShouldAutoAdvance] = useState(false);

  // Circle tracking
  const [circleCount, setCircleCount] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [completedCircle, setCompletedCircle] = useState(0);

  // Reset modal
  const [showResetModal, setShowResetModal] = useState(false);

  // Load circle count on mount
  useEffect(() => {
    getCircleCount(deck.id).then(setCircleCount);
  }, [deck.id]);

  const input = formState.taskKey === taskKey ? formState.input : "";
  const status = formState.taskKey === taskKey ? formState.status : "idle";

  useEffect(() => {
    if (currentTask && prevTaskKeyRef.current !== taskKey) {
      prevTaskKeyRef.current = taskKey;
      setPromptKey((k) => k + 1); // Trigger new animation
      inputRef.current?.focus();
    }
  }, [currentTask, taskKey]);

  // Handle circle completion
  useEffect(() => {
    if (isFinished && !showCompletion) {
      // Increment circle and show completion screen
      incrementCircle(deck.id).then((newCount) => {
        setCompletedCircle(newCount);
        setCircleCount(newCount);
        setShowCompletion(true);
      });
    }
  }, [isFinished, showCompletion, deck.id]);

  // Start next circle
  const handleContinue = useCallback(async () => {
    // Reset progress to start fresh
    await resetDeckProgress(deck.id);
    setShowCompletion(false);
    prevTaskKeyRef.current = null;
    setFormState({ taskKey: null, input: "", status: "idle" });
    // Force re-mount of useDrill by changing key
    setDrillKey((k) => k + 1);
  }, [deck.id]);

  // Reset current circle progress (keeps circle count)
  const handleReset = useCallback(async () => {
    await resetDeckProgress(deck.id);
    setShowResetModal(false);
    prevTaskKeyRef.current = null;
    setFormState({ taskKey: null, input: "", status: "idle" });
    setDrillKey((k) => k + 1);
  }, [deck.id]);

  // Auto-advance after brief delay on correct answers
  useEffect(() => {
    if (shouldAutoAdvance) {
      const timer = setTimeout(() => {
        submitAnswer(true);
        setShouldAutoAdvance(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [shouldAutoAdvance, submitAnswer]);

  // Keyboard shortcuts: Space to continue, Backspace to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " && status !== "idle") {
        e.preventDefault();
        if (status === "wrong") {
          submitAnswer(false);
        } else if (status === "correct") {
          submitAnswer(true);
        }
      } else if (e.key === "Backspace") {
        // Go back if input is empty or answer is shown
        const input = inputRef.current;
        const inputEmpty = !input || input.value === "";
        if (inputEmpty || status !== "idle") {
          e.preventDefault();
          onExit();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, submitAnswer, onExit]);

  // Show completion screen
  if (showCompletion) {
    return (
      <CircleCompletionScreen
        circleNumber={completedCircle}
        deckName={deck.name}
        onContinue={handleContinue}
        onExit={onExit}
      />
    );
  }

  if (!currentTask) {
    return null;
  }

  const { word, direction } = currentTask;
  const prompt = direction === "de_to_en" ? word.german : word.english;
  const expectedAnswer = direction === "de_to_en" ? word.english : word.german;
  const progress = Math.round((completedCount / totalCount) * 100);

  const handleInputChange = (value: string) => {
    setFormState({ taskKey, input: value, status });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "wrong") {
      submitAnswer(false);
      return;
    }

    if (status === "correct") {
      submitAnswer(true);
      return;
    }

    const correct = isAnswerCorrect(input, expectedAnswer);
    setFormState({
      taskKey,
      input,
      status: correct ? "correct" : "wrong",
    });

    if (correct) {
      // Trigger auto-advance after brief delay
      setShouldAutoAdvance(true);
    }
  };

  const displayValue =
    status === "idle" ? input : status === "correct" ? input : expectedAnswer;

  return (
    <main
      style={{
        position: "fixed",
        top: 70,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        background: "var(--color-bg)",
        overflow: "hidden",
        zIndex: 40,
      }}
    >
      {/* Atmospheric background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 50% at 50% 20%, var(--color-atmosphere-pink) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 70% 80%, var(--color-atmosphere-cyan) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 20% 60%, var(--color-atmosphere-purple) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Reset confirmation modal */}
      {showResetModal && (
        <ResetConfirmModal
          deckName={deck.name}
          onConfirm={handleReset}
          onCancel={() => setShowResetModal(false)}
        />
      )}

      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "var(--space-4) var(--space-6)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <button
            onClick={onExit}
            style={{
              color: "var(--color-text-muted)",
              fontSize: "var(--text-md)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "var(--space-2) var(--space-3)",
              fontFamily: "inherit",
              borderRadius: "var(--radius-md)",
              transition: "all var(--transition-base)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-bg-secondary)";
              e.currentTarget.style.color = "var(--color-text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = "var(--color-text-muted)";
            }}
          >
            ← Back
          </button>
          {/* Circle badge */}
          <CircleBadge circle={circleCount + 1} size="sm" />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          {/* Reset button */}
          <button
            onClick={() => setShowResetModal(true)}
            title="Reset progress"
            style={{
              color: "var(--color-text-subtle)",
              fontSize: "var(--text-sm)",
              background: "none",
              border: "1px solid transparent",
              cursor: "pointer",
              padding: "var(--space-2)",
              fontFamily: "inherit",
              borderRadius: "var(--radius-md)",
              transition: "all var(--transition-base)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 77, 109, 0.1)";
              e.currentTarget.style.borderColor = "rgba(255, 77, 109, 0.3)";
              e.currentTarget.style.color = "var(--color-error)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.color = "var(--color-text-subtle)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
          <span
            style={{
              color: "var(--color-text-muted)",
              fontSize: "var(--text-md)",
              fontWeight: 600,
              padding: "var(--space-2) var(--space-4)",
              background: "var(--color-bg-secondary)",
              borderRadius: "var(--radius-md)",
            }}
          >
            {completedCount} / {totalCount}
          </span>
        </div>
      </header>

      {/* Progress */}
      <ProgressBar value={progress} size="sm" color="primary" />

      {/* Main content - spread vertically */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "0 var(--space-8)",
          maxWidth: "56rem",
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top section - prompt and example */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {/* The word - pink color with glow and entrance animation */}
            <div
              key={promptKey}
              style={{
                textAlign: "center",
                marginBlockEnd: "var(--space-10)",
                animation: "promptEnter 0.5s ease-out",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-3xl), 8vw, var(--text-4xl))",
                  fontWeight: 800,
                  color: "var(--color-prompt)",
                  lineHeight: 1.3,
                  margin: 0,
                  textShadow: `
                    0 0 20px var(--color-primary-glow),
                    0 0 40px rgba(246, 1, 157, 0.3),
                    0 0 60px rgba(246, 1, 157, 0.15)
                  `,
                }}
              >
                {prompt}
              </h2>
              {/* Grammar badges - show contextual hints */}
              {word.meta && <GrammarBadges meta={word.meta} size="md" />}
            </div>

            {/* Example - show German for de_to_en, English translation for en_to_de */}
            <div
              key={`example-${promptKey}`}
              style={{
                minHeight: "4rem",
                textAlign: "center",
                marginTop: "var(--space-8)",
              }}
            >
              {direction === "de_to_en" && word.example && (
                <ExampleBox>{word.example}</ExampleBox>
              )}
              {direction === "en_to_de" && word.exampleTranslation && (
                <ExampleBox>{word.exampleTranslation}</ExampleBox>
              )}
            </div>
          </div>

          {/* Bottom section - input and feedback */}
          <div style={{ paddingBottom: "10vh" }}>
            {/* Input */}
            <div style={{ marginBottom: "var(--space-8)" }}>
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

            {/* Feedback row - streak dots and feedback text */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Streak dots - show updated streak based on current answer */}
              {(() => {
                const baseStreak = currentTask.streak;
                const displayStreak = status === "correct"
                  ? Math.min(baseStreak + 1, 3)
                  : status === "wrong"
                    ? 0
                    : baseStreak;
                return <StreakDots current={displayStreak} size="lg" showLabel />;
              })()}

              {/* Feedback message - streak aware */}
              <span
                style={{
                  fontWeight: 500,
                  fontSize: "var(--text-md)",
                  color: status === "correct"
                    ? "var(--color-success)"
                    : status === "wrong"
                      ? "var(--color-error)"
                      : "var(--color-text-muted)",
                }}
              >
                {status === "idle" && "Press Enter"}
                {status === "wrong" && "Incorrect — streak reset"}
                {status === "correct" && (() => {
                  const newStreak = currentTask.streak + 1;
                  if (newStreak >= 3) return "MASTERED!";
                  const remaining = 3 - newStreak;
                  return `Correct! ${remaining} more to master`;
                })()}
              </span>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
