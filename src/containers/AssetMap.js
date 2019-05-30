import { connect } from 'react-redux'
import AssetMap from '../components/AssetMap'
import {
  replaceAssetLocation,
  setMapViewport,
} from '../actions'
import {
  getBaseMapStyleName,
  getFocusingAssetId,
  getFocusingAssetLocation,
  getLocatingAssetId,
  getLocatingAssetLocation,
  getMapStyle,
  getMapViewport,
} from '../selectors'


const mapStateToProps = state => ({
  baseMapStyleName: getBaseMapStyleName(state),
  mapStyle: getMapStyle(state),
  mapViewport: getMapViewport(state),
  focusingAssetId: getFocusingAssetId(state),
  focusingAssetLocation: getFocusingAssetLocation(state),
  locatingAssetId: getLocatingAssetId(state),
  locatingAssetLocation: getLocatingAssetLocation(state),
})


const mapDispatchToProps = dispatch => ({
  setMapViewport: payload => {dispatch(
    setMapViewport(payload))},
  replaceAssetLocation: payload => {dispatch(
    replaceAssetLocation(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetMap)
