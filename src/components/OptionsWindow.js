import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import MapIcon from '@material-ui/icons/Map'
import {
  BRIGHT_MAP_STYLE_NAMES,
  NEXT_MAP_STYLE_NAME_BY_MAP_STYLE_NAME,
} from '../constants'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(0),
    left: theme.spacing(0),
  },
}))

export default function OptionsWindow(props) {
  const classes = useStyles()
  const {
    mapStyleName,
    setMapStyleName,
  } = props
  // Determine button color
  const isMapStyleBright = BRIGHT_MAP_STYLE_NAMES.includes(mapStyleName)
  const buttonColor = isMapStyleBright ? 'black' : 'white'
  // Determine next map style
  const nextMapStyleName = NEXT_MAP_STYLE_NAME_BY_MAP_STYLE_NAME[mapStyleName]
  return (
    <div className={classes.root}>
      <Tooltip title='Toggle Map Style'>
        <IconButton
          className={buttonColor}
          onClick={() => setMapStyleName(nextMapStyleName)}
        >
          <MapIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}
