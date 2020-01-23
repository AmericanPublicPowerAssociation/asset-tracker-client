import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AssetsMap from './AssetsMap'
import SketchButton from './SketchButton'
import SketchModeToolbar from './SketchModeToolbar'
import SketchAddToolbar from './SketchAddToolbar'
import SketchEditToolbar from './SketchEditToolbar'
import UsersWindow from './UsersWindow'
import OptionsWindow from './OptionsWindow'
import DetailsWindow from './DetailsWindow'
import RowsWindow from './RowsWindow'
import {
  IS_WITH_DETAILS,
  IS_WITH_ROWS,
  SKETCH_MODE,
} from '../constants'
import {
  getIsWithRows,
} from '../selectors'
import './App.css'

export default function App() {
  const [sketchMode, setSketchMode] = useState(SKETCH_MODE)
  const [isWithDetails, setIsWithDetails] = useState(IS_WITH_DETAILS)
  const isWithRows = useSelector(getIsWithRows)
  return (
    <div>
      <AssetsMap
        sketchMode={sketchMode}
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
      />
      <SketchEditToolbar
        sketchMode={sketchMode}
        setSketchMode={setSketchMode}
      />
      <UsersWindow />
      <OptionsWindow
        sketchMode={sketchMode}
        isWithDetails={isWithDetails}
        setIsWithDetails={setIsWithDetails}
      />
      <DetailsWindow
        isWithDetails={isWithDetails}
      />

      { sketchMode === 'view' && isWithRows &&
      <RowsWindow
        sketchMode={sketchMode}/>
      }
    </div>
  )
}
