import { connect } from 'react-redux'
import AssetsTable from '../components/AssetsTable'
import {
  addAssetRelation,
  dropAssetRelation,
  refreshAssetsKit,
  setFocusingAsset,
} from '../actions'
import {
  getAssetTypeById,
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
  assetTypeById: getAssetTypeById(state),
  sortedTable: state.get('sortedTable'),
})


const mapDispatchToProps = dispatch => ({
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))},
  addAssetRelation: payload => {dispatch(
    addAssetRelation(payload))},
  dropAssetRelation: payload => {dispatch(
    dropAssetRelation(payload))},
  refreshAssetsKit: payload => {dispatch(
    refreshAssetsKit(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetsTable)
