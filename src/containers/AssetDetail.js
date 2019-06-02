import { connect } from 'react-redux'
import AssetDetail from '../components/AssetDetail'
import {
  changeAsset,
  mergeAsset,
} from '../actions'
import {
  getChildAssets,
  getConnectedAssets,
  getFocusingAsset,
  getFocusingAssetType,
  getParentAssets,
  getRelatingAssetId,
  getRelatingAssetKey,
} from '../selectors'


const mapStateToProps = state => ({
  focusingAsset: getFocusingAsset(state),
  focusingAssetType: getFocusingAssetType(state),
  relatingAssetId: getRelatingAssetId(state),
  relatingAssetKey: getRelatingAssetKey(state),
  connectedAssets: getConnectedAssets(state),
  parentAssets: getParentAssets(state),
  childAssets: getChildAssets(state),
})


const mapDispatchToProps = dispatch => ({
  changeAsset: payload => {dispatch(
    changeAsset(payload))},
  mergeAsset: payload => {dispatch(
    mergeAsset(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetDetail)
