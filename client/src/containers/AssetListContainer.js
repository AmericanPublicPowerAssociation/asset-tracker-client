import { connect } from 'react-redux'
import { highlightAsset } from '../actions'
import AssetList from '../components/AssetList'

const mapStateToProps = state => ({
  assetById: state.assetById,
  highlightedAssetId: state.highlightedAssetId,
  selectedAssetTypeIds: state.selectedAssetTypeIds,
  sortedAssetIds: state.sortedAssetIds,
})

const mapDispatchToProps = dispatch => ({
  highlightAsset: assetId => {dispatch(
    highlightAsset(assetId))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetList)
