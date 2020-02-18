import React, { useState, useEffect } from 'react'
import AssetsMap from './AssetsMap'
import SketchButton from './SketchButton'
import SketchModeToolbar from './SketchModeToolbar'
import SketchAssetToolbar from './SketchAssetToolbar'
import SketchEditToolbar from './SketchEditToolbar'
import OptionsWindow from './OptionsWindow'
import OverlaysWindow from './OverlaysWindow'
import FiltersWindow from './FiltersWindow'
import RowsWindow from './RowsWindow'
import DetailsWindow from './DetailsWindow'
import HintsWindow from './HintsWindow'
import CenterBottomWindow from './CenterBottomWindow'

export default function App() {
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [spec, setSpec] = useState({})

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
        historyIndex={historyIndex}
        setHistoryIndex={setHistoryIndex}
        setHistory={setHistory}
        isSketching={isSketching}
        sketchingMode={sketchingMode}
        sketchingAssetType={sketchingAssetType}
        sketchingEditType={sketchingEditType}
        selectedFeatureIndexes={selectedFeatureIndexes}
        assetById={assetById}
        spec={spec}
        setGeoJson={setGeoJson}
        setAssetById={setAssetById}
        setSelectedFeatureIndexes={setSelectedFeatureIndexes}
        setFocusingAssetId={setFocusingAssetId}
        history={history}
      />
      <CenterBottomWindow
        sketchingMode={sketchingMode}
        sketchingAssetType={sketchingAssetType}
        selectedFeatureIndexes={selectedFeatureIndexes}
        setSelectedFeatureIndexes={setSelectedFeatureIndexes} 
        features={geoJson.features}
        historyIndex={historyIndex}
        isSketching={isSketching}
        undo={_undo}
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
