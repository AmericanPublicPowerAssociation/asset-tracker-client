import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {
  SKETCHING_MODE_ADD,
  SKETCHING_MODE_CONNECT,
  SKETCHING_MODE_SELECT,
} from '../constants'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(15),
    left: theme.spacing(1),
  },
  selected: {
    color: 'white',
    backgroundColor: `${theme.palette.secondary.light} !important`,
  },
}))

function SketchModeToolbar(props) {
  const classes = useStyles()
  const {
    isSketching,
    sketchingMode,
    focusingAsset,
    setSketchingMode,
    setSketchingAssetType,
  } = props
  return (
    <Paper
      className={clsx(classes.root, {
        poof: !isSketching,
      })}
    >
      <List>

        <ListItem
          classes={{selected: classes.selected}}
          button
          selected={sketchingMode === SKETCHING_MODE_SELECT}
          onClick={() => {
            setSketchingMode(SKETCHING_MODE_SELECT)
          }}
        >
          <ListItemText primary='Select' />
        </ListItem>

        <ListItem
          classes={{selected: classes.selected}}
          button
          selected={sketchingMode === SKETCHING_MODE_ADD}
          onClick={() => {
            setSketchingMode(SKETCHING_MODE_ADD)
            setSketchingAssetType(undefined)
          }}
        >
          <ListItemText primary='Add' />
        </ListItem>

        <ListItem
          classes={{selected: classes.selected}}
          button
          selected={sketchingMode === SKETCHING_MODE_CONNECT}
          // disabled={!focusingAsset || focusingAsset.type !== 'b'}
          onClick={() => {
            setSketchingMode(SKETCHING_MODE_CONNECT)
          }}
        >
          <ListItemText primary='Connect' />
        </ListItem>

      </List>
    </Paper>
  )
}

export default SketchModeToolbar
