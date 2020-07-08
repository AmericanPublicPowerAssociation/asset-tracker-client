import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { refreshRisks } from 'asset-report-risks'
import AssetsMap from './AssetsMap'
import SketchButtons from './SketchButtons'
import OptionsWindow from './OptionsWindow'
import SketchModeToolbar from './SketchModeToolbar'
import SketchEditToolbar from './SketchEditToolbar'
import SketchAddToolbar from './SketchAddToolbar'
import ActionsWindow from './ActionsWindow'
import OverlaysWindow from './OverlaysWindow'
import DetailsWindow from './DetailsWindow'
import TablesWindow from './TablesWindow'
import ImportExportDialog from './ImportExportDialog'
import AssetDeleteDialog from './AssetDeleteDialog'
import MessageBar from './MessageBar'
import AssetVertexDeleteSnackbar from './AssetVertexDeleteSnackbar'
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
  useStickyWindow,
} from '../hooks'
import {
  getIsViewing,
} from '../selectors'

export default function App() {
  const dispatch = useDispatch()
  const isLayoutMobile = useMediaQuery('(max-width:599px)')
  const [isWithDetails, setIsWithDetails] = useState(IS_WITH_DETAILS)
  const [isWithTables, setIsWithTables] = useState(IS_WITH_TABLES)
  const [deletedAssetId, setDeletedAssetId] = useState(null)
  const [deleteAssetVertexObj, setDeleteAssetVertexObj] = useState(null)
  const [
    isImportExportDialogOpen,
    setIsImportExportDialogOpen,
  ] = useState(false)
  const isViewing = useSelector(getIsViewing)

  useStickyWindow(!isViewing)

  useEffect(() => {
    dispatch(refreshAssets())
    dispatch(refreshTasks())
    dispatch(refreshRisks())
  }, [dispatch])

  return (
    <IsLayoutMobileContext.Provider value={isLayoutMobile}>
      <AssetsMap
        onAssetDelete={assetId => setDeletedAssetId(assetId)}
        onAssetVertexDelete={deleteParams => setDeleteAssetVertexObj(deleteParams) }
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
      <SketchEditToolbar
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
        deletedAssetId={deletedAssetId}
        isOpen={deletedAssetId !== null}
        onClose={() => setDeletedAssetId(null)}
      />
      <AssetVertexDeleteSnackbar
        deleteAssetVertexObj={deleteAssetVertexObj}
        isOpen={deleteAssetVertexObj !== null}
        hideMessage={() => setDeleteAssetVertexObj(null)}
      />
      {/* TODO: Review all components above */}

      <MessageBar />
    </IsLayoutMobileContext.Provider>
  )
}
