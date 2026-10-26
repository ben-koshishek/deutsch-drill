import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { DrillDirection, TranslationCard } from '@/types'

interface DrillCardProps {
  question: string
  direction: DrillDirection
  grammar?: TranslationCard['grammar']
  onSubmit: (answer: string) => void
  onOpenCheatsheet?: () => void
}

type PillVariant = 'case' | 'person' | 'number' | 'formality'

const pillStyles: Record<PillVariant, string> = {
  case: 'border-success-400/40 bg-success-400/20 text-success-300 shadow-success-400/10',
  person: 'border-amber-400/40 bg-amber-400/20 text-amber-300 shadow-amber-400/10',
  number: 'border-cyan-400/40 bg-cyan-400/20 text-cyan-300 shadow-cyan-400/10',
  formality: 'border-primary-400/40 bg-primary-400/20 text-primary-300 shadow-primary-400/10',
}

function GrammarPill({ children, variant = 'case' }: { children: React.ReactNode; variant?: PillVariant }) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold uppercase tracking-wide shadow-sm',
      pillStyles[variant]
    )}>
      {children}
    </span>
  )
}

export function DrillCard({ question, direction, grammar, onSubmit, onOpenCheatsheet }: DrillCardProps) {
  const [answer, setAnswer] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setAnswer('')
    inputRef.current?.focus()
  }, [question])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(answer)
  }

  const instruction = direction === 'de-en' ? 'Translate to English' : 'Translate to German'

  // Build grammar pills with their variants
  const grammarPills: { text: string; variant: PillVariant }[] = []
  if (grammar?.case) grammarPills.push({ text: grammar.case, variant: 'case' })
  if (grammar?.person) grammarPills.push({ text: grammar.person + ' person', variant: 'person' })
  if (grammar?.number) grammarPills.push({ text: grammar.number, variant: 'number' })
  if (grammar?.formality) grammarPills.push({ text: grammar.formality, variant: 'formality' })

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-2xl rounded-3xl border-2 border-grey-700 bg-grey-900 shadow-2xl">
        {/* Word display area */}
        <div className="px-12 py-16 text-center">
          {/* Instruction */}
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-grey-500">
            {instruction}
          </p>

          {/* The word */}
          <h1 className="mb-6 text-7xl font-bold tracking-tight text-white">
            {question}
          </h1>

          {/* Grammar pills */}
          {grammarPills.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {grammarPills.map((pill, i) => (
                <GrammarPill key={i} variant={pill.variant}>{pill.text}</GrammarPill>
              ))}
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-grey-700 bg-grey-800/50 px-12 py-8">
          <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
            <Input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="text-center text-xl"
            />

            <Button type="submit" size="lg" className="w-full">
              Check Answer
            </Button>
          </form>

          <div className="mt-5 flex flex-col items-center gap-2 text-sm text-grey-500">
            <p>
              <span className="text-grey-400">Tip:</span> type a for ä, o for ö, u for ü
            </p>

            {onOpenCheatsheet && (
              <button
                type="button"
                // Keep focus on the input so closing the sheet lands the caret back there
                onMouseDown={(e) => e.preventDefault()}
                onClick={onOpenCheatsheet}
                className="inline-flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:text-grey-300"
              >
                <kbd className="rounded-md border border-grey-600 bg-grey-700 px-2 py-0.5 font-mono text-xs font-medium text-grey-300 shadow-sm">
                  Tab
                </kbd>
                cheatsheet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
