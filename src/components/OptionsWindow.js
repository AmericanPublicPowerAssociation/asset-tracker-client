import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import StylesIcon from '@material-ui/icons/Map'
import DetailsIcon from '@material-ui/icons/Receipt'
// import TableIcon from '@material-ui/icons/ViewList'
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

export default function OptionsWindow(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    isWithDetails,
    // isWithTables,
    setIsWithDetails,
    // setIsWithTables,
  } = props
  const colors = useSelector(getColors)
  // const isFullScreenDataDialog = useSelector(getIsFullScreenDataDialog)
  const activeColor = colors.active
  const inactiveColor = colors.inactive
  return (
    <div className={classes.root}>
      <Tooltip title='Toggle Styles'>
        <IconButton
          className={activeColor}
          onClick={() => dispatch({type: TOGGLE_MAP_STYLE})}
        >
          <StylesIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='Toggle Details'>
        <IconButton
          className={isWithDetails ? activeColor : inactiveColor}
          onClick={() => setIsWithDetails(!isWithDetails)}
        >
          <DetailsIcon />
        </IconButton>
      </Tooltip>

    {/*
      <Tooltip title='Toggle Tables'>
        <IconButton
          className={isWithTables ? activeColor : inactiveColor}
          onClick={() => setIsWithTables(!isWithTables)}
        >
          <TableIcon />
        </IconButton>
      </Tooltip>
    */}
    </div>
  )
}
