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

      isSketching && false &&
      <MapEditHistory
        classes={color}
        history={history}
        historyIndex={historyIndex}
        undo={undo}
        setHistory={setHistory} />
