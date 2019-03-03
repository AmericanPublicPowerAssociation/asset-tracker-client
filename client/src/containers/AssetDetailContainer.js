import { connect } from 'react-redux'
import {
  setLocatingAsset,
  setRelatingAsset,
  updateAsset,
} from '../actions'
import AssetDetail from '../components/AssetDetail'
import {
  getFocusingAsset,
  getLocatingAsset,
  getConnectedAssets,
  getParentAssets,
  getChildAssets,
} from '../selectors'

const mapStateToProps = state => ({
  focusingAsset: getFocusingAsset(state),
  locatingAsset: getLocatingAsset(state),
  relatingAssetId: state.relatingAssetId,
  relatingAssetKey: state.relatingAssetKey,
  connectedAssets: getConnectedAssets(state),
  parentAssets: getParentAssets(state),
  childAssets: getChildAssets(state),
})

const mapDispatchToProps = dispatch => ({
  setLocatingAsset: payload => {dispatch(
    setLocatingAsset(payload))},
  setRelatingAsset: payload => {dispatch(
    setRelatingAsset(payload))},
  updateAsset: payload => {dispatch(
    updateAsset(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetDetail)
