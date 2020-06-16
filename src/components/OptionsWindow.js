import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import StylesIcon from '@material-ui/icons/Map'
import DetailsIcon from '@material-ui/icons/Receipt'
import TableIcon from '@material-ui/icons/ViewList'
import {
  TOGGLE_MAP_STYLE,
} from '../constants'
import {
  IsLayoutMobileContext,
} from '../contexts'
import {
  getMapColors,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
  },
}))

export default function OptionsWindow({
  isWithDetails,
  isWithTables,
  setIsWithTables,
  setIsWithDetails,
}) {
  const isLayoutMobile = useContext(IsLayoutMobileContext)
  const classes = useStyles()
  const dispatch = useDispatch()
  const mapColors = useSelector(getMapColors)
  const activeColor = mapColors.active
  const inactiveColor = mapColors.inactive

  return (
    <div className={classes.root}>
      <Tooltip title='Toggle Styles'>
        <IconButton
          className={activeColor}
          onClick={() => dispatch({ type: TOGGLE_MAP_STYLE })}
        >
          <StylesIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='Toggle Details'>
        <IconButton
          className={isWithDetails ? activeColor : inactiveColor}
          onClick={() => {
            if (isLayoutMobile) {
              setIsWithTables(false)
              setIsWithDetails( prevState => !prevState)
            }
            else {
              setIsWithDetails( prevState => !prevState)
            }
          }}
        >
          <DetailsIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='Toggle Tables'>
        <IconButton
          className={isWithTables ? activeColor : inactiveColor}
          onClick={() => {
            if (isLayoutMobile) {
              setIsWithDetails(false)
              setIsWithTables( prevState => !prevState)
            }
            else {
              setIsWithTables( prevState => !prevState)
            }
          }}
        >
          <TableIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}
