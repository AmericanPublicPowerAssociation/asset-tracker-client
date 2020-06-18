import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  refreshRisks,
} from 'asset-report-risks'
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
  IS_WITH_IMPORT_EXPORT,
  IS_WITH_TABLES,
} from '../constants'
import {
  IsLayoutMobileContext,
} from '../contexts'
import {
  getIsViewing,
} from '../selectors'

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

export default function App() {
  const isLayoutMobile = useMediaQuery('(max-width:599px)')
  const [isWithDetails, setIsWithDetails] = useState(IS_WITH_DETAILS)
  const [isWithTables, setIsWithTables] = useState(IS_WITH_TABLES)
  const [isAssetDeleteDialogOpen, setIsAssetDeleteDialogOpen] = useState(false)

  // TODO: Review all code below

  const dispatch = useDispatch()
  const isViewing = useSelector(getIsViewing)
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

  // TODO: Review all code above
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
      {/* TODO: Review all components below */}
      <SketchModeToolbar />
      <SketchAddToolbar isWithTables={isWithTables} />
      <ActionsWindow
        isWithImportExport={isViewing}
        setIsWithImportExport={setIsWithImportExport}
      />
      <OverlaysWindow />
      <ImportExportDialog
        isOpen={isWithImportExport}
        onCancel={() => {setIsWithImportExport(false)}}
        onClose={()=> {setIsWithImportExport(false)}}
      />
      <AssetDeleteDialog
        isOpen={isAssetDeleteDialogOpen}
        onClose={() => setIsAssetDeleteDialogOpen(false)}
      />
      <MessageBar />
    {isWithTables &&
      <TablesWindow
        isWithTables={isWithTables}
        setIsWithTables={setIsWithTables}
      />
    }
    {isWithDetails &&
      <DetailsWindow
        isWithDetails={isWithDetails}
        isWithTables={isWithTables}
      />
    }
      {/* TODO: Review all components above */}
    </IsLayoutMobileContext.Provider>
  )
}
