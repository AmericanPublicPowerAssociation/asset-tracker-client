import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import SvgIcon from '@material-ui/core/SvgIcon'
import Tooltip from '@material-ui/core/Tooltip'
import ModifyIcon from '@material-ui/icons/Edit'
import TranslateIcon from '@material-ui/icons/OpenWith'
import {
  EDIT_MODIFY,
  EDIT_TRANSLATE,
} from '../constants'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(28),
    left: theme.spacing(1),
  },
}))

export default function SketchEditToolbar(props) {
  const classes = useStyles()
  const {
    sketchMode,
    setSketchMode,
  } = props
  const isEditing = sketchMode.startsWith('edit')

  const _onClick = (newSketchMode) => {
    setSketchMode(newSketchMode)
  }

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
            selected={sketchMode === EDIT_MODIFY}
            onClick={() => _onClick(EDIT_MODIFY)}
          >
            <SvgIcon fontSize='large' component={ModifyIcon} />
          </ListItem>
        </Tooltip>

        <Tooltip title='Move' aria-label='Move Asset' placement='right'>
          <ListItem
            button
            classes={{selected: 'selected'}}
            selected={sketchMode === EDIT_TRANSLATE}
            onClick={() => _onClick(EDIT_TRANSLATE)}
          >
            <SvgIcon fontSize='large' component={TranslateIcon} />
          </ListItem>
        </Tooltip>

      </List>
    </Paper>

  )
}
