import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SketchButtons from './SketchButtons'
import SketchModeToolbar from './SketchModeToolbar'
import SketchAddToolbar from './SketchAddToolbar'
import ActionsWindow from './ActionsWindow'
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
  IS_WITH_IMPORT_EXPORT,
} from '../constants'
import {
  getIsViewing,
} from '../selectors'

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

  const dispatch = useDispatch()
  const isViewing = useSelector(getIsViewing)
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

      <AssetsMap onAssetDelete={() => setIsDeleteDialogOpen(true)} />
      <SketchModeToolbar />
      <SketchAddToolbar isWithTables={isWithTables} />
      <ActionsWindow
        isWithImportExport={isViewing}
        setIsWithImportExport={setIsWithImportExport}
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
