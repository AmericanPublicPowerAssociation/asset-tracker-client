import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import SvgIcon from '@material-ui/core/SvgIcon'
import Tooltip from '@material-ui/core/Tooltip'
import ModifyIcon from '@material-ui/icons/Edit'
import MoveIcon from '@material-ui/icons/OpenWith'
import {
  SKETCH_MODE_EDIT_MODIFY,
  SKETCH_MODE_EDIT_TRANSLATE,
} from '../constants'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(22),
    left: theme.spacing(1),
  },
}))

export default function SketchEditToolbar(props) {
  const classes = useStyles()
  const {
    sketchMode,
    changeSketchMode,
  } = props
  const isEditing = sketchMode.startsWith('edit')
  return (
    <Paper
      className={clsx(classes.root, {
        poof: !isEditing,
      })}
    >
      <List>
        <Tooltip title='Modify' aria-label='Modify' placement='right'>
          <ListItem
            button
            classes={{selected: 'selected'}}
            selected={sketchMode === SKETCH_MODE_EDIT_MODIFY}
            onClick={() => changeSketchMode(SKETCH_MODE_EDIT_MODIFY)}
          >
            <SvgIcon fontSize='large' component={ModifyIcon} />
          </ListItem>
        </Tooltip>

        <Tooltip title='Move' aria-label='Move' placement='right'>
          <ListItem
            button
            classes={{selected: 'selected'}}
            selected={sketchMode === SKETCH_MODE_EDIT_TRANSLATE}
            onClick={() => changeSketchMode(SKETCH_MODE_EDIT_TRANSLATE)}
          >
            <SvgIcon fontSize='large' component={MoveIcon} />
          </ListItem>
        </Tooltip>
      </List>
    </Paper>
  )
}
