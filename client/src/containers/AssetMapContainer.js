import { connect } from 'react-redux'
import {
  updateAssetLocation,
} from '../actions'
import AssetMap from '../components/AssetMap'
import {
  getFocusingAssetLocation,
  getLocatingAssetLocation,
} from '../selectors'

const mapStateToProps = state => ({
  selectedAssetTypeIds: state.selectedAssetTypeIds,
  focusingAssetId: state.focusingAssetId,
  focusingAssetLocation: getFocusingAssetLocation(state),
  locatingAssetId: state.locatingAssetId,
  locatingAssetLocation: getLocatingAssetLocation(state),
})

const mapDispatchToProps = dispatch => ({
  updateAssetLocation: payload => {dispatch(
    updateAssetLocation(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetMap)
