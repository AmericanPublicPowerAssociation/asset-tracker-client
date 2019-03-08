import { connect } from 'react-redux'
import {
  setFocusingAsset,
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
  updateAssetLocation: payload => {dispatch(
    updateAssetLocation(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetMap)
