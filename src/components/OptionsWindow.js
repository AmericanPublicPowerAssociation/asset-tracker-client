import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import SeeRowsIcon from '@material-ui/icons/ViewList'
import ToggleStylesIcon from '@material-ui/icons/Map'
import ToggleDetailsIcon from '@material-ui/icons/Receipt'
import {
  TOGGLE_MAP_STYLE,
} from '../constants'
import {
  getColors,
  getIsWithRows,
  getIsFullScreenDataDialog,
} from '../selectors'
import {
  setIsWithRows,
  setIsFullScreenDataDialog,
} from '../actions'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
  },
}))

export default function OptionsWindow(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    windowWidth,
    sketchMode,
    isWithDetails,
    setIsWithDetails,
  } = props
  const colors = useSelector(getColors)
  const isWithRows = useSelector(getIsWithRows)
  const isFullScreenDataDialog = useSelector(getIsFullScreenDataDialog)
  const activeColor = colors.active
  const inactiveColor = colors.inactive
  return (
    <div className={classes.root}>

      <Tooltip title='Toggle Styles'>
        <IconButton
          className={activeColor}
          onClick={() => dispatch({type: TOGGLE_MAP_STYLE})}
        >
          <ToggleStylesIcon />
        </IconButton>
      </Tooltip>

      { windowWidth >= 600 &&
        <Tooltip title='Toggle Details'>
          <IconButton
            className={isWithDetails ? activeColor : inactiveColor}
            onClick={() => setIsWithDetails(!isWithDetails)}
          >
            <ToggleDetailsIcon />
          </IconButton>
        </Tooltip>
      }

      { windowWidth >= 600 && sketchMode === 'view' &&
        <Tooltip title='Toggle Table'>
          <IconButton
            className={isWithRows ? activeColor : inactiveColor}
            onClick={() => dispatch(setIsWithRows())}
          >
            <SeeRowsIcon />
          </IconButton>
        </Tooltip>
      }

      {
        windowWidth < 600 &&
        <Tooltip title='Open Data'>
          <IconButton
            className={isFullScreenDataDialog ? activeColor : inactiveColor}
            onClick={() => dispatch(setIsFullScreenDataDialog())}
          >
            <SeeRowsIcon />
          </IconButton>
        </Tooltip>
      }

    </div>
  )
}
