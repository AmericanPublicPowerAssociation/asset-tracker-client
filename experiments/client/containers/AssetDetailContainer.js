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
