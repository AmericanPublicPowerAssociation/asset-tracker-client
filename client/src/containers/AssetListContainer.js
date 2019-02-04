import { connect } from 'react-redux'
import {
  setHighlightedAsset,
  toggleAssetRelation,
} from '../actions'
import AssetList from '../components/AssetList'

const mapStateToProps = state => ({
  sortedAssetIds: state.sortedAssetIds,
  selectedAssetTypeIds: state.selectedAssetTypeIds,
  highlightedAssetId: state.highlightedAssetId,
  exposedAssetId: state.exposedAssetId,
  exposedAssetKey: state.exposedAssetKey,
  assetById: state.assetById,
})

const mapDispatchToProps = dispatch => ({
  setHighlightedAsset: payload => {dispatch(
    setHighlightedAsset(payload))},
  toggleAssetRelation: payload => {dispatch(
    toggleAssetRelation(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetList)
