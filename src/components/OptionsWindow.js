import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import SeeFiltersIcon from '@material-ui/icons/FilterList'
import SeeRowsIcon from '@material-ui/icons/ViewList'
import SeeDetailsIcon from '@material-ui/icons/Info'
import MapstyleToggle from './MapstyleToggle'
import {
  TOOLTIP_DELAY,
} from '../constants'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
  dark: {
    color: 'white'
  },
  light: {
    color: 'black'
  }
}))

function OptionsWindow(props) {
  const classes = useStyles()
  const {
    isSketching,
    isWithFilters,
    isWithRows,
    isWithDetails,
    mapStyle,
    nextMapStyle,
    setIsWithFilters,
    setIsWithRows,
    setIsWithDetails,
    setMapStyle,
  } = props

  const color = {
    colorPrimary: (
      mapStyle === 'streets' ?
      classes.light :
      classes.dark
    )
  }

  return (
    <div className={classes.root}>
      <MapstyleToggle
        classes={color}
        mapStyle={mapStyle}
        nextMapStyle={nextMapStyle}
        setMapStyle={setMapStyle} />

    {!isSketching && !isWithFilters &&
      <Tooltip title='See Filters' enterDelay={TOOLTIP_DELAY}>
        <IconButton
          color='primary'
          classes={color}
          onClick={() => setIsWithFilters(true)}>
          <SeeFiltersIcon />
        </IconButton>
      </Tooltip>
    }

    {!isSketching && !isWithRows &&
      <Tooltip title='See Rows' enterDelay={TOOLTIP_DELAY}>
        <IconButton
          color='primary'
          classes={color}
          onClick={() => setIsWithRows(true)}>
          <SeeRowsIcon />
        </IconButton>
      </Tooltip>
    }

    {!isWithDetails &&
      <Tooltip title='See Details' enterDelay={TOOLTIP_DELAY}>
        <IconButton onClick={() => setIsWithDetails(true)}>
          <SeeDetailsIcon />
        </IconButton>
      </Tooltip>
    }

    </div>
  )
}

export default OptionsWindow
