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
} from '../constants'
import {
  getById,
} from '../macros'
import './App.css'

export default function App() {
  const [isSketching, setIsSketching] = useState(false)

  const [geoJson, setGeoJson] = useState(GEOJSON)
  const [isWithFilters, setIsWithFilters] = useState(false)
  const [isWithRows, setIsWithRows] = useState(false)
  const [isWithDetails, setIsWithDetails] = useState(true)
  const [history, setHistory] = useState([])
  const [overlay, setOverlay] = useState('assets')
  const [sketchingMode, setSketchingMode] = useState('select')
  const [sketchingAssetType, setSketchingAssetType] = useState()
  const [sketchingEditType, setSketchingEditType] = useState()
  const [selectedFeatureIndexes, setSelectedFeatureIndexes] = useState([])
  const [focusingAssetId, setFocusingAssetId] = useState()
  const [assetById, setAssetById] = useState(getById(ASSETS, {}))

  const _toggleIsSketching = () => {
    setIsSketching(!isSketching)
    setSketchingAssetType(undefined)
  }

  const focusingAsset = assetById[focusingAssetId]

  return (
    <div>
      <AssetsMap
        geoJson={geoJson}
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
        setIsWithFilters={setIsWithFilters}
        setIsWithRows={setIsWithRows}
        setIsWithDetails={setIsWithDetails}
      />
      <OverlaysWindow
        isSketching={isSketching}
        overlay={overlay}
        setOverlay={setOverlay}
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
