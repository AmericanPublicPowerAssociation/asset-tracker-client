import { connect } from 'react-redux'
import AssetList from '../components/AssetList'
import {
  addAssetRelation,
  dropAssetRelation,
  setFocusingAsset,
} from '../actions'
import {
  getFocusingAssetId,
  getRelatedAssetIds,
  getRelatedAssetTypeIds,
  getRelatingAssetId,
  getRelatingAssetKey,
  getVisibleAssets,
} from '../selectors'


const mapStateToProps = state => ({
  visibleAssets: getVisibleAssets(state),
  focusingAssetId: getFocusingAssetId(state),
  relatingAssetId: getRelatingAssetId(state),
  relatingAssetKey: getRelatingAssetKey(state),
  relatedAssetTypeIds: getRelatedAssetTypeIds(state),
  relatedAssetIds: getRelatedAssetIds(state),
})


const mapDispatchToProps = dispatch => ({
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))},
  addAssetRelation: payload => {dispatch(
    addAssetRelation(payload))},
  dropAssetRelation: payload => {dispatch(
    dropAssetRelation(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetList)
