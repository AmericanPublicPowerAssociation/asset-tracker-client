import { connect } from 'react-redux'
import {
  updateAssetLocation,
} from '../actions'
import AssetMap from '../components/AssetMap'
import {
  getLocatingAssetLocation,
} from '../selectors'

const mapStateToProps = state => ({
  selectedAssetTypeIds: state.selectedAssetTypeIds,
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
