import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeckGL from '@deck.gl/react'
import {
  EditableGeoJsonLayer,
} from 'nebula.gl'
// import { GeoJsonLayer } from '@deck.gl/layers'
import {
  setFocusingBusId,
  setFocusingAssetId,
} from '../actions'
import {
  ASSET_METER_RADIUS_IN_METERS,
  BUS_RADIUS_IN_METERS,
  LINE_WIDTH_IN_METERS,
  PICKING_DEPTH,
  PICKING_RADIUS_IN_PIXELS,
  POINT_RADIUS_IN_METERS,
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
  getColors,
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
  const deckGL = useRef()
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetIdByBusId = useSelector(getAssetIdByBusId)
  const colors = useSelector(getColors)
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

  const ASSET_TYPE_METER_CODE = assetTypeByCode['m'] && assetTypeByCode['m'].code

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
    }
    else if (e.key === 'Delete') {
      if (focusingAssetId && sketchMode.startsWith(SKETCH_MODE_EDIT)) {
        openDeleteAssetDialog()
      }
    }
  }

  mapLayers.push(new CustomEditableGeoJsonLayer({
    pickable: true,
    stroked: false,
    autoHighlight: sketchMode !== SKETCH_MODE_ADD_LINE,
    highlightColor: colors.assetHighlight,
    getRadius: (feature, isSelected) => {
      const assetTypeCode = feature.properties.typeCode
      return assetTypeCode === ASSET_TYPE_METER_CODE ?
        ASSET_METER_RADIUS_IN_METERS :
        POINT_RADIUS_IN_METERS
    },
    getLineWidth: LINE_WIDTH_IN_METERS,
    getFillColor: (feature, isSelected) => {
      return isSelected ? colors.assetSelect : colors.asset
    },
    getLineColor: (feature, isSelected) => {
      return isSelected ? colors.assetSelect : colors.asset
    },
    onSelect: handleLayerSelect,
    onEdit: handleLayerEdit,
    onInterpret: handleLayerInterpret,
    onDoubleClick: handleDoubleClick,
  }))

  mapLayers.push(new EditableGeoJsonLayer({
    pickable: true,
    stroked: false,
    autoHighlight: true,
    highlightColor: colors.busHighlight,
    selectedFeatureIndexes: selectedBusIndexes,
    getRadius: BUS_RADIUS_IN_METERS,
    getFillColor: (feature, isSelected) => {
      return isSelected ? colors.busSelect : colors.bus
    },
    onClick: handleBusesGeoJsonClick,
  }))

  return (
    <DeckGL
      ref={deckGL}
      pickingRadius={PICKING_RADIUS_IN_PIXELS}
      pickingDepth={PICKING_DEPTH}
    >
    </DeckGL>
  )
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
