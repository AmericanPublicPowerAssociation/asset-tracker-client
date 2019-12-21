import React from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {
  getFocusingAsset,
} from '../selectors'

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
  const {
    isWithDetails,
  } = props
  const focusingAsset = useSelector(getFocusingAsset)
  const detailsPanel = focusingAsset ?
    AssetDetailsPanel() :
    EmptyDetailsPanel()
  return (
    <Paper className={clsx(classes.root, {poof: !isWithDetails})}>
      {detailsPanel}
    </Paper>
  )
}

function EmptyDetailsPanel() {
  return (
    <Typography>
      Select an asset to see details
    </Typography>
  )
}

function AssetDetailsPanel(props) {
  return (
    'hey'
  )
}
