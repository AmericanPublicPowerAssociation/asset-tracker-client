import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'
import SvgIcon from '@material-ui/core/SvgIcon'
import AddIcon from '@material-ui/icons/Add'
import OpenWithIcon from '@material-ui/icons/OpenWith'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import {
  setSketchMode,
} from '../actions'
import {
  SKETCH_MODE_EDIT,
  SKETCH_MODE_EDIT_VERTEX_ADD,
  SKETCH_MODE_EDIT_VERTEX_MOVE,
  SKETCH_MODE_EDIT_VERTEX_REMOVE,
  // SKETCH_MODE_EDIT_VERTEX_SPLIT_LINE,
} from '../constants'
import {
  getSketchMode,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(28.5),
    left: theme.spacing(1),
    textAlign: 'center',
  },
  list: {
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 280px)',
  },
  withTables: {
    maxHeight: 'calc(100vh - 556px)',
  },
}))

const LIST_ITEM_CLASSES = { selected: 'selected' }

export default function SketchEditToolbar({
  isWithTables,
}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const sketchMode = useSelector(getSketchMode)
  const isEditing= sketchMode.startsWith(SKETCH_MODE_EDIT)
  return isEditing &&(
    <Paper className={classes.root}>
      <List className={clsx(classes.list, {
        [classes.withTables]: isWithTables,
      })}
        aria-labelledby='nested-list-subheader'
        subheader={
          <Typography variant='caption'>Edit Vertex</Typography>
        }>
        <Tooltip
          title='Move Vertex'
          aria-label='Move Vertex'
          placement='right'
        >
          <ListItem
            button
            classes={LIST_ITEM_CLASSES}
            selected={sketchMode === SKETCH_MODE_EDIT_VERTEX_MOVE}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_EDIT_VERTEX_MOVE))}
          >
            <SvgIcon fontSize='large' component={OpenWithIcon} />
          </ListItem>
        </Tooltip>
        <Tooltip
          title='Add/Move Vertex'
          aria-label='Add/Move Vertex'
          placement='right'
        >
          <ListItem
            button
            classes={LIST_ITEM_CLASSES}
            selected={sketchMode === SKETCH_MODE_EDIT_VERTEX_ADD}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_EDIT_VERTEX_ADD))}
          >
            <SvgIcon fontSize='large' component={AddIcon} />
          </ListItem>
        </Tooltip>
        <Tooltip
          title='Remove/Move/Add Vertex'
          aria-label='Remove/Move/Add Vertex'
          placement='right'
        >
          <ListItem
            button
            classes={LIST_ITEM_CLASSES}
            selected={sketchMode === SKETCH_MODE_EDIT_VERTEX_REMOVE}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_EDIT_VERTEX_REMOVE))}
          >
            <SvgIcon fontSize='large' component={DeleteIcon} />
          </ListItem>
        </Tooltip>
        { /*
        <Tooltip
          title='Split Line'
          aria-label='Split Line'
          placement='right'
        >
          <ListItem
            button
            classes={LIST_ITEM_CLASSES}
            selected={sketchMode === SKETCH_MODE_EDIT_VERTEX_SPLIT_LINE}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_EDIT_VERTEX_SPLIT_LINE))}
          >
            <SvgIcon fontSize='large' component={EditIcon} />
          </ListItem>
        </Tooltip> */
        }
      </List>
    </Paper>
  )
}
