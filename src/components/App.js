import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AssetsMap from './AssetsMap'
import SketchButton from './SketchButton'
import SketchModeToolbar from './SketchModeToolbar'
import SketchAddToolbar from './SketchAddToolbar'
import SketchEditToolbar from './SketchEditToolbar'
import ActionsWindow from './ActionsWindow'
import OptionsWindow from './OptionsWindow'
import OverlaysWindow from './OverlaysWindow'
import DetailsWindow from './DetailsWindow'
import TablesWindow from './TablesWindow'
import TablesDialog from './TablesDialog'
import DownloadManager from './DownloadManager'
import {
  refreshRisks,
} from 'asset-report-risks'
import {
  refreshAssets,
  updateAssets,
} from '../actions'
import {
  IS_WITH_DETAILS,
  IS_WITH_TABLES,
  OVERLAY_MODE,
  SKETCH_MODE,
} from '../constants'
import {
  getAssetById,
  getAssetsGeoJson,
} from '../selectors'
import './App.css'


export default function App() {
  const dispatch = useDispatch()
  const [sketchMode, setSketchMode] = useState(SKETCH_MODE)
  const [overlayMode, setOverlayMode] = useState(OVERLAY_MODE)
  const [isWithDetails, setIsWithDetails] = useState(IS_WITH_DETAILS)
  const [isWithTables, setIsWithTables] = useState(IS_WITH_TABLES)
  const [isImportExportOpen, setIsImportExportOpen] = useState(false)
  const [selectedAssetIndexes, setSelectedAssetIndexes] = useState([])
  const [lineBusId, setLineBusId] = useState(null)
  const isScreenXS = useMediaQuery('(max-width:600px)')
  const assetById = useSelector(getAssetById)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
    
  function startNewLine() {
    setLineBusId(null)
    setSelectedAssetIndexes([])
  }

  function saveAssets() {
    const assets = Object.values(assetById)
    dispatch(updateAssets(assets, assetsGeoJson)) 
  }
  
  useEffect(() => {
    dispatch(refreshAssets())
    dispatch(refreshRisks())
  }, [dispatch])

  return (
    <div>
      <AssetsMap
        sketchMode={sketchMode}
        selectedAssetIndexes={selectedAssetIndexes}
        lineBusId={lineBusId}
        setSketchMode={setSketchMode}
        setSelectedAssetIndexes={setSelectedAssetIndexes}
        setLineBusId={setLineBusId}
        onAddLineEnd={startNewLine}
      />
      <SketchButton
        overlayMode={overlayMode}
        sketchMode={sketchMode}
        setSketchMode={setSketchMode}
        saveAssets={saveAssets}
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
      <ActionsWindow
        showImportExport={() => setIsImportExportOpen(true)}
      />
      <OptionsWindow
        isWithDetails={isWithDetails}
        isWithTables={isWithTables}
        setIsWithDetails={setIsWithDetails}
        setIsWithTables={setIsWithTables}
      />
      <OverlaysWindow
        sketchMode={sketchMode}
        overlayMode={overlayMode}
        setOverlayMode={setOverlayMode}
      />
      <DownloadManager
        open={isImportExportOpen}
        onOk={element => {
          window.location = `/assets.dss?source=${element}`
          setIsImportExportOpen(false)}
        }
        onCancel={() => {setIsImportExportOpen(false)}}
        onClose={()=> {setIsImportExportOpen(false)}}
      />
      <DetailsWindow
        isWithDetails={isWithDetails}
        isWithTables={isWithTables}
        overlayMode={overlayMode}
        sketchMode={sketchMode}
      />
      { isScreenXS && isWithTables && 
        <TablesDialog
          isWithTables={isWithTables}
          setIsWithTables={setIsWithTables}
        /> 
      }
      { !isScreenXS &&
        isWithTables &&
        <TablesWindow
          isWithTables={isWithTables}
          setIsWithTables={setIsWithTables}
          overlayMode={overlayMode}
          setSelectedAssetIndexes={setSelectedAssetIndexes}
        />
      }
    </div>
  )
}
