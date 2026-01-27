import { useState, useEffect, useRef, useCallback } from "react";
import { Collapse, Menu, Table } from "@mantine/core";
import type { GrammarLesson } from "../types";
import { useFillBlank } from "../hooks/useFillBlank";
import { updateLastRun, resetDeckProgress, type UpdateLastRunResult } from "../db";
import { useTimer } from "../hooks/useTimer";
import { normalize } from "@/utils/normalize";
import { MAX_LIVES, AUTO_ADVANCE_DELAY_MS, GAME_OVER_DELAY_MS, MASTERY_THRESHOLD } from "@/constants";
import { TimeCompletionScreen } from "./TimeCompletionScreen";
import { StreakDots } from "./ui/StreakDots";
import { DrillInput } from "./ui/DrillInput";
import { ProgressBar } from "./ui/ProgressBar";
import { RunStats } from "./ui/RunStats";
import { ResetConfirmModal } from "./ui/ResetConfirmModal";
import { GameOverScreen } from "./ui/GameOverScreen";
import { tableStyles } from "../styles/tableStyles";
import { Layout } from "./Layout";
import "./FillBlankScreen.css";

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
}: FillBlankScreenProps) {
  const [drillKey, setDrillKey] = useState(0);
  const { currentTask, submitAnswer, isFinished, completedCount, totalCount } =
    useFillBlank(lesson, drillKey);

  const inputRef = useRef<HTMLInputElement>(null);
  const prevTaskKeyRef = useRef<string | null>(null);
  const [showDescription, setShowDescription] = useState(() => !getStoredInfoCollapsed());
  const [hintMode, setHintMode] = useState<HintMode>(getStoredHintMode);

  const timer = useTimer();
  const [timerStarted, setTimerStarted] = useState(false);
  const [mistakeCount, setMistakeCount] = useState(0);

  const [showCompletion, setShowCompletion] = useState(false);
  const [completionResult, setCompletionResult] = useState<UpdateLastRunResult | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);

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

  const [promptKey, setPromptKey] = useState(0);
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
    if (isFinished && !showCompletion && timerStarted) {
      const finalTime = timer.stop();
      updateLastRun(lesson.id, finalTime, mistakeCount).then((result) => {
        setCompletionResult(result);
        setShowCompletion(true);
      });
    }
  }, [isFinished, showCompletion, lesson.id, timerStarted, timer, mistakeCount]);

  const handleTryAgain = useCallback(async () => {
    await resetDeckProgress(lesson.id);
    setShowCompletion(false);
    setShowGameOver(false);
    setCompletionResult(null);
    setTimerStarted(false);
    setMistakeCount(0);
    timer.reset();
    prevTaskKeyRef.current = null;
    setDrillKey((k) => k + 1);
  }, [lesson.id, timer]);

  const handleReset = useCallback(async () => {
    await resetDeckProgress(lesson.id);
    setShowResetModal(false);
    setTimerStarted(false);
    setMistakeCount(0);
    timer.reset();
    prevTaskKeyRef.current = null;
    setFormState({ taskKey: null, input: "", status: "idle" });
    setDrillKey((k) => k + 1);
  }, [lesson.id, timer]);

  useEffect(() => {
    if (shouldAutoAdvance) {
      const t = setTimeout(() => {
        submitAnswer(true);
        setShouldAutoAdvance(false);
      }, AUTO_ADVANCE_DELAY_MS);
      return () => clearTimeout(t);
    }
  }, [shouldAutoAdvance, submitAnswer]);

  const cycleHintMode = useCallback(() => {
    const currentIndex = HINT_MODES.indexOf(hintMode);
    const nextIndex = (currentIndex + 1) % HINT_MODES.length;
    const nextMode = HINT_MODES[nextIndex];
    setHintMode(nextMode);
    localStorage.setItem("grammar-hint-mode", nextMode);
  }, [hintMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "1" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        cycleHintMode();
        return;
      }

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
          submitAnswer(false);
        } else if (status === "correct") {
          submitAnswer(true);
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
  }, [cycleHintMode, status, submitAnswer, onExit, showResetModal]);

  if (showGameOver) {
    return (
      <Layout
        headerLeft={<button className="fill__back-btn" onClick={onExit}>Back</button>}
        headerCenter={<span className="fill__title">{lesson.name}</span>}
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
        itemName={lesson.name}
        onTryAgain={handleTryAgain}
        onExit={onExit}
      />
    );
  }

  if (!currentTask) {
    return (
      <Layout
        headerLeft={<button className="fill__back-btn" onClick={onExit}>Back</button>}
        headerCenter={<span className="fill__title">{lesson.name}</span>}
        headerRight={<span className="fill__counter">Loading...</span>}
      >
        <div className="fill__loading">Loading...</div>
      </Layout>
    );
  }

  const { exercise } = currentTask;
  const progress = Math.round((completedCount / totalCount) * 100);

  // Try transformation format: "[Present sentence] → ___"
  const transformMatch = exercise.sentence.match(/^\[([^\]]+)\] → ___$/);

  // Try conjugation format: "pronoun ___ [infinitive|english]"
  const conjugationMatch = exercise.sentence.match(/^([a-züöäß]+) ___ \[([^\|]+)\|([^\]]+)\]$/i);

  // Try gender format: "___ [category|examples]" (blank at start)
  const genderMatch = exercise.sentence.match(/^___ \[([^\|]+)\|([^\]]+)\]$/i);

  // Try case format: "sentence words ___ [article|english]"
  const caseMatch = exercise.sentence.match(/^(.+) ___ \[([^\|]+)\|([^\]]+)\]$/i);

  const isTransformation = transformMatch !== null;
  const isConjugation = conjugationMatch !== null;
  const isGender = genderMatch !== null;
  const match = conjugationMatch ?? caseMatch;

  const sentencePart = match?.[1] ?? "";
  const germanHint = isGender ? genderMatch[1] : (match?.[2] ?? "");
  const englishHint = isGender ? genderMatch[2] : (match?.[3] ?? "");

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

    if (!timerStarted) {
      timer.start();
      setTimerStarted(true);
    }

    const correct = normalize(input) === normalize(exercise.answer);
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
        setTimeout(() => setShowGameOver(true), GAME_OVER_DELAY_MS);
      }
    }
  };

  const displayValue =
    status === "idle" ? input : status === "correct" ? input : exercise.answer;

  return (
    <Layout
      headerLeft={
        <div className="fill__header-left">
          <button className="fill__back-btn" onClick={onExit}>Back</button>
          <RunStats elapsedMs={timer.elapsedMs} mistakes={mistakeCount} />
        </div>
      }
      headerCenter={
        <span className="fill__title">{lesson.name}</span>
      }
      headerRight={
        <span className="fill__counter">{completedCount} / {totalCount}</span>
      }
    >
      {showResetModal && (
        <ResetConfirmModal
          deckName={lesson.name}
          onConfirm={handleReset}
          onCancel={() => setShowResetModal(false)}
        />
      )}

      <div className="fill__content">
        <ProgressBar value={progress} size="sm" color="primary" />

        {/* Lesson info section - collapsible */}
        <Collapse in={showDescription}>
          <section className="fill__lesson-section">
            <div className="fill__lesson-content">
              <div className="fill__lesson-card">
                {isConjugation ? (
                  <>
                    <p className="fill__lesson-desc">{lesson.description}</p>

                    {lesson.id === "sein-haben" && (
                      <div style={tableStyles.tableContainer}>
                        <Table withRowBorders={false}>
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th style={tableStyles.thMuted}></Table.Th>
                              <Table.Th style={tableStyles.thCyan}>sein</Table.Th>
                              <Table.Th style={tableStyles.thYellow}>haben</Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            {SEIN_HABEN.slice(0, 3).map(({ pronoun, sein, haben }) => (
                              <Table.Tr key={pronoun}>
                                <Table.Td style={tableStyles.tdPronoun}>{pronoun}</Table.Td>
                                <Table.Td style={tableStyles.tdCenter}>
                                  <span style={tableStyles.badgeCyan}>{sein}</span>
                                </Table.Td>
                                <Table.Td style={tableStyles.tdCenter}>
                                  <span style={tableStyles.badgeYellow}>{haben}</span>
                                </Table.Td>
                              </Table.Tr>
                            ))}
                          </Table.Tbody>
                        </Table>
                        <Table withRowBorders={false}>
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th style={tableStyles.thMuted}></Table.Th>
                              <Table.Th style={tableStyles.thCyan}>sein</Table.Th>
                              <Table.Th style={tableStyles.thYellow}>haben</Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            {SEIN_HABEN.slice(3, 6).map(({ pronoun, sein, haben }) => (
                              <Table.Tr key={pronoun}>
                                <Table.Td style={tableStyles.tdPronoun}>{pronoun}</Table.Td>
                                <Table.Td style={tableStyles.tdCenter}>
                                  <span style={tableStyles.badgeCyan}>{sein}</span>
                                </Table.Td>
                                <Table.Td style={tableStyles.tdCenter}>
                                  <span style={tableStyles.badgeYellow}>{haben}</span>
                                </Table.Td>
                              </Table.Tr>
                            ))}
                          </Table.Tbody>
                        </Table>
                      </div>
                    )}

                    {lesson.id === "regular-verbs" && (
                      <div style={tableStyles.tableContainer}>
                        <Table withRowBorders={false}>
                          <Table.Tbody>
                            {REGULAR_ENDINGS.slice(0, 3).map(({ pronoun, ending }) => (
                              <Table.Tr key={pronoun}>
                                <Table.Td style={tableStyles.tdPronounNoWrap}>{pronoun}</Table.Td>
                                <Table.Td style={tableStyles.tdCenterNoWrap}>
                                  <span style={tableStyles.badgeCyan}>{ending}</span>
                                </Table.Td>
                              </Table.Tr>
                            ))}
                          </Table.Tbody>
                        </Table>
                        <Table withRowBorders={false}>
                          <Table.Tbody>
                            {REGULAR_ENDINGS.slice(3, 6).map(({ pronoun, ending }) => (
                              <Table.Tr key={pronoun}>
                                <Table.Td style={tableStyles.tdPronounNoWrap}>{pronoun}</Table.Td>
                                <Table.Td style={tableStyles.tdCenterNoWrap}>
                                  <span style={tableStyles.badgeCyan}>{ending}</span>
                                </Table.Td>
                              </Table.Tr>
                            ))}
                          </Table.Tbody>
                        </Table>
                      </div>
                    )}

                    <div className="fill__lesson-footer">
                      <p className="fill__lesson-footer-text">
                        <span className="fill__lesson-dot" />
                        Get 3 correct in a row to master.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="fill__lesson-desc">{lesson.description}</p>
                    <div className="fill__lesson-footer">
                      <p className="fill__lesson-footer-text">
                        <span className="fill__lesson-dot" />
                        Get 3 correct in a row to master each item.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </Collapse>

        {/* Info toggle button */}
        <button onClick={toggleDescription} className="fill__info-toggle">
          <span>{showDescription ? "Hide" : "Show"} info</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`fill__info-chevron ${showDescription ? "fill__info-chevron--open" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <form onSubmit={handleSubmit} className="fill__form">
          {/* Prompt section */}
          <div className="fill__prompt-section">
            {/* Conjugation hint */}
            {isConjugation && (
              <div key={promptKey} className="fill__prompt-container fill__hint-container">
                <Menu shadow="md" width={220} position="bottom">
                  <Menu.Target>
                    <button type="button" className="fill__hint-btn">
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
                <p className="fill__hint-note">
                  Click or press <kbd className="fill__hint-kbd">1</kbd> to change hint
                </p>
              </div>
            )}

            {/* Gender exercises */}
            {isGender && (
              <div key={promptKey} className="fill__prompt-container fill__gender-container">
                <h3 className="fill__gender-category">{germanHint}</h3>
                <p className="fill__gender-examples">{englishHint}</p>
                <div className="fill__gender-input-wrapper">
                  <DrillInput
                    ref={inputRef}
                    value={displayValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="der / die / das"
                    status={status}
                    size="lg"
                    readOnly={status !== "idle"}
                  />
                  {exercise.hint && (
                    <span className="fill__gender-hint">{exercise.hint}</span>
                  )}
                </div>
              </div>
            )}

            {/* Transformation exercises (Präteritum) */}
            {isTransformation && transformMatch && (
              <div key={promptKey} className="fill__prompt-container fill__transform-container">
                <div className="fill__transform-present">{transformMatch[1]}</div>
                <div className="fill__transform-arrow">↓</div>
                <div className="fill__transform-input-wrapper">
                  <DrillInput
                    ref={inputRef}
                    value={displayValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Type past tense sentence..."
                    status={status}
                    size="lg"
                    readOnly={status !== "idle"}
                    style={{ width: "100%", maxWidth: "400px" }}
                  />
                  {exercise.hint && (
                    <span className="fill__transform-hint">{exercise.hint}</span>
                  )}
                </div>
              </div>
            )}

            {/* Case exercises */}
            {!isConjugation && !isGender && !isTransformation && (
              <div key={promptKey} className="fill__prompt-container fill__case-container">
                <div className="fill__case-row">
                  <span className="fill__case-text">{sentencePart}</span>
                  <div className="fill__case-input-wrapper">
                    <DrillInput
                      ref={inputRef}
                      value={displayValue}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="..."
                      status={status}
                      size="lg"
                      readOnly={status !== "idle"}
                    />
                    <span className="fill__case-transform">{germanHint} → ?</span>
                  </div>
                  <span className="fill__case-text">{nounOnly}.</span>
                </div>
              </div>
            )}
          </div>

          {/* Input section */}
          <div className="fill__input-section">
            {/* Conjugation card */}
            {isConjugation && (
              <article className="fill__conjugation-card">
                <div className="fill__conjugation-row">
                  <span className="fill__conjugation-pronoun">{sentencePart}</span>
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

            {/* Feedback row */}
            <div className="fill__feedback-row">
              {(() => {
                const baseStreak = currentTask.streak;
                const displayStreak = status === "correct"
                  ? Math.min(baseStreak + 1, MASTERY_THRESHOLD)
                  : status === "wrong"
                    ? 0
                    : baseStreak;
                return <StreakDots current={displayStreak} size="lg" showLabel />;
              })()}

              <span className={`fill__feedback fill__feedback--${status}`}>
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
