import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import MapIcon from '@material-ui/icons/Map'


export default function MapstyleToggle(props) {
  const {
    mapStyle,
    nextMapStyle,
    setMapStyle,
    classes,
  } = props


  const toolTipTitle = `Change Map from ${mapStyle} to ${nextMapStyle}`
	return (
    <Tooltip
      title={toolTipTitle}>
      <IconButton
        color='primary'
        classes={classes}
        onClick={() => setMapStyle(nextMapStyle)} >
        <MapIcon />
      </IconButton>
    </Tooltip>
  )
}

