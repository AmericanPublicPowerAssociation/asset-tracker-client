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
  const [selectedAssetIndexes, setSelectedAssetIndexes] = useState([])
  const [isWithDetails, setIsWithDetails] = useState(IS_WITH_DETAILS)
  return (
    <div>
      <AssetsMap
        sketchMode={sketchMode}
        selectedAssetIndexes={selectedAssetIndexes}
        setSelectedAssetIndexes={setSelectedAssetIndexes}
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
        setSelectedAssetIndexes={setSelectedAssetIndexes}
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
