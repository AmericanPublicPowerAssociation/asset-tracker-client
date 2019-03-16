import { connect } from 'react-redux'
import {
  setFocusingAsset,
  toggleAssetRelation,
} from '../actions'
import AssetList from '../components/AssetList'
import {
  getVisibleAssets,
  getRelatedAssetIds,
  getRelatedAssetTypeIds,
} from '../selectors'

const mapStateToProps = state => ({
  visibleAssets: getVisibleAssets(state),
  relatedAssetIds: getRelatedAssetIds(state),
  relatedAssetTypeIds: getRelatedAssetTypeIds(state),
  focusingAssetId: state.focusingAssetId,
  relatingAssetId: state.relatingAssetId,
  relatingAssetKey: state.relatingAssetKey,
  locatingAssetId: state.locatingAssetId,
})

const mapDispatchToProps = dispatch => ({
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))},
  toggleAssetRelation: payload => {dispatch(
    toggleAssetRelation(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetList)
