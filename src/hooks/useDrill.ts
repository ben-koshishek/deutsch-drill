import { useState, useCallback, useMemo } from 'react'
import type {
  TranslationCard,
  DrillDirection,
  CardProgress,
  DrillCard,
  DrillState,
  DrillStatus,
} from '@/types'
import { MASTERY_THRESHOLD, INITIAL_LIVES } from '@/lib/constants'
import { answersMatch } from '@/lib/validation'

function createProgressKey(cardId: string, direction: DrillDirection): string {
  return `${cardId}:${direction}`
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function initializeDrillCards(cards: TranslationCard[]): DrillCard[] {
  const drillCards: DrillCard[] = []

  for (const card of cards) {
    drillCards.push({ card, direction: 'de-en' })
    drillCards.push({ card, direction: 'en-de' })
  }

  return shuffleArray(drillCards)
}

function initializeProgress(cards: TranslationCard[]): Map<string, CardProgress> {
  const progress = new Map<string, CardProgress>()

  for (const card of cards) {
    for (const direction of ['de-en', 'en-de'] as DrillDirection[]) {
      const key = createProgressKey(card.id, direction)
      progress.set(key, {
        cardId: card.id,
        direction,
        correctStreak: 0,
        mastered: false,
      })
    }
  }

  return progress
}

export function useDrill(cards: TranslationCard[]) {
  const [state, setState] = useState<DrillState>(() => {
    const drillCards = initializeDrillCards(cards)
    return {
      cards,
      progress: initializeProgress(cards),
      currentCard: drillCards[0] ?? null,
      remainingCards: drillCards.slice(1),
      lives: INITIAL_LIVES,
      mistakeCount: 0,
      status: 'active' as DrillStatus,
      lastAnswer: null,
    }
  })

  const getQuestion = useCallback((drillCard: DrillCard): string => {
    return drillCard.direction === 'de-en' ? drillCard.card.german : drillCard.card.english
  }, [])

  const getCorrectAnswer = useCallback((drillCard: DrillCard): string => {
    return drillCard.direction === 'de-en' ? drillCard.card.english : drillCard.card.german
  }, [])

  const submitAnswer = useCallback((userAnswer: string) => {
    setState((prev) => {
      if (!prev.currentCard || prev.status !== 'active') return prev

      const correctAnswer = getCorrectAnswer(prev.currentCard)
      const isCorrect = answersMatch(userAnswer, correctAnswer)
      const key = createProgressKey(prev.currentCard.card.id, prev.currentCard.direction)
      const cardProgress = prev.progress.get(key)!

      const newProgress = new Map(prev.progress)

      if (isCorrect) {
        const newStreak = cardProgress.correctStreak + 1
        const mastered = newStreak >= MASTERY_THRESHOLD
        newProgress.set(key, {
          ...cardProgress,
          correctStreak: newStreak,
          mastered,
        })
      } else {
        newProgress.set(key, {
          ...cardProgress,
          correctStreak: 0,
        })
      }

      const newLives = isCorrect ? prev.lives : prev.lives - 1
      const newMistakeCount = isCorrect ? prev.mistakeCount : prev.mistakeCount + 1

      return {
        ...prev,
        progress: newProgress,
        lives: newLives,
        mistakeCount: newMistakeCount,
        status: 'feedback' as DrillStatus,
        lastAnswer: {
          correct: isCorrect,
          userAnswer,
          correctAnswer,
        },
      }
    })
  }, [getCorrectAnswer])

  const nextCard = useCallback(() => {
    setState((prev) => {
      if (prev.status !== 'feedback') return prev

      if (prev.lives <= 0) {
        return { ...prev, status: 'game-over' as DrillStatus }
      }

      const key = createProgressKey(prev.currentCard!.card.id, prev.currentCard!.direction)
      const cardProgress = prev.progress.get(key)!

      let newRemaining = [...prev.remainingCards]

      if (!cardProgress.mastered) {
        newRemaining.push(prev.currentCard!)
        newRemaining = shuffleArray(newRemaining)
      }

      const unmasteredCount = Array.from(prev.progress.values()).filter((p) => !p.mastered).length

      if (unmasteredCount === 0) {
        return { ...prev, status: 'complete' as DrillStatus, currentCard: null }
      }

      const nextDrillCard = newRemaining[0] ?? null

      return {
        ...prev,
        currentCard: nextDrillCard,
        remainingCards: newRemaining.slice(1),
        status: 'active' as DrillStatus,
        lastAnswer: null,
      }
    })
  }, [])

  const restart = useCallback(() => {
    const drillCards = initializeDrillCards(cards)
    setState({
      cards,
      progress: initializeProgress(cards),
      currentCard: drillCards[0] ?? null,
      remainingCards: drillCards.slice(1),
      lives: INITIAL_LIVES,
      mistakeCount: 0,
      status: 'active' as DrillStatus,
      lastAnswer: null,
    })
  }, [cards])

  const stats = useMemo(() => {
    const total = state.progress.size
    const mastered = Array.from(state.progress.values()).filter((p) => p.mastered).length
    return {
      total,
      mastered,
      remaining: total - mastered,
      progressPercent: Math.round((mastered / total) * 100),
    }
  }, [state.progress])

  return {
    state,
    stats,
    getQuestion,
    getCorrectAnswer,
    submitAnswer,
    nextCard,
    restart,
  }
}
