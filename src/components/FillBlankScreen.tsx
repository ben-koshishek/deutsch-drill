import { useState, useEffect, useRef, useCallback } from "react";
import { Collapse, Menu, Table } from "@mantine/core";
import type { GrammarLesson } from "../types";
import { useFillBlank } from "../hooks/useFillBlank";
import { StreakDots } from "./ui/StreakDots";
import { DrillInput } from "./ui/DrillInput";
import { ProgressBar } from "./ui/ProgressBar";

type HintMode = "english" | "german" | "both";
const HINT_MODES: HintMode[] = ["english", "german", "both"];

function getStoredHintMode(): HintMode {
  const stored = localStorage.getItem("grammar-hint-mode");
  if (stored === "english" || stored === "german" || stored === "both") {
    return stored;
  }
  return "english";
}

function getStoredInfoCollapsed(): boolean {
  return localStorage.getItem("grammar-info-collapsed") === "true";
}

interface FillBlankScreenProps {
  lesson: GrammarLesson;
  onExit: () => void;
  onComplete: () => void;
}

function normalize(str: string): string {
  return str.toLowerCase().trim();
}

// Regular verb endings
const REGULAR_ENDINGS = [
  { pronoun: "ich", ending: "-e" },
  { pronoun: "wir", ending: "-en" },
  { pronoun: "du", ending: "-st" },
  { pronoun: "ihr", ending: "-t" },
  { pronoun: "er/sie/es", ending: "-t" },
  { pronoun: "sie/Sie", ending: "-en" },
];

// sein & haben conjugations
const SEIN_HABEN = [
  { pronoun: "ich", sein: "bin", haben: "habe" },
  { pronoun: "wir", sein: "sind", haben: "haben" },
  { pronoun: "du", sein: "bist", haben: "hast" },
  { pronoun: "ihr", sein: "seid", haben: "habt" },
  { pronoun: "er/sie/es", sein: "ist", haben: "hat" },
  { pronoun: "sie/Sie", sein: "sind", haben: "haben" },
];

export function FillBlankScreen({
  lesson,
  onExit,
  onComplete,
}: FillBlankScreenProps) {
  const { currentTask, submitAnswer, isFinished, completedCount, totalCount } =
    useFillBlank(lesson);

  const inputRef = useRef<HTMLInputElement>(null);
  const prevTaskKeyRef = useRef<string | null>(null);
  const [showDescription, setShowDescription] = useState(() => !getStoredInfoCollapsed());
  const [hintMode, setHintMode] = useState<HintMode>(getStoredHintMode);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  const taskKey = currentTask?.exercise.id ?? null;

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

  const input = formState.taskKey === taskKey ? formState.input : "";
  const status = formState.taskKey === taskKey ? formState.status : "idle";

  useEffect(() => {
    if (currentTask && prevTaskKeyRef.current !== taskKey) {
      prevTaskKeyRef.current = taskKey;
      setPromptKey((k) => k + 1);
      inputRef.current?.focus();
    }
  }, [currentTask, taskKey]);

  useEffect(() => {
    if (isFinished) {
      onComplete();
    }
  }, [isFinished, onComplete]);

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

  const cycleHintMode = useCallback(() => {
    const currentIndex = HINT_MODES.indexOf(hintMode);
    const nextIndex = (currentIndex + 1) % HINT_MODES.length;
    const nextMode = HINT_MODES[nextIndex];
    setHintMode(nextMode);
    localStorage.setItem("grammar-hint-mode", nextMode);
  }, [hintMode]);

  // Keyboard shortcuts: "1" to cycle hint mode, Space to submit, Backspace to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // "1" key cycles hint mode
      if (e.key === "1" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        cycleHintMode();
        return;
      }

      // Space key submits when status is not idle (continuing after answer)
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
  }, [cycleHintMode, status, submitAnswer, onExit]);

  if (!currentTask) {
    return null;
  }

  const { exercise } = currentTask;
  const progress = Math.round((completedCount / totalCount) * 100);

  // Try conjugation format: "pronoun ___ [infinitive|english]"
  const conjugationMatch = exercise.sentence.match(/^([a-züöäß]+) ___ \[([^\|]+)\|([^\]]+)\]$/i);

  // Try case format: "sentence words ___ [article|english]"
  const caseMatch = exercise.sentence.match(/^(.+) ___ \[([^\|]+)\|([^\]]+)\]$/i);

  const isConjugation = conjugationMatch !== null;
  const match = conjugationMatch ?? caseMatch;

  const sentencePart = match?.[1] ?? "";
  const germanHint = match?.[2] ?? "";
  const englishHint = match?.[3] ?? "";

  // Extract just the noun from "der Brief" -> "Brief"
  const nounOnly = germanHint.replace(/^(der|die|das|ein|eine)\s+/i, "");

  const displayHint = hintMode === "english"
    ? englishHint
    : hintMode === "german"
      ? germanHint
      : `${germanHint} (${englishHint})`;

  const toggleDescription = () => {
    const newValue = !showDescription;
    setShowDescription(newValue);
    localStorage.setItem("grammar-info-collapsed", newValue ? "false" : "true");
  };

  const changeHintMode = (mode: HintMode) => {
    setHintMode(mode);
    localStorage.setItem("grammar-hint-mode", mode);
  };

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

    const correct = normalize(input) === normalize(exercise.answer);
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
    status === "idle" ? input : status === "correct" ? input : exercise.answer;

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
            radial-gradient(ellipse 80% 50% at 50% 30%, var(--color-atmosphere-yellow) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 70%, var(--color-atmosphere-pink) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 10% 50%, var(--color-atmosphere-cyan) 0%, transparent 50%)
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
          padding: "var(--space-4) var(--space-8)",
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

      {/* Progress bar */}
      <ProgressBar value={progress} size="sm" color="primary" />

      {/* Lesson header section - clickable */}
      <section
        style={{
          borderBottom: "1px solid var(--color-border)",
          background: isHeaderHovered
            ? "linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%)"
            : "var(--color-bg-secondary)",
          transition: "background var(--transition-base)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <button
          onClick={toggleDescription}
          onMouseEnter={() => setIsHeaderHovered(true)}
          onMouseLeave={() => setIsHeaderHovered(false)}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "var(--space-4) var(--space-8)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <span
              style={{
                width: 4,
                height: "var(--space-6)",
                background: "var(--color-neon-yellow)",
                borderRadius: 2,
                boxShadow: "0 0 8px rgba(249, 197, 78, 0.5)",
              }}
            />
            <h2
              style={{
                color: "var(--color-text)",
                fontSize: "var(--text-xl)",
                fontWeight: 700,
                margin: 0,
                textAlign: "left",
              }}
            >
              {lesson.name}
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              color: "var(--color-text-muted)",
              fontSize: "var(--text-sm)",
            }}
          >
            <span>{showDescription ? "Hide" : "Show"} info</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: showDescription ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform var(--transition-slow)",
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </button>

        <Collapse in={showDescription}>
          <div
            style={{
              padding: "0 var(--space-8) var(--space-6)",
            }}
          >
            <div
              style={{
                padding: "var(--space-4) var(--space-5)",
                background: "var(--color-bg-secondary)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                position: "relative",
                overflow: "hidden",
              }}
            >

              {isConjugation ? (
                <div style={{ position: "relative" }}>
                  <p
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "var(--text-md)",
                      marginBottom: "var(--space-4)",
                      marginTop: 0,
                    }}
                  >
                    {lesson.description}
                  </p>

                  {/* sein & haben conjugation tables - 2 columns */}
                  {lesson.id === "sein-haben" && (
                    <div style={{ display: "inline-flex", gap: "var(--space-6)", marginBottom: "var(--space-4)" }}>
                      <Table withRowBorders={false}>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th style={{ color: "var(--color-text-muted)", padding: "var(--space-2)", fontSize: "var(--text-lg)" }}></Table.Th>
                            <Table.Th style={{ color: "var(--color-neon-cyan)", fontWeight: 600, textAlign: "center", padding: "var(--space-2)", fontSize: "var(--text-lg)" }}>sein</Table.Th>
                            <Table.Th style={{ color: "var(--color-neon-yellow)", fontWeight: 600, textAlign: "center", padding: "var(--space-2)", fontSize: "var(--text-lg)" }}>haben</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {SEIN_HABEN.slice(0, 3).map(({ pronoun, sein, haben }) => (
                            <Table.Tr key={pronoun}>
                              <Table.Td style={{ color: "var(--color-primary)", fontWeight: 600, padding: "var(--space-2)", fontSize: "var(--text-lg)" }}>{pronoun}</Table.Td>
                              <Table.Td style={{ textAlign: "center", padding: "var(--space-2)" }}>
                                <span style={{ color: "var(--color-neon-cyan)", fontWeight: 700, background: "rgba(45, 226, 230, 0.15)", padding: "4px 12px", borderRadius: "var(--radius-sm)", fontSize: "var(--text-lg)" }}>{sein}</span>
                              </Table.Td>
                              <Table.Td style={{ textAlign: "center", padding: "var(--space-2)" }}>
                                <span style={{ color: "var(--color-neon-yellow)", fontWeight: 700, background: "rgba(249, 197, 78, 0.15)", padding: "4px 12px", borderRadius: "var(--radius-sm)", fontSize: "var(--text-lg)" }}>{haben}</span>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                      <Table withRowBorders={false}>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th style={{ color: "var(--color-text-muted)", padding: "var(--space-2)", fontSize: "var(--text-lg)" }}></Table.Th>
                            <Table.Th style={{ color: "var(--color-neon-cyan)", fontWeight: 600, textAlign: "center", padding: "var(--space-2)", fontSize: "var(--text-lg)" }}>sein</Table.Th>
                            <Table.Th style={{ color: "var(--color-neon-yellow)", fontWeight: 600, textAlign: "center", padding: "var(--space-2)", fontSize: "var(--text-lg)" }}>haben</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {SEIN_HABEN.slice(3, 6).map(({ pronoun, sein, haben }) => (
                            <Table.Tr key={pronoun}>
                              <Table.Td style={{ color: "var(--color-primary)", fontWeight: 600, padding: "var(--space-2)", fontSize: "var(--text-lg)" }}>{pronoun}</Table.Td>
                              <Table.Td style={{ textAlign: "center", padding: "var(--space-2)" }}>
                                <span style={{ color: "var(--color-neon-cyan)", fontWeight: 700, background: "rgba(45, 226, 230, 0.15)", padding: "4px 12px", borderRadius: "var(--radius-sm)", fontSize: "var(--text-lg)" }}>{sein}</span>
                              </Table.Td>
                              <Table.Td style={{ textAlign: "center", padding: "var(--space-2)" }}>
                                <span style={{ color: "var(--color-neon-yellow)", fontWeight: 700, background: "rgba(249, 197, 78, 0.15)", padding: "4px 12px", borderRadius: "var(--radius-sm)", fontSize: "var(--text-lg)" }}>{haben}</span>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </div>
                  )}

                  {/* Regular verb endings tables - 2 columns */}
                  {lesson.id === "regular-verbs" && (
                    <div style={{ display: "inline-flex", gap: "var(--space-6)", marginBottom: "var(--space-4)" }}>
                      <Table withRowBorders={false}>
                        <Table.Tbody>
                          {REGULAR_ENDINGS.slice(0, 3).map(({ pronoun, ending }) => (
                            <Table.Tr key={pronoun}>
                              <Table.Td style={{ color: "var(--color-primary)", fontWeight: 600, padding: "var(--space-2)", fontSize: "var(--text-lg)", whiteSpace: "nowrap" }}>{pronoun}</Table.Td>
                              <Table.Td style={{ textAlign: "center", padding: "var(--space-2)", whiteSpace: "nowrap" }}>
                                <span style={{ color: "var(--color-neon-cyan)", fontWeight: 700, background: "rgba(45, 226, 230, 0.15)", padding: "4px 12px", borderRadius: "var(--radius-sm)", fontSize: "var(--text-lg)" }}>{ending}</span>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                      <Table withRowBorders={false}>
                        <Table.Tbody>
                          {REGULAR_ENDINGS.slice(3, 6).map(({ pronoun, ending }) => (
                            <Table.Tr key={pronoun}>
                              <Table.Td style={{ color: "var(--color-primary)", fontWeight: 600, padding: "var(--space-2)", fontSize: "var(--text-lg)", whiteSpace: "nowrap" }}>{pronoun}</Table.Td>
                              <Table.Td style={{ textAlign: "center", padding: "var(--space-2)", whiteSpace: "nowrap" }}>
                                <span style={{ color: "var(--color-neon-cyan)", fontWeight: 700, background: "rgba(45, 226, 230, 0.15)", padding: "4px 12px", borderRadius: "var(--radius-sm)", fontSize: "var(--text-lg)" }}>{ending}</span>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </div>
                  )}

                  {/* Footer note */}
                  <div
                    style={{
                      paddingTop: "var(--space-3)",
                      borderTop: "1px solid var(--color-border)",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "var(--text-sm)",
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--color-neon-purple)",
                          boxShadow: "0 0 8px var(--color-neon-purple)",
                        }}
                      />
                      Get 3 correct in a row to master.
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{ position: "relative" }}>
                  <p
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "var(--text-sm)",
                      marginBottom: "var(--space-3)",
                      marginTop: 0,
                    }}
                  >
                    {lesson.description}
                  </p>

                  <div
                    style={{
                      paddingTop: "var(--space-3)",
                      borderTop: "1px solid var(--color-border)",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--color-text-subtle)",
                        fontSize: "var(--text-base)",
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--color-neon-purple)",
                          boxShadow: "0 0 6px var(--color-neon-purple)",
                        }}
                      />
                      Get 3 correct in a row to master each item.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Collapse>
      </section>

      {/* Main exercise area - spread vertically */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "0 var(--space-8)",
          maxWidth: "56rem",
          margin: "0 auto",
          width: "100%",
          minHeight: 0,
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
          {/* Top section - verb hint (only for conjugation) */}
          {isConjugation && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div
                key={promptKey}
                style={{
                  textAlign: "center",
                  animation: "promptEnter 0.5s ease-out",
                }}
              >
                <Menu shadow="md" width={220} position="bottom">
                  <Menu.Target>
                    <button
                      type="button"
                      style={{
                        color: "var(--color-primary)",
                        fontSize: "var(--text-4xl)",
                        fontWeight: 700,
                        fontFamily: "var(--font-display)",
                        cursor: "pointer",
                        padding: "var(--space-3) var(--space-6)",
                        borderRadius: "var(--radius-lg)",
                        transition: "all var(--transition-base)",
                        background: "transparent",
                        border: "none",
                        textShadow: `
                          0 0 20px var(--color-primary-glow),
                          0 0 40px rgba(246, 1, 157, 0.3)
                        `,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--color-primary-glow)";
                        e.currentTarget.style.transform = "scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      {displayHint}
                    </button>
                  </Menu.Target>
                  <Menu.Dropdown
                    style={{
                      background: "var(--color-card-bg)",
                      border: "1px solid var(--color-border)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 20px var(--color-primary-glow)",
                    }}
                  >
                    <Menu.Label
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "var(--text-xs)",
                        fontWeight: 600,
                        padding: "var(--space-2) var(--space-3)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Show hint as
                    </Menu.Label>
                    {(["english", "german", "both"] as const).map((mode) => (
                      <Menu.Item
                        key={mode}
                        onClick={() => changeHintMode(mode)}
                        style={{
                          color: hintMode === mode ? "var(--color-primary)" : "var(--color-text)",
                          fontWeight: hintMode === mode ? 600 : 400,
                          background: hintMode === mode ? "var(--color-primary-glow)" : "transparent",
                          transition: "all var(--transition-base)",
                        }}
                      >
                        {mode === "english" && "English only"}
                        {mode === "german" && "German only"}
                        {mode === "both" && "Both"}
                        {hintMode === mode && " ✓"}
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu>
                <p
                  style={{
                    color: "var(--color-text-subtle)",
                    fontSize: "var(--text-xs)",
                    marginTop: "var(--space-3)",
                    marginBottom: 0,
                    opacity: 0,
                    animation: "fadeIn 0.3s ease-out 0.3s forwards",
                  }}
                >
                  Click or press <kbd style={{
                    background: "var(--color-bg-secondary)",
                    padding: "2px 6px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--color-border)",
                    fontSize: "var(--text-xs)",
                  }}>1</kbd> to change hint
                </p>
              </div>
            </div>
          )}

          {/* Case exercises - single line sentence */}
          {!isConjugation && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div
                key={promptKey}
                style={{
                  animation: "promptEnter 0.5s ease-out",
                  width: "100%",
                }}
              >
                {/* Single line: sentence + input + noun */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "var(--space-5)",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--text-4xl)",
                      fontWeight: 800,
                      color: "var(--color-text)",
                      fontFamily: "var(--font-display)",
                      lineHeight: 1.2,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {sentencePart}
                  </span>

                  <DrillInput
                    ref={inputRef}
                    value={displayValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="..."
                    status={status}
                    size="lg"
                    readOnly={status !== "idle"}
                    style={{ flex: "1 1 0%", maxWidth: "50%" }}
                  />

                  <span
                    style={{
                      fontSize: "var(--text-4xl)",
                      fontWeight: 800,
                      color: "var(--color-text)",
                      fontFamily: "var(--font-display)",
                      lineHeight: 1.2,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {nounOnly}.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom section - card and feedback */}
          <div style={{ paddingBottom: "10vh" }}>
            {/* Conjugation card (only for conjugation exercises) */}
            {isConjugation && (
              <article
                style={{
                  background: "linear-gradient(135deg, var(--color-card-bg) 0%, rgba(246, 1, 157, 0.02) 100%)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-10)",
                  marginBottom: "var(--space-8)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "var(--space-8)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--text-5xl)",
                      fontWeight: 800,
                      color: "var(--color-text)",
                      fontFamily: "var(--font-display)",
                      lineHeight: 1,
                      textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    {sentencePart}
                  </span>

                  <DrillInput
                    ref={inputRef}
                    value={displayValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="..."
                    status={status}
                    size="xl"
                    readOnly={status !== "idle"}
                    style={{ width: "17.5rem" }}
                  />
                </div>
              </article>
            )}

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
