import React from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import AssetDetailsPanel from './AssetDetailsPanel'
import EmptyDetailsPanel from './EmptyDetailsPanel'
import {
  getFocusingAsset,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(6),
    right: theme.spacing(1),
    width: theme.spacing(30),
    bottom: theme.spacing(5),
    padding: theme.spacing(1),
    overflowY: 'auto',
  },
}))

export default function DetailsWindow(props) {
  const classes = useStyles()
  const {
    isWithDetails,
    sketchMode,
  } = props
  const focusingAsset = useSelector(getFocusingAsset)
  const detailsPanel = focusingAsset ?
    <AssetDetailsPanel
      asset={focusingAsset}
      sketchMode={sketchMode}
    /> :
    <EmptyDetailsPanel />
  return (
    <Paper className={clsx(classes.root, {poof: !isWithDetails})}>
      {detailsPanel}
    </Paper>
  )
}
