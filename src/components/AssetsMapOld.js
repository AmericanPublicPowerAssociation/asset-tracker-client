import { useDispatch } from 'react-redux'
import {
  EditableGeoJsonLayer,
} from 'nebula.gl'
// import { GeoJsonLayer } from '@deck.gl/layers'
import {
  setFocusingBusId,
  setFocusingAssetId,
} from '../actions'
import {
  PICKING_DEPTH,
  PICKING_RADIUS_IN_PIXELS,
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_EDIT,
} from '../constants'
import {
  usePickableLayer,
  useEditableLayer,
  useInterpretableLayer,
} from '../hooks'
import {
  CustomEditableGeoJsonLayer,
} from '../routines'
import {
  getAssetIdByBusId,
  getAssetTypeByCode,
  getFocusingAssetId,
  // getFocusingBusId,
} from '../selectors'

export default function AssetsMap(props) {
  const {
    assetById,
    sketchMode,
    lineBusId,
    changeSketchMode,
    setSelectedAssetIndexes,
    setLineBusId,
    setSelectedBusIndexes,
    openDeleteAssetDialog,
  } = props
  const dispatch = useDispatch()
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetIdByBusId = useSelector(getAssetIdByBusId)
  const focusingAssetId = useSelector(getFocusingAssetId)
  // const focusingBusId = useSelector(getFocusingBusId)

  const {
    handleLayerSelect,
  } = usePickableLayer(
    sketchMode,
    setSelectedAssetIndexes,
    setSelectedBusIndexes)

  const {
    handleLayerEdit,
  } = useEditableLayer(
    sketchMode,
    assetTypeByCode,
    lineBusId,
    setSelectedAssetIndexes,
    changeSketchMode)

  const {
    handleLayerInterpret,
  } = useInterpretableLayer(
    assetById,
    assetIdByBusId,
    deckGL)

  function handleBusesGeoJsonClick(info, event) {
    const busId = info.object.properties.id
    const assetId = assetIdByBusId[busId]

    if (sketchMode === SKETCH_MODE_ADD_LINE) {
      setLineBusId(busId)
      // If we already started a line,
      if (selectedAssetIndexes.length) {
        // End the line
        changeSketchMode(SKETCH_MODE_ADD, busId)
      }
    }
    else {
      if (info.picked) {
        const busIndex = info.index
        setSelectedBusIndexes([busIndex])
        dispatch(setFocusingBusId(busId))
      }
    }

    // busId && dispatch(setFocusingBusId(busId))
    assetId && dispatch(setFocusingAssetId(assetId))
  }

  function handleDoubleClick(e) {
    if (sketchMode === SKETCH_MODE_ADD_LINE) {
      changeSketchMode(SKETCH_MODE_ADD)
    }
  }

  function handleKeyUp(e) {
    e.preventDefault()
    if (e.key === 'Enter') {
      if (sketchMode === SKETCH_MODE_ADD_LINE) {
        changeSketchMode(SKETCH_MODE_ADD)
      }
    } else if (e.key === 'Delete') {
      if (focusingAssetId && sketchMode.startsWith(SKETCH_MODE_EDIT)) {
        openDeleteAssetDialog()
      }
    }
  }

  mapLayers.push(new CustomEditableGeoJsonLayer({
    onSelect: handleLayerSelect,
    onEdit: handleLayerEdit,
    onInterpret: handleLayerInterpret,
    onDoubleClick: handleDoubleClick,
  }))

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
