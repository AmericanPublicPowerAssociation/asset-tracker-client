import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ToggleMapStyleIcon from '@material-ui/icons/Map'
import {
  TOGGLE_MAP_STYLE,
} from '../constants'
import {
  getColors,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
  },
}))

export default function OptionsWindow() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const colors = useSelector(getColors)
  const buttonColor = colors.button
  return (
    <div className={classes.root}>

      <Tooltip title='Toggle Map Style'>
        <IconButton
          className={buttonColor}
          onClick={() => dispatch({type: TOGGLE_MAP_STYLE})}
        >
          <ToggleMapStyleIcon />
        </IconButton>
      </Tooltip>

    </div>
  )
}
