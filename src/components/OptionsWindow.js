import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import MapIcon from '@material-ui/icons/Map'
import {
  TOGGLE_MAP_STYLE,
} from '../constants'
import {
  getIsMapStyleBright,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(0),
    left: theme.spacing(0),
  },
}))

export default function OptionsWindow() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isMapStyleBright = useSelector(getIsMapStyleBright) 
  // Determine button color
  const buttonColor = isMapStyleBright ? 'black' : 'white'
  return (
    <div className={classes.root}>
      <Tooltip title='Toggle Map Style'>
        <IconButton
          className={buttonColor}
          onClick={() => dispatch({type: TOGGLE_MAP_STYLE})}
        >
          <MapIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}
