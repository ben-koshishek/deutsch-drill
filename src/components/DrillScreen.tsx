import { useState, useEffect, useRef } from "react";
import type { Deck, Word, DrillDirection } from "../types";
import { useDrill } from "../hooks/useDrill";
import { ExampleBox } from "./ui/ExampleBox";
import { HistoryDots } from "./ui/HistoryDots";
import { DrillInput } from "./ui/DrillInput";
import { ProgressBar } from "./ui/ProgressBar";
import { FeedbackText } from "./ui/FeedbackText";

interface DrillScreenProps {
  deck: Deck;
  onExit: () => void;
  onComplete: () => void;
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

export function DrillScreen({ deck, onExit, onComplete }: DrillScreenProps) {
  const { currentTask, submitAnswer, isFinished, completedCount, totalCount } =
    useDrill(deck);

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

  // Track rolling answer history across all words (for HistoryDots)
  const [answerHistory, setAnswerHistory] = useState<(boolean | null)[]>([]);

  // Track prompt key for animation reset
  const [promptKey, setPromptKey] = useState(0);

  const input = formState.taskKey === taskKey ? formState.input : "";
  const status = formState.taskKey === taskKey ? formState.status : "idle";

  useEffect(() => {
    if (currentTask && prevTaskKeyRef.current !== taskKey) {
      prevTaskKeyRef.current = taskKey;
      setPromptKey((k) => k + 1); // Trigger new animation
      inputRef.current?.focus();
    }
  }, [currentTask, taskKey]);

  useEffect(() => {
    if (isFinished) {
      onComplete();
    }
  }, [isFinished, onComplete]);

  // Keyboard shortcut: Space to continue after answer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " && status !== "idle") {
        e.preventDefault();
        if (status === "wrong") {
          submitAnswer(false);
        } else if (status === "correct") {
          submitAnswer(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, submitAnswer]);

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
    // Track answer in history
    setAnswerHistory((prev) => [...prev, correct]);
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
            <h2
              key={promptKey}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(var(--text-3xl), 8vw, var(--text-4xl))",
                fontWeight: 800,
                color: "var(--color-prompt)",
                lineHeight: 1.3,
                margin: 0,
                marginBlockEnd: "var(--space-10)",
                textAlign: "center",
                textShadow: `
                  0 0 20px var(--color-primary-glow),
                  0 0 40px rgba(246, 1, 157, 0.3),
                  0 0 60px rgba(246, 1, 157, 0.15)
                `,
                animation: "promptEnter 0.5s ease-out",
              }}
            >
              {prompt}
            </h2>

            {/* Example - show German for de_to_en, English translation for en_to_de */}
            <div
              key={`example-${promptKey}`}
              style={{
                minHeight: "4rem",
                textAlign: "center",
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

            {/* Feedback row - dots left, feedback text right */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* History dots */}
              <HistoryDots history={answerHistory} />

              {/* Feedback message */}
              <FeedbackText status={status} size="md" />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
