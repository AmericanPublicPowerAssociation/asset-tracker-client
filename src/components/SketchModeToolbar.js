import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'
import SvgIcon from '@material-ui/core/SvgIcon'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  setSketchMode,
} from '../actions'
import {
  SKETCH_MODE_ADD,
  SKETCH_MODE_EDIT,
  SKETCH_MODE_DELETE,
  SKETCH_MODE_VIEW,
} from '../constants'
import {
  getSketchMode,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(6),
    left: theme.spacing(1),
  },
}))

export default function SketchModeToolbar() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const sketchMode = useSelector(getSketchMode)
  const isViewing = sketchMode === SKETCH_MODE_VIEW
  return !isViewing && (
    <Paper className={classes.root} >
      <List>
        <Tooltip title='Add' aria-label='Add' placement='right'>
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode.startsWith(SKETCH_MODE_ADD)}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD))}
          >
            <SvgIcon fontSize='large' component={AddIcon} />
          </ListItem>
        </Tooltip>

        <Tooltip title='Edit' aria-label='Edit' placement='right'>
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_EDIT}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_EDIT))}
          >
            <SvgIcon fontSize='large' component={EditIcon} />
          </ListItem>
        </Tooltip>

        <Tooltip title='Delete' aria-label='Delete' placement='right'>
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_DELETE}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_DELETE))}
          >
            <SvgIcon fontSize='large' component={DeleteIcon} />
          </ListItem>
        </Tooltip>
      </List>
    </Paper>
  )
}
