import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { refreshRisks } from 'asset-report-risks'
import AssetsMap from './AssetsMap'
import SketchButtons from './SketchButtons'
import OptionsWindow from './OptionsWindow'
import SketchModeToolbar from './SketchModeToolbar'
import SketchAddToolbar from './SketchAddToolbar'
import ActionsWindow from './ActionsWindow'
import OverlaysWindow from './OverlaysWindow'
import DetailsWindow from './DetailsWindow'
import TablesWindow from './TablesWindow'
import ImportExportDialog from './ImportExportDialog'
import AssetDeleteDialog from './AssetDeleteDialog'
import MessageBar from './MessageBar'
import './App.css'
import {
  refreshAssets,
  refreshTasks,
} from '../actions'
import {
  IS_WITH_DETAILS,
  IS_WITH_TABLES,
} from '../constants'
import {
  IsLayoutMobileContext,
} from '../contexts'
import {
  getIsViewing,
} from '../selectors'

// TODO: Review below code
// TODO: Rename
// TODO: Consider moving to SketchButtons or somewhere else
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
// TODO: Review above code

export default function App() {
  const dispatch = useDispatch()
  const isLayoutMobile = useMediaQuery('(max-width:599px)')
  const [isWithDetails, setIsWithDetails] = useState(IS_WITH_DETAILS)
  const [isWithTables, setIsWithTables] = useState(IS_WITH_TABLES)
  const [isAssetDeleteDialogOpen, setIsAssetDeleteDialogOpen] = useState(false)
  const [
    isImportExportDialogOpen,
    setIsImportExportDialogOpen,
  ] = useState(false)

  useEffect(() => {
    dispatch(refreshAssets())
    dispatch(refreshTasks())
    dispatch(refreshRisks())
  }, [dispatch])

  // TODO: Review below code
  const isViewing = useSelector(getIsViewing)
  usePreventWindowUnload(!isViewing)
  // TODO: Review above code

  return (
    <IsLayoutMobileContext.Provider value={isLayoutMobile}>
      <AssetsMap
        onAssetDelete={() => setIsAssetDeleteDialogOpen(true)}
      />
      <SketchButtons />
      <OptionsWindow
        isWithDetails={isWithDetails}
        isWithTables={isWithTables}
        setIsWithDetails={setIsWithDetails}
        setIsWithTables={setIsWithTables}
      />
      <TablesWindow
        isWithTables={isWithTables}
      />
      {/* TODO: Review all components below */}
      <SketchModeToolbar />
      <SketchAddToolbar
        isWithTables={isWithTables}
      />
      <ActionsWindow
        isImportExportDialogOpen={isImportExportDialogOpen}
        setIsImportExportDialogOpen={setIsImportExportDialogOpen}
      />
      <OverlaysWindow />
    {isWithDetails &&
      <DetailsWindow
        isWithDetails={isWithDetails}
        isWithTables={isWithTables}
      />
    }
      <ImportExportDialog
        isOpen={isImportExportDialogOpen}
        onCancel={() => {setIsImportExportDialogOpen(false)}}
        onClose={()=> {setIsImportExportDialogOpen(false)}}
      />
      <AssetDeleteDialog
        isOpen={isAssetDeleteDialogOpen}
        onClose={() => setIsAssetDeleteDialogOpen(false)}
      />
      <MessageBar />
      {/* TODO: Review all components above */}
    </IsLayoutMobileContext.Provider>
  )
}
