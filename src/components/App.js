import React, { useState } from 'react'
import AssetsMap from './AssetsMap'
import SketchButton from './SketchButton'
import UsersWindow from './UsersWindow'
import OptionsWindow from './OptionsWindow'
import DetailsWindow from './DetailsWindow'
import {
  IS_WITH_DETAILS,
  SKETCH_MODE,
} from '../constants'
import './App.css'

export default function App() {
  const [sketchMode, setSketchMode] = useState(SKETCH_MODE)
  const [isWithDetails, setIsWithDetails] = useState(IS_WITH_DETAILS)
  return (
    <div>
      <AssetsMap
        sketchMode={sketchMode}
      />
      <SketchButton
        sketchMode={sketchMode}
        setSketchMode={setSketchMode}
      />
      <UsersWindow />
      <OptionsWindow
        isWithDetails={isWithDetails}
        setIsWithDetails={setIsWithDetails}
      />
      <DetailsWindow
        isWithDetails={isWithDetails}
      />
    </div>
  )
}
