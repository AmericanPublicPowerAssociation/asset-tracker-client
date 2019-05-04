import { connect } from 'react-redux'
import {
  setMapViewport,
  setFocusingAsset,
  setSelectedAssets,
  updateAssetLocation,
} from '../actions'
import AssetMap from '../components/AssetMap'
import {
  getMapStyle,
  getInteractiveLayerIds,
  getFocusingAssetLocation,
  getLocatingAssetLocation,
} from '../selectors'

const mapStateToProps = state => ({
  mapStyle: getMapStyle(state),
  mapViewport: state.mapViewport,
  interactiveLayerIds: getInteractiveLayerIds(state),
  focusingAssetId: state.focusingAssetId,
  focusingAssetLocation: getFocusingAssetLocation(state),
  locatingAssetId: state.locatingAssetId,
  locatingAssetLocation: getLocatingAssetLocation(state),
})

const mapDispatchToProps = dispatch => ({
  setMapViewport: payload => {dispatch(
    setMapViewport(payload))},
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))},
  setSelectedAssets: payload => {dispatch(
    setSelectedAssets(payload))},
  updateAssetLocation: payload => {dispatch(
    updateAssetLocation(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetMap)
