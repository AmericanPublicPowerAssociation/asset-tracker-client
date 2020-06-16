import {
  PICKING_DEPTH,
  PICKING_RADIUS_IN_PIXELS,
} from '../constants'
import {
  getOverlayMapLayers,
} from '../selectors'

  const overlayMapLayers = useSelector(getOverlayMapLayers)
  mapLayers.push(...overlayMapLayers)

      <DeckGL
        pickingRadius={PICKING_RADIUS_IN_PIXELS * mapViewState.zoom}
        pickingDepth={PICKING_DEPTH}
      >
