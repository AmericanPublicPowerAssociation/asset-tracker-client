import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AssetsMap from './AssetsMap'
import SketchButtons from './SketchButtons'
import SketchModeToolbar from './SketchModeToolbar'
import SketchAddToolbar from './SketchAddToolbar'
import ActionsWindow from './ActionsWindow'
import OptionsWindow from './OptionsWindow'
import OverlaysWindow from './OverlaysWindow'
import DetailsWindow from './DetailsWindow'
import TablesWindow from './TablesWindow'
import TablesDialog from './TablesDialog'
import DownloadManager from './DownloadManager'
import DeleteAssetDialog from './DeleteAssetDialog'
import {
  refreshRisks,
} from 'asset-report-risks'
import {
  addAssetConnection,
  refreshAssets,
  setFocusingBusId,
  updateAssets,
  refreshTasks,
} from '../actions'
import {
  IS_WITH_DETAILS,
  IS_WITH_TABLES,
  MINIMUM_BUS_ID_LENGTH,
  OVERLAY_MODE,
  SKETCH_MODE,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_VIEW,
} from '../constants'
import {
  getRandomId,
} from '../macros'
import {
  getSelectedAssetId,
} from '../routines'
import {
  getAssetById,
  getAssetsGeoJson,
} from '../selectors'
import './App.css'


function usePrevenWindowUnload(preventDefault) {
  useEffect( () => {
    if (!preventDefault) return
    const handleBeforeUnload = event => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [preventDefault])
}

export default function App() {
  const dispatch = useDispatch()
  const theme = useTheme()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [sketchMode, setSketchMode] = useState(SKETCH_MODE)
  const [overlayMode, setOverlayMode] = useState(OVERLAY_MODE)
  const [isWithDetails, setIsWithDetails] = useState(IS_WITH_DETAILS)
  const [isWithTables, setIsWithTables] = useState(IS_WITH_TABLES)
  const [isImportExportOpen, setIsImportExportOpen] = useState(false)
  const [selectedAssetIndexes, setSelectedAssetIndexes] = useState([])
  const [selectedBusIndexes, setSelectedBusIndexes] = useState([])
  const [lineBusId, setLineBusId] = useState(null)
  const isLayoutMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const assetById = useSelector(getAssetById)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  usePrevenWindowUnload(sketchMode !== SKETCH_MODE_VIEW)

  function changeSketchMode(newSketchMode, busId) {
    if (sketchMode === SKETCH_MODE_ADD_LINE) {
      const lineAssetId = getSelectedAssetId(selectedAssetIndexes, assetsGeoJson)
      if (lineAssetId) {
        dispatch(addAssetConnection(
          lineAssetId,
          busId || getRandomId(MINIMUM_BUS_ID_LENGTH)))
      }
    }
    setLineBusId(null)
    setSelectedAssetIndexes([])
    setSelectedBusIndexes([])
    setSketchMode(newSketchMode)
    dispatch(setFocusingBusId(null))
  }

  function saveAssets() {
    const assets = Object.values(assetById)
    dispatch(updateAssets(assets, assetsGeoJson)) 
  }

  useEffect(() => {
    dispatch(refreshAssets())
    dispatch(refreshTasks())
    dispatch(refreshRisks())
  }, [dispatch])

  return (
    <div>
      <AssetsMap
        assetById={assetById}
        sketchMode={sketchMode}
        selectedAssetIndexes={selectedAssetIndexes}
        lineBusId={lineBusId}
        changeSketchMode={changeSketchMode}
        setSelectedAssetIndexes={setSelectedAssetIndexes}
        setLineBusId={setLineBusId}
        selectedBusIndexes={selectedBusIndexes}
        setSelectedBusIndexes={setSelectedBusIndexes}
        openDeleteAssetDialog={ () => setDeleteDialogOpen(true) }
      />
      <SketchButtons
        overlayMode={overlayMode}
        sketchMode={sketchMode}
        changeSketchMode={changeSketchMode}
        saveAssets={saveAssets}
      />
      <SketchModeToolbar
        sketchMode={sketchMode}
        changeSketchMode={changeSketchMode}
      />
      <SketchAddToolbar
        sketchMode={sketchMode}
        changeSketchMode={changeSketchMode}
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
        setSelectedBusIndexes={setSelectedBusIndexes}
        setSelectedAssetIndexes={setSelectedAssetIndexes}
      />
    {isWithTables && (isLayoutMobile ?
      <TablesDialog
        isWithTables={isWithTables}
        setIsWithTables={setIsWithTables}
      /> :
      <TablesWindow
        isWithTables={isWithTables}
        setIsWithTables={setIsWithTables}
        overlayMode={overlayMode}
        setSelectedAssetIndexes={setSelectedAssetIndexes}
        setSelectedBusIndexes={setSelectedBusIndexes}
      />
    )}
      { deleteDialogOpen &&
        <DeleteAssetDialog
          openDialog={deleteDialogOpen}
          onClose={ () => setDeleteDialogOpen(false)}
          setSelectedAssetIndexes={setSelectedAssetIndexes}
        />
      }
    </div>
  )
}
