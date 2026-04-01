import { useState } from 'react'
import { VortexBackground } from '@/components/VortexBackground'
import { IngressTerminal } from '@/components/IngressTerminal'
import { CommandHero } from '@/components/CommandHero'
import { NarrativeLayer } from '@/components/NarrativeLayer'
import { SystemLayer } from '@/components/SystemLayer'

function App() {
  const [bootComplete, setBootComplete] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [showSystemLayer, setShowSystemLayer] = useState(false)

  const handleAuthentication = () => {
    setAuthenticated(true)
    setTimeout(() => {
      setShowSystemLayer(true)
    }, 800)
  }

  return (
    <>
      {!bootComplete && <IngressTerminal onComplete={() => setBootComplete(true)} />}
      
      <div className="relative">
        <VortexBackground focusColor="#8B5CF6" />

        <div className="relative z-10">
          {bootComplete && (
            <>
              <CommandHero onAuthenticated={handleAuthentication} />
              
              {authenticated && (
                <>
                  <NarrativeLayer />
                  <SystemLayer visible={showSystemLayer} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default App