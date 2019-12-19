import React, { useState } from 'react'
import AssetsMap from './AssetsMap'
import SketchButton from './SketchButton'
import SketchModeToolbar from './SketchModeToolbar'
import SketchAssetToolbar from './SketchAssetToolbar'
import SketchEditToolbar from './SketchEditToolbar'
import UsersWindow from './UsersWindow'
import OptionsWindow from './OptionsWindow'
import OverlaysWindow from './OverlaysWindow'
import FiltersWindow from './FiltersWindow'
import RowsWindow from './RowsWindow'
import DetailsWindow from './DetailsWindow'
import HintsWindow from './HintsWindow'
import {
  ASSETS,
  GEOJSON,
  TASKS,
  RISKS,
  BASE_MAP_STYLE_NAME,
} from '../constants'
import {
  getById,
} from '../macros'

export default function App() {
  const [isSketching, setIsSketching] = useState(false)

  const [geoJson, setGeoJson] = useState(GEOJSON)
  const [isWithFilters, setIsWithFilters] = useState(false)
  const [isWithRows, setIsWithRows] = useState(false)
  const [isWithDetails, setIsWithDetails] = useState(true)
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [overlay, setOverlay] = useState('assets')
  const [sketchingMode, setSketchingMode] = useState('select')
  const [sketchingAssetType, setSketchingAssetType] = useState()
  const [sketchingEditType, setSketchingEditType] = useState()
  const [selectedFeatureIndexes, setSelectedFeatureIndexes] = useState([])
  const [focusingAssetId, setFocusingAssetId] = useState()
  const [assetById, setAssetById] = useState(getById(ASSETS, {}))
  const [mapStyle, setMapStyle] = useState(BASE_MAP_STYLE_NAME)

  const _toggleIsSketching = () => {
    setIsSketching(!isSketching)
    setSketchingAssetType(undefined)
    setHistory([])
  }

  const _undo = () => {
    const {
      geoJson,
      assetById,
    } = history[historyIndex]
    setGeoJson(geoJson)
    setHistoryIndex(historyIndex-1)
    setAssetById(assetById)
    setFocusingAssetId(undefined)
  }

  const focusingAsset = focusingAssetId ? assetById[focusingAssetId] : undefined

  return (
    <div>
      <AssetsMap
        geoJson={geoJson}
        historyIndex={historyIndex}
        setHistoryIndex={setHistoryIndex}
        setHistory={setHistory}
        isSketching={isSketching}
        sketchingMode={sketchingMode}
        sketchingAssetType={sketchingAssetType}
        sketchingEditType={sketchingEditType}
        selectedFeatureIndexes={selectedFeatureIndexes}
        assetById={assetById}
        setGeoJson={setGeoJson}
        setIsWithDetails={setIsWithDetails}
        setAssetById={setAssetById}
        setSelectedFeatureIndexes={setSelectedFeatureIndexes}
        setFocusingAssetId={setFocusingAssetId}
        history={history}
      />
      <SketchButton
        isSketching={isSketching}
        setIsSketching={_toggleIsSketching}
      />
      <SketchModeToolbar
        isSketching={isSketching}
        sketchingMode={sketchingMode}
        focusingAsset={focusingAsset}
        setSketchingMode={setSketchingMode}
        setSketchingAssetType={setSketchingAssetType}
      />
      <SketchAssetToolbar
        isSketching={isSketching}
        sketchingMode={sketchingMode}
        sketchingAssetType={sketchingAssetType}
        setSketchingAssetType={setSketchingAssetType}
        setSelectedFeatureIndexes={setSelectedFeatureIndexes}
      />
      <SketchEditToolbar
        isSketching={isSketching}
        sketchingMode={sketchingMode}
        sketchingEditType={sketchingEditType}
        setSketchingEditType={setSketchingEditType}
        setSelectedFeatureIndexes={setSelectedFeatureIndexes}
      />
      <UsersWindow />
      <OptionsWindow
        isSketching={isSketching}
        isWithFilters={isWithFilters}
        isWithRows={isWithRows}
        isWithDetails={isWithDetails}
        mapStyle={mapStyle}
        history={history}
        historyIndex={historyIndex}
        setIsWithFilters={setIsWithFilters}
        setIsWithRows={setIsWithRows}
        setIsWithDetails={setIsWithDetails}
        setMapStyle={setMapStyle}
        setHistoryIndex={setHistoryIndex}
        setHistory={setHistory}
        undo={_undo}
      />
      <OverlaysWindow
        isSketching={isSketching}
        overlay={overlay}
        setOverlay={setOverlay}
        mapStyle={mapStyle}
      />
      <FiltersWindow
        isSketching={isSketching}
        isWithFilters={isWithFilters}
        setIsWithFilters={setIsWithFilters}
      />
      <RowsWindow
        isSketching={isSketching}
        isWithRows={isWithRows}
        overlay={overlay}
        assetById={assetById}
        tasks={TASKS}
        risks={RISKS}
        setIsWithRows={setIsWithRows}
      />
      <DetailsWindow
        geoJson={geoJson}
        setGeoJson={setGeoJson}
        selectedFeatureIndexes={selectedFeatureIndexes}
        setFocusingAssetId={setFocusingAssetId}
        setSelectedFeatureIndexes={setSelectedFeatureIndexes}
        isWithDetails={isWithDetails}
        focusingAsset={focusingAsset}
        assetById={assetById}
        setIsWithDetails={setIsWithDetails}
        setAssetById={setAssetById}
      />

      <HintsWindow
        isSketching={isSketching}
        sketchingMode={sketchingMode}
        sketchingAssetType={sketchingAssetType}
        selectedFeatureIndexes={selectedFeatureIndexes}
      />
    </div>
  )
}
