import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'
import SvgIcon from '@material-ui/core/SvgIcon'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import {default as ConnectIcon} from '@material-ui/icons/AccountTree'
import {default as SelectIcon} from '@material-ui/icons/TouchApp'
import {
  SELECT_GEOMETRY
} from '../constants'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(6),
    left: theme.spacing(1),
  },
}))

export default function SketchModeToolbar(props) {
  const classes = useStyles()
  const {
    sketchMode,
    setSketchMode,
  } = props
  const isViewing = sketchMode === 'view'
  return (
    <Paper
      className={clsx(classes.root, {
        poof: isViewing,
      })}
    >
      <List>
        <Tooltip title='Select' aria-label='select' placement='right'>
          <ListItem
            button
            classes={{selected: 'selected'}}
            selected={sketchMode.startsWith('select')}
            onClick={() => setSketchMode(SELECT_GEOMETRY)}
          >
            <SvgIcon fontSize='large' component={SelectIcon} />
          </ListItem>
        </Tooltip>

        <Tooltip title='Add' aria-label='Add' placement='right'>
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode.startsWith('add')}
            onClick={() => setSketchMode('add')}
          >
            <SvgIcon fontSize='large' component={AddIcon} />
          </ListItem>
        </Tooltip>

        <Tooltip title='Edit' aria-label='Edit' placement='right'>
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode.startsWith('edit')}
            onClick={() => setSketchMode('edit')}
          >
            <SvgIcon fontSize='large' component={EditIcon} />
          </ListItem>
        </Tooltip>

        <Tooltip title='Connect' aria-label='Connect' placement='right'>
          <ListItem
            button
            classes={{selected: 'selected'}}
            selected={sketchMode.startsWith('connect')}
            onClick={() => setSketchMode('connect')}
          >
            <SvgIcon fontSize='large' component={ConnectIcon} />
          </ListItem>
        </Tooltip>
      </List>
    </Paper>
  )
}
