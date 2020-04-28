import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
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
import AssetDeleteDialog from './AssetDeleteDialog'
import {
  refreshRisks,
} from 'asset-report-risks'
import {
  refreshAssets,
  refreshTasks,
} from '../actions'
import {
  IS_WITH_DETAILS,
  IS_WITH_TABLES,
} from '../constants'
import './App.css'

export default function App() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const isLayoutMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [isWithDetails, setIsWithDetails] = useState(IS_WITH_DETAILS)
  const [isWithTables, setIsWithTables] = useState(IS_WITH_TABLES)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [
    isImportExportDialogOpen,
    setIsImportExportDialogOpen,
  ] = useState(false)

  /*
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
    setSelectedBusIndexes([])
    dispatch(setFocusingBusId(null))
  }
  */

  useEffect(() => {
    dispatch(refreshAssets())
    dispatch(refreshTasks())
    dispatch(refreshRisks())
  }, [dispatch])

  return (
    <div>
      <AssetsMap
        // openAssetDeleteDialog={ () => setIsDeleteDialogOpen(true) }
      />
      <SketchButtons />
      <SketchModeToolbar />
      <SketchAddToolbar />
      <ActionsWindow
        showImportExportDialog={() => setIsImportExportDialogOpen(true)}
      />
    {/*
      <OptionsWindow
        isWithDetails={isWithDetails}
        isWithTables={isWithTables}
        setIsWithDetails={setIsWithDetails}
        setIsWithTables={setIsWithTables}
      />
      <OverlaysWindow />
      <DownloadManager
        open={isImportExportDialogOpen}
        onOk={element => {
          window.location = `/assets.dss?source=${element}`
          setIsImportExportDialogOpen(false)}
        }
        onCancel={() => {setIsImportExportDialogOpen(false)}}
        onClose={()=> {setIsImportExportDialogOpen(false)}}
      />
      <DetailsWindow
        isWithDetails={isWithDetails}
        isWithTables={isWithTables}
      />
    {isWithTables && (isLayoutMobile ?
      <TablesDialog
        isWithTables={isWithTables}
        setIsWithTables={setIsWithTables}
      /> :
      <TablesWindow
        isWithTables={isWithTables}
        setIsWithTables={setIsWithTables}
      />
    )}
      { isDeleteDialogOpen &&
        <AssetDeleteDialog
          openDialog={isDeleteDialogOpen}
          onClose={ () => setIsDeleteDialogOpen(false) }
        />
      }
    */}
    </div>
  )
}
