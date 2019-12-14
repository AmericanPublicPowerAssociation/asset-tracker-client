import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import SeeFiltersIcon from '@material-ui/icons/FilterList'
import SeeRowsIcon from '@material-ui/icons/ViewList'
import SeeDetailsIcon from '@material-ui/icons/Info'
import {
  TOOLTIP_DELAY,
} from '../constants'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(4),
    left: 0,
    padding: theme.spacing(1),
  },
}))

function OptionsWindow(props) {
  const classes = useStyles()
  const {
    isSketching,
    isWithFilters,
    isWithRows,
    isWithDetails,
    setIsWithFilters,
    setIsWithRows,
    setIsWithDetails,
  } = props
  return (
    <div className={classes.root}>

    {!isSketching && !isWithFilters &&
      <Tooltip title='See Filters' enterDelay={TOOLTIP_DELAY}>
        <IconButton onClick={() => setIsWithFilters(true)}>
          <SeeFiltersIcon />
        </IconButton>
      </Tooltip>
    }

    {!isSketching && !isWithRows &&
      <Tooltip title='See Rows' enterDelay={TOOLTIP_DELAY}>
        <IconButton onClick={() => setIsWithRows(true)}>
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
