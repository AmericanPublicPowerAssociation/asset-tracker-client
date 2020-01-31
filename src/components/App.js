import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AssetsMap from './AssetsMap'
import SketchButton from './SketchButton'
import SketchModeToolbar from './SketchModeToolbar'
import SketchAddToolbar from './SketchAddToolbar'
import SketchEditToolbar from './SketchEditToolbar'
import UsersWindow from './UsersWindow'
import OptionsWindow from './OptionsWindow'
import DetailsWindow from './DetailsWindow'
import RowsWindow from './RowsWindow'
import DataDialog from './DataDialog'
import OverlaysWindow from './OverlaysWindow'
import {
  IS_WITH_DETAILS,
  IS_WITH_ROWS,
  SKETCH_MODE,
} from '../constants'
import {
  setWindowSize,
} from '../actions'
import {
  getIsWithRows,
  getWindowSize,
  getIsFullScreenDataDialog,
} from '../selectors'
import './App.css'

export default function App() {
  const [sketchMode, setSketchMode] = useState(SKETCH_MODE)
  const [isWithDetails, setIsWithDetails] = useState(IS_WITH_DETAILS)
  const dispatch = useDispatch()
  const isWithRows = useSelector(getIsWithRows)
  const windowSize = useSelector(getWindowSize)
  const isFullScreenDataDialog = useSelector(getIsFullScreenDataDialog)

  const updateDimensions = () => {
    const innerWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    const innerHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    dispatch(setWindowSize({innerWidth, innerHeight}))
  }

  useEffect( () => {
    window.addEventListener("resize", updateDimensions);
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight
    dispatch(setWindowSize({innerWidth, innerHeight}))
  }, [])

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
        windowWidth={windowSize.innerWidth}
        sketchMode={sketchMode}
        isWithDetails={isWithDetails}
        setIsWithDetails={setIsWithDetails}
      />
      <OverlaysWindow
        sketchMode={sketchMode}
      />
      <DetailsWindow
        setIsWithDetails={setIsWithDetails}
        isWithDetails={isWithDetails}
      />

      { windowSize.innerWidth >= 600 && sketchMode === 'view' && isWithRows &&
      <RowsWindow
        sketchMode={sketchMode}/>
      }

      {
        isFullScreenDataDialog &&
        <DataDialog />
      }
    </div>
  )
}
