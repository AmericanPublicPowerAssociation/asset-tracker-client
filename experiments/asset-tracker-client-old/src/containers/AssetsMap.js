import { connect } from 'react-redux'
import AssetsMap from '../components/AssetsMap'
import {
  setAssetLocation,
  setSelectedAsset,
  setFocusingAsset,
  setMapViewport,
  setBaseMapStyleName,
} from '../actions'
import {
  getBaseMapStyleName,
  getFocusingAssetId,
  getFocusingAssetLocation,
  getLocatingAssetId,
  getLocatingAssetLocation,
  getInteractiveLayerIds,
  getMapStyle,
  getMapViewport,
  getAssetById
} from '../selectors'


const mapStateToProps = state => ({
  baseMapStyleName: getBaseMapStyleName(state),
  interactiveLayerIds: getInteractiveLayerIds(state),
  mapStyle: getMapStyle(state),
  mapViewport: getMapViewport(state),
  focusingAssetId: getFocusingAssetId(state),
  focusingAssetLocation: getFocusingAssetLocation(state),
  locatingAssetId: getLocatingAssetId(state),
  locatingAssetLocation: getLocatingAssetLocation(state),
  assetById: getAssetById(state),
  selectedAssetIds: state.get('selectedAssetIds'),
})


const mapDispatchToProps = dispatch => ({
  setMapViewport: payload => {dispatch(
    setMapViewport(payload))},
  setAssetLocation: payload => {dispatch(
    setAssetLocation(payload))},
  setBaseMapStyleName: payload =>{dispatch(
    setBaseMapStyleName(payload))},
  setFocusingAsset: (payload) => {dispatch(
    setFocusingAsset(payload))},
  setSelectedAsset: (payload) => {dispatch(
    setSelectedAsset(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetsMap)
