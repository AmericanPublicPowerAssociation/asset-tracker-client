import { connect } from 'react-redux'
import AssetRelationChips from '../components/AssetRelationChips'
import {
  setFocusingAsset,
  setRelatingAsset,
} from '../actions'
import {
  getAssetTypeById,
  getFocusingAsset,
  getFocusingAssetType,
  getRelatingAssetId,
  getRelatingAssetKey,
} from '../selectors'


const mapStateToProps = state => ({
  focusingAsset: getFocusingAsset(state),
  focusingAssetType: getFocusingAssetType(state),
  relatingAssetId: getRelatingAssetId(state),
  relatingAssetKey: getRelatingAssetKey(state),
  assetTypeById: getAssetTypeById(state),
})


const mapDispatchToProps = dispatch => ({
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))},
  setRelatingAsset: payload => {dispatch(
    setRelatingAsset(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetRelationChips)
