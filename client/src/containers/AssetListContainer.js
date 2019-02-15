import { connect } from 'react-redux'
import {
  setHighlightedAsset,
  toggleAssetRelation,
} from '../actions'
import AssetList from '../components/AssetList'
import {
  getVisibleAssets,
  getExposedAsset,
  getExposedAssetTypeIds,
} from '../selectors'

const mapStateToProps = state => ({
  visibleAssets: getVisibleAssets(state),
  highlightedAssetId: state.highlightedAssetId,
  exposedAssetKey: state.exposedAssetKey,
  exposedAsset: getExposedAsset(state),
  exposedAssetTypeIds: getExposedAssetTypeIds(state),
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
