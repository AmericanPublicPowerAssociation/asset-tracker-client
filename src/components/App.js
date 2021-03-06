import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { refreshRisks } from 'asset-report-risks'
import AssetsMap from './AssetsMap'
import SketchButtons from './SketchButtons'
import OptionsWindow from './OptionsWindow'
import SketchAddToolbar from './SketchAddToolbar'
import ActionsWindow from './ActionsWindow'
import OverlaysWindow from './OverlaysWindow'
import DetailsWindow from './DetailsWindow'
import TablesWindow from './TablesWindow'
import ImportExportDialog from './ImportExportDialog'
import AssetDeleteDialog from './AssetDeleteDialog'
import MessageBar from './MessageBar'
import SignInPage from './SignInPage'
import {
  getIsUserAuthenticated,
  refreshAuth,
} from 'appa-auth-consumer'
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

const useStyles = makeStyles(theme => ({
  'bottomFixed': {
    'position': 'fixed',
    'bottom': '0',
  },
}))

export default function App() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isLayoutMobile = useMediaQuery('(max-width:599px)')
  const [isWithDetails, setIsWithDetails] = useState(IS_WITH_DETAILS)
  const [isWithTables, setIsWithTables] = useState(IS_WITH_TABLES)
  const [deletedAssetId, setDeletedAssetId] = useState(null)
  const [
    isWithImportExportDialog,
    setIsWithImportExportDialog,
  ] = useState(false)
  const isViewing = useSelector(getIsViewing)
  const isUserAuthenticated = useSelector(getIsUserAuthenticated)

  useStickyWindow(!isViewing)

  useEffect(() => {
    dispatch(refreshAuth())
    if (isUserAuthenticated) {
      dispatch(refreshAssets())
      dispatch(refreshTasks())
      dispatch(refreshRisks())
    }
  }, [dispatch, isUserAuthenticated])

  return (<IsLayoutMobileContext.Provider value={isLayoutMobile}>
      { !isUserAuthenticated ? <SignInPage /> : (
        <>
        <AssetsMap
          onAssetDelete={assetId => setDeletedAssetId(assetId)}
        />
        <OptionsWindow
          isWithDetails={isWithDetails}
          isWithTables={isWithTables}
          setIsWithDetails={setIsWithDetails}
          setIsWithTables={setIsWithTables}
        />
        {(isLayoutMobile && isWithTables) ?
          <div className={classes.bottomFixed}>
            <SketchButtons isWithTables={isWithTables}/>
            <TablesWindow
              isWithTables={isWithTables}
            />
          </div>
        :
          <TablesWindow
            isWithTables={isWithTables}
          />
        }

        {/* TODO: Review all components below */}
        <SketchAddToolbar
          isWithTables={isWithTables}
        />
        <ActionsWindow
          isWithImportExportDialog={isViewing}
          setIsWithImportExportDialog={setIsWithImportExportDialog}
        />
        <OverlaysWindow />
        {(isLayoutMobile && isWithDetails) &&
          <div className={classes.bottomFixed}>
            <SketchButtons
              isWithDetails={isWithDetails}
              isWithTables={isWithTables}
              isLayoutMobile={isLayoutMobile}
            />
            <DetailsWindow
              isWithDetails={isWithDetails}
              isWithTables={isWithTables}
            />
          </div>
        }
        {(isLayoutMobile && !isWithDetails && !isWithTables) &&
          <SketchButtons
            isWithDetails={isWithDetails}
            isWithTables={isWithTables}
            isLayoutMobile={isLayoutMobile}
          />
        }
        {!isLayoutMobile &&
          <SketchButtons />
        }
        {(!isLayoutMobile && isWithDetails) &&
          <DetailsWindow
            isWithDetails={isWithDetails}
            isWithTables={isWithTables}
          />
        }
        { isWithImportExportDialog &&
          <ImportExportDialog
            isOpen={isWithImportExportDialog}
            onCancel={() => {setIsWithImportExportDialog(false)}}
            onClose={()=> {setIsWithImportExportDialog(false)}}
          />
        }
        <AssetDeleteDialog
          deletedAssetId={deletedAssetId}
          isOpen={deletedAssetId !== null}
          onClose={() => setDeletedAssetId(null)}
        />
        {/* TODO: Review all components above */}

        <MessageBar />
        </>
      )} 
    </IsLayoutMobileContext.Provider>
  )
}
