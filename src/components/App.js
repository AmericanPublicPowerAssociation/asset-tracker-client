import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AssetsMap from './AssetsMap'
import SketchButton from './SketchButton'
import SketchModeToolbar from './SketchModeToolbar'
import SketchAddToolbar from './SketchAddToolbar'
import SketchEditToolbar from './SketchEditToolbar'
import UsersWindow from './UsersWindow'
import OptionsWindow from './OptionsWindow'
// import OverlaysWindow from './OverlaysWindow'
import DetailsWindow from './DetailsWindow'
// import TableWindow from './TableWindow'
import DataDialog from './DataDialog'
import './App.css'
import {
  refreshAssetsKit,
} from '../actions'
import {
  IS_WITH_DATA,
  IS_WITH_DETAILS,
  IS_WITH_TABLE,
  SKETCH_MODE,
} from '../constants'

export default function App() {
  const dispatch = useDispatch()
  const [sketchMode, setSketchMode] = useState(SKETCH_MODE)
  const [isWithDetails, setIsWithDetails] = useState(IS_WITH_DETAILS)
  const [isWithTable, setIsWithTable] = useState(IS_WITH_TABLE)
  const [isWithData, setIsWithData] = useState(IS_WITH_DATA)
  const [selectedAssetIndexes, setSelectedAssetIndexes] = useState([])
  const [lineBusId, setLineBusId] = useState(null)

  function startNewLine() {
    setLineBusId(null)
    setSelectedAssetIndexes([])
  }

  useEffect(() => {
    dispatch(refreshAssetsKit())
  }, [dispatch])

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
        sketchMode={sketchMode}
        isWithDetails={isWithDetails}
        isWithTable={isWithTable}
        isWithData={isWithData}
        setIsWithDetails={setIsWithDetails}
        setIsWithTable={setIsWithTable}
        setIsWithData={setIsWithData}
      />
      {/*
      <OverlaysWindow
        sketchMode={sketchMode}
      />
      */}
      <DetailsWindow
        isWithDetails={isWithDetails}
      />
      {/*
      <TableWindow />
      */}
      <DataDialog
        isWithData={isWithData}
        setIsWithData={isWithData}
      />
    </div>
  )
}
