// TODO: Have a single useMediaQuery in App and decide mobile vs desktop components at App level

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
import ImportExportDialog from './ImportExportDialog'
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
  IS_WITH_IMPORT_EXPORT,
} from '../constants'
import {
  getIsViewing,
} from '../selectors'
import './App.css'

// TODO: Rename
// TODO: Consider moving to SketchButtons
function usePreventWindowUnload(preventDefault) {
  useEffect( () => {
    if (!preventDefault) return
    const handleBeforeUnload = event => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [preventDefault])
}

export default function App() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const isViewing = useSelector(getIsViewing)
  const isLayoutMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [isWithDetails, setIsWithDetails] = useState(IS_WITH_DETAILS)
  const [isWithTables, setIsWithTables] = useState(IS_WITH_TABLES)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [
    isWithImportExport,
    setIsWithImportExport,
  ] = useState(IS_WITH_IMPORT_EXPORT)

  usePreventWindowUnload(!isViewing)

  useEffect(() => {
    dispatch(refreshAssets())
    dispatch(refreshTasks())
    dispatch(refreshRisks())
  }, [dispatch])
  return (
    <div style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
      <AssetsMap openDeleteDialogOpen={() => setIsDeleteDialogOpen(true)} />
      <SketchButtons />
      <SketchModeToolbar />
      <SketchAddToolbar />
      <ActionsWindow
        isWithImportExport={isViewing}
        setIsWithImportExport={setIsWithImportExport}
      />
      <OptionsWindow
        isWithDetails={isWithDetails}
        isWithTables={isWithTables}
        setIsWithDetails={setIsWithDetails}
        setIsWithTables={setIsWithTables}
      />
      <OverlaysWindow />
    {isWithDetails &&
      <DetailsWindow
        isWithDetails={isWithDetails}
        isWithTables={isWithTables}
      />
    }
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
      <ImportExportDialog
        open={isWithImportExport}
        onCancel={() => {setIsWithImportExport(false)}}
        onClose={()=> {setIsWithImportExport(false)}}
      />
    {/*
      <ImportExportDialog
        onOk={element => {
          window.location = `/assets.dss?source=${element}`
          setIsImportExportDialogOpen(false)}
        }
      />
    */}
    { isDeleteDialogOpen &&
      <AssetDeleteDialog
        openDialog={isDeleteDialogOpen}
        onClose={ () => setIsDeleteDialogOpen(false) }
      />
    }
    </div>
  )
}
