import { connect } from 'react-redux'
import {
  setLocatingAsset,
} from '../actions'
import AssetLocation from '../components/AssetLocation'
import {
  getFocusingAssetId,
  getFocusingAssetLocation,
  getLocatingAssetId,
} from '../selectors'


const mapStateToProps = state => ({
  focusingAssetId: getFocusingAssetId(state),
  focusingAssetLocation: getFocusingAssetLocation(state),
  locatingAssetId: getLocatingAssetId(state),
})


const mapDispatchToProps = dispatch => ({
  setLocatingAsset: payload => {dispatch(
    setLocatingAsset(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetLocation)
