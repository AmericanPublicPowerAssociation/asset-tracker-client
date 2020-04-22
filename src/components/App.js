import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  refreshTasks, uploadAssetsCsv,
} from '../actions'
import {
  IS_WITH_DETAILS,
  IS_WITH_TABLES,
  MINIMUM_BUS_ID_LENGTH,
  OVERLAY_MODE,
  SKETCH_MODE,
  SKETCH_MODE_ADD_LINE,
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
import Uppy from "@uppy/core";


export default function App() {
  const dispatch = useDispatch()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [sketchMode, setSketchMode] = useState(SKETCH_MODE)
  const [overlayMode, setOverlayMode] = useState(OVERLAY_MODE)
  const [isWithDetails, setIsWithDetails] = useState(IS_WITH_DETAILS)
  const [isWithTables, setIsWithTables] = useState(IS_WITH_TABLES)
  const [isImportExportOpen, setIsImportExportOpen] = useState(false)
  const [selectedAssetIndexes, setSelectedAssetIndexes] = useState([])
  const [selectedBusIndexes, setSelectedBusIndexes] = useState([])
  const [lineBusId, setLineBusId] = useState(null)
  const isScreenXS = useMediaQuery('(max-width:600px)')
  const assetById = useSelector(getAssetById)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const [uppy, setUppy] = useState(null)

  useEffect(() => setUppy(Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: false
  })), [])

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

  function mangeAssetAction(action, format, assetId, opts) {
    if (action === 'download') {
      if (format === 'dss') {
        window.location = `/assets.dss?source=${assetId}`
      }
      if (format === 'csv') {
        window.location = `/assets.csv`
      }
      setIsImportExportOpen(false)
    } else {
      if (opts.files && opts.files.length > 0) {
        dispatch(uploadAssetsCsv({
          file: opts.files[0].data,
          overwrite: opts.overwrite,
          close: () => {
            uppy.reset()
            setIsImportExportOpen(false)
          }
        }))
      }
    }
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
        onOk={mangeAssetAction}
        uppy={uppy}
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
          setSelectedBusIndexes={setSelectedBusIndexes}
        />
      }

      {
        deleteDialogOpen &&
        <DeleteAssetDialog
          openDialog={deleteDialogOpen}
          onClose={ () => setDeleteDialogOpen(false)}
          setSelectedAssetIndexes={setSelectedAssetIndexes}
        />
      }
    </div>
  )
}
