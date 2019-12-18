import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import HistoryIcon from '@material-ui/icons/History'
import {
  TOOLTIP_DELAY,
} from '../constants'

export default function MapEditHistory(props) {
  const {
    classes,
    historyIndex,
    undo,
  } = props

  return (
    <Tooltip title='Undo' enterDelay={TOOLTIP_DELAY}>
      <span>
      <IconButton
        color='primary'
        disabled={historyIndex === -1}
        classes={classes}
        onClick={() => undo()}>
        <HistoryIcon />
      </IconButton>
      </span>
    </Tooltip> 
  )
}
