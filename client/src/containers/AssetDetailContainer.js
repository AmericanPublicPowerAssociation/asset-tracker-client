import { connect } from 'react-redux'
import { updateAsset } from '../actions'
import AssetDetail from '../components/AssetDetail'

const mapStateToProps = state => ({
  assetById: state.assetById,
  highlightedAssetId: state.highlightedAssetId,
})

const mapDispatchToProps = dispatch => ({
  updateAsset: asset => {dispatch(
    updateAsset(asset))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetDetail)
