import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import './App.css'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(8),
    left: theme.spacing(1),
  },
  selected: {
    color: 'white',
    backgroundColor: `${theme.palette.secondary.light} !important`,
  },
}))

function SketchAssetToolbar(props) {
  const classes = useStyles()
  const {
    isSketching,
    sketchingAssetType,
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
          selected={sketchingAssetType === undefined}
          onClick={() => {
            setSketchingAssetType(undefined)
          }}
        >
          <ListItemText primary='Select' />
        </ListItem>

      </List>
    </Paper>
  )
}

export default SketchAssetToolbar
