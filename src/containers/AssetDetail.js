import { connect } from 'react-redux'
import AssetDetail from '../components/AssetDetail'
import {
  changeAsset,
  replaceAsset,
} from '../actions'
import {
  getChildAssets,
  getConnectedAssets,
  getFocusingAsset,
  getParentAssets,
  getRelatingAssetId,
  getRelatingAssetKey,
} from '../selectors'


const mapStateToProps = state => ({
  focusingAsset: getFocusingAsset(state),
  relatingAssetId: getRelatingAssetId(state),
  relatingAssetKey: getRelatingAssetKey(state),
  connectedAssets: getConnectedAssets(state),
  parentAssets: getParentAssets(state),
  childAssets: getChildAssets(state),
})


const mapDispatchToProps = dispatch => ({
  changeAsset: payload => {dispatch(
    changeAsset(payload))},
  replaceAsset: payload => {dispatch(
    replaceAsset(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetDetail)
