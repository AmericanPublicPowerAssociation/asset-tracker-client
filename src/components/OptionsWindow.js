import SeeFiltersIcon from '@material-ui/icons/FilterList'
import SeeRowsIcon from '@material-ui/icons/ViewList'
import MapEditHistory from './MapEditHistory'

  const {
    isSketching,
    isWithFilters,
    isWithRows,
    isWithDetails,
    history,
    historyIndex,
    mapStyle,
    nextMapStyle,
    setIsWithFilters,
    setIsWithRows,
    setIsWithDetails,
    setMapStyle,
    setHistory,
    undo
  } = props

  const color = {
    colorPrimary: (
      mapStyle === 'streets' ?
      classes.light :
      classes.dark
    ),
  }

  return (
    {
      isSketching &&
      <MapEditHistory
        classes={color}
        history={history}
        historyIndex={historyIndex}
        undo={undo}
        setHistory={setHistory} />
    }

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
