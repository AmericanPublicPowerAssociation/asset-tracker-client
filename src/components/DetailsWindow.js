import React from 'react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {
  ProductName,
  ProductVersion,
  VendorName,
} from 'asset-report-risks'
import {
  getFocusingAsset,
} from '../selectors'
import {
  mergeAsset,
  changeAsset,
} from '../actions'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(6),
    right: theme.spacing(1),
    maxWidth: theme.spacing(32),
    padding: theme.spacing(1),
  },
}))

export default function DetailsWindow(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    isWithDetails,
  } = props
  const focusingAsset = useSelector(getFocusingAsset)
  const detailsPanel = focusingAsset ?
    AssetDetailsPanel(focusingAsset, dispatch) :
    EmptyDetailsPanel()
  return (
    <Paper className={clsx(classes.root, {poof: !isWithDetails})}>
      {detailsPanel}
    </Paper>
  )
}

function AssetDetailsPanel(asset, dispatch) {
  const id = asset.id || null
  const typeId = asset.typeId
  const vendorName = asset.vendorName || null

  const _trackChanges = (attributes) => {
    dispatch(mergeAsset({id, ...attributes}))
  }
  
  const _saveChanges = (attributes) => {
    dispatch(changeAsset({id, ...attributes}))
  }

  
  return (
    <>
      <Typography>
        {asset.id}
      </Typography>
      <VendorName
        typeId={typeId}
        vendorName={vendorName}
        trackChanges={_trackChanges}
        saveChanges={_saveChanges}
      />
    </>
  )
}

function EmptyDetailsPanel() {
  return (
    <Typography>
      Select an asset to see its details
    </Typography>
  )
}
