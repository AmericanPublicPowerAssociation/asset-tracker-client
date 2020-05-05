import {
  setFocusingBusId,
  setFocusingAssetId,
} from '../actions'
import {
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_EDIT,
} from '../constants'
import {
  getFocusingAssetId,
  // getFocusingBusId,
} from '../selectors'

  const focusingAssetId = useSelector(getFocusingAssetId)
  // const focusingBusId = useSelector(getFocusingBusId)

  function handleBusesGeoJsonClick(info, event) {
    if (sketchMode === SKETCH_MODE_ADD_LINE) {
      setLineBusId(busId)
      // If we already started a line,
      if (selectedAssetIndexes.length) {
        // End the line
        changeSketchMode(SKETCH_MODE_ADD, busId)
      }
    } else {
      if (info.picked) {
        const busIndex = info.index
        setSelectedBusIndexes([busIndex])
      }
    }
  }

  function handleKeyUp(e) {
    e.preventDefault()
    if (e.key === 'Delete') {
      if (focusingAssetId && sketchMode.startsWith(SKETCH_MODE_EDIT)) {
        openDeleteAssetDialog()
      }
    }
  }
}

/*
*    and we clicked on a bus
*       add a connection to that bus
*        show snackbar
*    and we did not click on a bus
*       add a connection to a new bus
* if we are ending the line
*    and we clicked on a bus
*       add a connection to that bus
*       end the connection
*        clear selected asset indexes
*        show snackbar
*/
