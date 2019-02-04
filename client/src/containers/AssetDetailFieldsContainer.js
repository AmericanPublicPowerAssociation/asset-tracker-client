import { connect } from 'react-redux'
import { updateAsset } from '../actions'
import AssetDetailFields from '../components/AssetDetailFields'

const mapStateToProps = state => ({
  highlightedAssetId: state.highlightedAssetId,
  assetById: state.assetById,
})

const mapDispatchToProps = dispatch => ({
  updateAsset: payload => {dispatch(
    updateAsset(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetDetailFields)
