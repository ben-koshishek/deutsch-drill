import { useState } from 'react'
import { StartScreen } from '@/components/StartScreen'
import { DrillScreen } from '@/components/DrillScreen'
import { pronouns } from '@/data/pronouns'

type AppScreen = 'start' | 'drill'

function App() {
  const [screen, setScreen] = useState<AppScreen>('start')

  if (screen === 'drill') {
    return (
      <DrillScreen
        cards={pronouns.cards}
        deckName={pronouns.name}
        cheatsheet={pronouns.cheatsheet}
        onExit={() => setScreen('start')}
      />
    )
  }

  return (
    <StartScreen
      deckName={pronouns.name}
      cards={pronouns.cards}
      onStart={() => setScreen('drill')}
    />
  )
}

export default App
