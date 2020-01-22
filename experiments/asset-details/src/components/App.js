import React, { useState, useEffect } from 'react'
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
import CenterBottomWindow from './CenterBottomWindow'
import {
  ASSETS,
  GEOJSON,
  TASKS,
  RISKS,
  DARK_MAP_STYLE,
  STREETS_MAP_STYLE,
  SATELLITE_STREETS_MAP_STYLE,
  BASE_MAP_STYLE_NAME, SPEC,
} from '../constants'
import {
  getById,
} from '../macros'
import './App.css'

const baseMapStyleTypes = {
  dark: {
    style: DARK_MAP_STYLE,
    nextStyleName: 'streets',
  },
  streets: {
    style: STREETS_MAP_STYLE,
    nextStyleName: 'satelliteStreets',
  },
  satelliteStreets: {
    style: SATELLITE_STREETS_MAP_STYLE,
    nextStyleName: 'dark',
  }
}


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
  const [spec, setSpec] = useState({})
  const [mapStyle, setMapStyle] = useState(BASE_MAP_STYLE_NAME)

  /*
  useEffect(() => {
     fetch('/assets.json').then(async (res) => {
      let data = await res.json()
      // request spect and sync with local
      // console.log(data)
      // setSpec(data.spec);
      // Update assets from the server
      setAssetById(getById(data.assets, {}));
    });
  }, [])
 */

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
        spec={spec}
        setGeoJson={setGeoJson}
        setIsWithDetails={setIsWithDetails}
        setAssetById={setAssetById}
        setSelectedFeatureIndexes={setSelectedFeatureIndexes}
        setFocusingAssetId={setFocusingAssetId}
        mapStyle={baseMapStyleTypes[mapStyle]['style']}
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
      <UsersWindow />
      <OptionsWindow
        isSketching={isSketching}
        isWithFilters={isWithFilters}
        isWithRows={isWithRows}
        isWithDetails={isWithDetails}
        mapStyle={mapStyle}
        history={history}
        historyIndex={historyIndex}
        nextMapStyle={baseMapStyleTypes[mapStyle]['nextStyleName']}
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
