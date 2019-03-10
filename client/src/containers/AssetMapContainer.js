import { connect } from 'react-redux'
import {
  setFocusingAsset,
  setSelectedAssetIds,
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
  interactiveLayerIds: getInteractiveLayerIds(state),
  focusingAssetId: state.focusingAssetId,
  focusingAssetLocation: getFocusingAssetLocation(state),
  locatingAssetId: state.locatingAssetId,
  locatingAssetLocation: getLocatingAssetLocation(state),
})

const mapDispatchToProps = dispatch => ({
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))},
  setSelectedAssetIds: payload => {dispatch(
    setSelectedAssetIds(payload))},
  updateAssetLocation: payload => {dispatch(
    updateAssetLocation(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetMap)
