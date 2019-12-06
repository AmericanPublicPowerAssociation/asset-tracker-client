import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
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
}))

function SketchAssetToolbar(props) {
  const classes = useStyles()
  const {
    isAddListOpen,
    isSketching,
    sketchingAssetType,
    setSketchingAssetType,
    setSelectedFeatureIndexes,
  } = props
  console.log('a', sketchingAssetType)
  console.log('s', isSketching)
  return (
    <Paper
      className={clsx(classes.root, {
        poof: !isSketching || !isAddListOpen,
      })}
    >
      <List 
        component='nav'
        subheader={
          <ListSubheader component='div'>
            {'Add Asset List'.toUpperCase()}
          </ListSubheader>
        }>
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
    </Paper>
  )
}

export default SketchAssetToolbar
