import React, { useState } from 'react'
import AssetsMap from './AssetsMap'
import SketchButton from './SketchButton'
import SketchModeToolbar from './SketchModeToolbar'
import SketchAssetToolbar from './SketchAssetToolbar'
import UsersWindow from './UsersWindow'
import OptionsWindow from './OptionsWindow'
import OverlaysWindow from './OverlaysWindow'
import FiltersWindow from './FiltersWindow'
import RowsWindow from './RowsWindow'
import DetailsWindow from './DetailsWindow'
import { ASSETS, TASKS, RISKS } from '../constants'
import { getById } from '../macros'

function App() {
  const [isAddListOpen, setIsAddListOpen] = useState(false)
  const [isSketching, setIsSketching] = useState(false)
  const [isWithFilters, setIsWithFilters] = useState(false)
  const [isWithRows, setIsWithRows] = useState(false)
  const [isWithDetails, setIsWithDetails] = useState(false)
  const [overlay, setOverlay] = useState('assets')
  const [sketchingAssetType, setSketchingAssetType] = useState()
  const [selectedFeatureIndexes, setSelectedFeatureIndexes] = useState([])
  const [focusingAssetId, setFocusingAssetId] = useState()
  const [assets, setAssets] = useState(ASSETS)

  const assetById = getById(assets, {})
  console.log('***')
  console.log(assetById)
  console.log(focusingAssetId)

  const _toggleIsSketching = () => {
    setIsSketching(!isSketching)
    setSketchingAssetType(undefined)
  }

  return (
    <div>
      <AssetsMap
        isSketching={isSketching}
        sketchingAssetType={sketchingAssetType}
        selectedFeatureIndexes={selectedFeatureIndexes}
        assets={assets}
        setIsWithDetails={setIsWithDetails}
        setAssets={setAssets}
        setSelectedFeatureIndexes={setSelectedFeatureIndexes}
        setFocusingAssetId={setFocusingAssetId}
      />
      <SketchButton
        isSketching={isSketching}
        setIsSketching={_toggleIsSketching}
      />
      <SketchModeToolbar
        isAddListOpen={isAddListOpen}
        setIsAddListOpen={setIsAddListOpen}
        isSketching={isSketching}
        sketchingAssetType={sketchingAssetType}
        setSketchingAssetType={setSketchingAssetType}
      />
      <SketchAssetToolbar
        isAddListOpen={isAddListOpen}
        isSketching={isSketching}
        sketchingAssetType={sketchingAssetType}
        setSketchingAssetType={setSketchingAssetType}
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
        assets={assets}
        tasks={TASKS}
        risks={RISKS}
        setIsWithRows={setIsWithRows}
      />
      <DetailsWindow
        isWithDetails={isWithDetails}
        focusingAsset={assetById[focusingAssetId]}
        setIsWithDetails={setIsWithDetails}
      />
    </div>
  )
}

export default App
