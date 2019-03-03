import { connect } from 'react-redux'
import {
  updateAsset,
} from '../actions'
import AssetMap from '../components/AssetMap'
import { getLocatingAsset } from '../selectors'

const mapStateToProps = state => ({
  selectedAssetTypeIds: state.selectedAssetTypeIds,
  locatingAsset: getLocatingAsset(state),
})

const mapDispatchToProps = dispatch => ({
  updateAsset: payload => {dispatch(
    updateAsset(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetMap)
