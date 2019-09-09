import { connect } from 'react-redux'
import AssetList from '../components/AssetList'
import {
  addAssetRelation,
  dropAssetRelation,
  setFocusingAsset,
  toggleSelectedAsset,
} from '../actions'
import {
  getFocusingAssetId,
  getLocatingAssetId,
  getRelatedAssetIds,
  getRelatedAssetTypeIds,
  getRelatingAssetId,
  getRelatingAssetKey,
  getVisibleAssets,
} from '../selectors'


const mapStateToProps = state => ({
  visibleAssets: getVisibleAssets(state),
  focusingAssetId: getFocusingAssetId(state),
  locatingAssetId: getLocatingAssetId(state),
  relatingAssetId: getRelatingAssetId(state),
  relatingAssetKey: getRelatingAssetKey(state),
  relatedAssetTypeIds: getRelatedAssetTypeIds(state),
  relatedAssetIds: getRelatedAssetIds(state),
  selectedAssetIds: state.get('selectedAssetIds'),
})


const mapDispatchToProps = dispatch => ({
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))},
  addAssetRelation: payload => {dispatch(
    addAssetRelation(payload))},
  dropAssetRelation: payload => {dispatch(
    dropAssetRelation(payload))},
  toggleSelectedAsset: payload => {dispatch(
    toggleSelectedAsset(payload))}
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetList)
