import React, { useState } from 'react'
import AssetsMap from './AssetsMap'
// import AssetsTable from './AssetsTable'
import SketchButton from './SketchButton'
import SketchToolbar from './SketchToolbar'
import UsersWindow from './UsersWindow'
import OptionsWindow from './OptionsWindow'
import DetailsWindow from './DetailsWindow'

function App() {
  const [isSketching, setIsSketching] = useState(false)
  const [isWithFilters, setIsWithFilters] = useState(false)
  const [isWithRows, setIsWithRows] = useState(false)
  const [isWithDetails, setIsWithDetails] = useState(false)
  const [sketchAssetType, setSketchAssetType] = useState('l')
  const [assets, setAssets] = useState([])
  return (
    <div>
      <AssetsMap
        isSketching={isSketching}
        setAssets={setAssets}
      />
    {/*
      <AssetsTable
        assets={assets}
      />
    */}
      <SketchButton
        isSketching={isSketching}
        setIsSketching={setIsSketching}
      />
      <SketchToolbar
        isSketching={isSketching}
        sketchAssetType={sketchAssetType}
        setSketchAssetType={setSketchAssetType}
      />
      <UsersWindow />
      <OptionsWindow
        isWithFilters={isWithFilters}
        isWithRows={isWithRows}
        isWithDetails={isWithDetails}
        setIsWithFilters={setIsWithFilters}
        setIsWithRows={setIsWithRows}
        setIsWithDetails={setIsWithDetails}
      />
      <DetailsWindow
        isWithDetails={isWithDetails}
        setIsWithDetails={setIsWithDetails}
      />
    </div>
  )
}

export default App
