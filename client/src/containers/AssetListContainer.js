import { connect } from 'react-redux'
import { setHighlightedAsset } from '../actions'
import AssetList from '../components/AssetList'

const mapStateToProps = state => ({
  sortedAssetIds: state.sortedAssetIds,
  selectedAssetTypeIds: state.selectedAssetTypeIds,
  highlightedAssetId: state.highlightedAssetId,
  exposedAssetId: state.exposedAssetId,
  assetById: state.assetById,
})

const mapDispatchToProps = dispatch => ({
  setHighlightedAsset: payload => {dispatch(
    setHighlightedAsset(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetList)
