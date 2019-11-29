import React, { useState } from 'react'
import SketchButton from './SketchButton'

function App() {
  const [isSketching, setIsSketching] = useState(false)
  return (
    <div>
      <SketchButton
        isSketching={isSketching}
        setIsSketching={setIsSketching}
      />
    </div>
  )
}

export default App
