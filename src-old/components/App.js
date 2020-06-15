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
import ImportExportDialog from './ImportExportDialog'
import AssetDeleteDialog from './AssetDeleteDialog'
import MessageBar from './MessageBar'
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
  IsLayoutMobileContext,
} from '../contexts'
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
  const isLayoutMobile = useMediaQuery(theme.breakpoints.down('xs'))
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
    <IsLayoutMobileContext.Provider value={isLayoutMobile}>
      <AssetsMap onAssetDelete={() => setIsDeleteDialogOpen(true)} />
      <SketchButtons />
      <SketchModeToolbar />
      <SketchAddToolbar isWithTables={isWithTables} />
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
      <ImportExportDialog
        isOpen={isWithImportExport}
        onCancel={() => {setIsWithImportExport(false)}}
        onClose={()=> {setIsWithImportExport(false)}}
      />
      <AssetDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
      <MessageBar />
    {isWithTables &&
      <TablesWindow
        isWithTables={isWithTables}
        setIsWithTables={setIsWithTables}
      />
    }
    </IsLayoutMobileContext.Provider>
  )
}
