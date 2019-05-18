import {
  addSelectedAssetType,
  setFocusingAsset,
  setRelatingAsset,
  updateAsset,
} from '../actions'
import {
  getConnectedAssets,
  getParentAssets,
  getChildAssets,
} from '../selectors'


const mapStateToProps = state => ({
  relatingAssetId: state.relatingAssetId,
  relatingAssetKey: state.relatingAssetKey,
  connectedAssets: getConnectedAssets(state),
  parentAssets: getParentAssets(state),
  childAssets: getChildAssets(state),
})

const mapDispatchToProps = dispatch => ({
  addSelectedAssetType: payload => {dispatch(
    addSelectedAssetType(payload))},
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))},
  setRelatingAsset: payload => {dispatch(
    setRelatingAsset(payload))},
  updateAsset: payload => {dispatch(
    updateAsset(payload))},
})
