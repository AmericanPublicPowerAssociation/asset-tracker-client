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
import {
  SKETCH_MODE_ADD,
  SKETCH_MODE_EDIT,
  SKETCH_MODE_VIEW,
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
    changeSketchMode,
  } = props
  const isViewing = sketchMode === SKETCH_MODE_VIEW
  return (
    <Paper
      className={clsx(classes.root, {
        poof: isViewing,
      })}
    >
      <List>
        <Tooltip title='Add' aria-label='Add' placement='right'>
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode.startsWith(SKETCH_MODE_ADD)}
            onClick={() => changeSketchMode(SKETCH_MODE_ADD)}
          >
            <SvgIcon fontSize='large' component={AddIcon} />
          </ListItem>
        </Tooltip>

        <Tooltip title='Edit' aria-label='Edit' placement='right'>
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode.startsWith(SKETCH_MODE_EDIT)}
            onClick={() => changeSketchMode(SKETCH_MODE_EDIT)}
          >
            <SvgIcon fontSize='large' component={EditIcon} />
          </ListItem>
        </Tooltip>
      </List>
    </Paper>
  )
}
