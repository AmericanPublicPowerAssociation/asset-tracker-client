import { connect } from 'react-redux'
import AssetTable from '../components/AssetTable'
import {
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
  relatedAssetIds: getRelatedAssetIds(state),
  relatedAssetTypeIds: getRelatedAssetTypeIds(state),
})


const mapDispatchToProps = dispatch => ({
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetTable)
