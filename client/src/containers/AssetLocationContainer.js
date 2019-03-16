import { connect } from 'react-redux'
import {
  setLocatingAsset,
} from '../actions'
import AssetLocation from '../components/AssetLocation'
import {
  getFocusingAssetLocation,
} from '../selectors'

const mapStateToProps = state => ({
  focusingAssetId: state.focusingAssetId,
  focusingAssetLocation: getFocusingAssetLocation(state),
  locatingAssetId: state.locatingAssetId,
})

const mapDispatchToProps = dispatch => ({
  setLocatingAsset: payload => {dispatch(
    setLocatingAsset(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetLocation)
