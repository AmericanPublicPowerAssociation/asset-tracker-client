import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import './App.css'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(30),
    left: theme.spacing(1),
  },
  selected: {
    color: 'white',
    backgroundColor: `${theme.palette.secondary.light} !important`,
  },
  nested: {
    paddingLeft: theme.spacing(1),
  },
}))

function SketchAssetToolbar(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const {
    isSketching,
    sketchingAssetType,
    setSketchingAssetType,
    setSelectedFeatureIndexes,
  } = props
  return (
    <Paper
      className={clsx(classes.root, {
        poof: !isSketching,
      })}
    >
      <List
        component='div'
        aria-labelledby="nested-list-subheader">
        <ListItem button onClick={ () => setOpen(!open)}>
          <ListItemText primary='Add'/>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={classes.nested}>
            <ListItem
              classes={{selected: classes.selected}}
              button
              selected={sketchingAssetType === 'l'}
              onClick={() => {
                if (sketchingAssetType === 'l') {
                  setSelectedFeatureIndexes([])
                }
                setSketchingAssetType('l')
              }}
            >
              <ListItemText primary='Line' />
            </ListItem>

            <ListItem
              classes={{selected: classes.selected}}
              button
              selected={sketchingAssetType === 't'}
              onClick={() => {
                setSketchingAssetType('t')
              }}
            >
              <ListItemText primary='Transformer' />
            </ListItem>

            <ListItem
              classes={{selected: classes.selected}}
              button
              selected={sketchingAssetType === 's'}
              onClick={() => {
                setSketchingAssetType('s')
              }}
            >
              <ListItemText primary='Substation' />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Paper>
  )
}

export default SketchAssetToolbar
