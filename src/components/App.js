import React, { useState } from 'react'
import AssetsMap from './AssetsMap'
import SketchButton from './SketchButton'
import SketchModeToolbar from './SketchModeToolbar'
import SketchAddToolbar from './SketchAddToolbar'
import SketchEditToolbar from './SketchEditToolbar'
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
  const [selectedAssetIndexes, setSelectedAssetIndexes] = useState([])
  const [lineBusId, setLineBusId] = useState(null)

  function startNewLine() {
    setLineBusId(null)
    setSelectedAssetIndexes([])
  }

  return (
    <div>
      <AssetsMap
        sketchMode={sketchMode}
        selectedAssetIndexes={selectedAssetIndexes}
        lineBusId={lineBusId}
        setSelectedAssetIndexes={setSelectedAssetIndexes}
        setLineBusId={setLineBusId}
        onAddLineEnd={startNewLine}
      />
      <SketchButton
        sketchMode={sketchMode}
        setSketchMode={setSketchMode}
      />
      <SketchModeToolbar
        sketchMode={sketchMode}
        setSketchMode={setSketchMode}
      />
      <SketchAddToolbar
        sketchMode={sketchMode}
        setSketchMode={setSketchMode}
        onSketchModeAddLine={startNewLine}
      />
      <SketchEditToolbar
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
