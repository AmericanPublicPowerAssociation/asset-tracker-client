import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CloseButton from './CloseButton'
import './App.css'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(8),
    bottom: theme.spacing(5),
    right: theme.spacing(1),
    width: theme.spacing(30),
    padding: theme.spacing(1),
  },
}))

function DetailsWindow(props) {
  const classes = useStyles()
  const {
    isWithDetails,
    focusingAsset,
    setIsWithDetails,
  } = props
  return (
    <Paper
      className={clsx(classes.root, {
        poof: !isWithDetails,
      })}
    >
      <CloseButton onClick={() => setIsWithDetails(false)} />
    {focusingAsset ? 
      <>
        <Typography>{focusingAsset.name}</Typography>
        <Typography>{focusingAsset.type}</Typography>
      </>
      : 
      <Typography>Click an asset to see details</Typography>
    }
    </Paper>
  )
}

export default DetailsWindow
