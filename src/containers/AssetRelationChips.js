import { connect } from 'react-redux'
import AssetRelationChips from '../components/AssetRelationChips'
import {
  setFocusingAsset,
  setRelatingAsset,
} from '../actions'
import {
  getFocusingAsset,
  getRelatingAssetId,
  getRelatingAssetKey,
} from '../selectors'


const mapStateToProps = state => ({
  focusingAsset: getFocusingAsset(state),
  relatingAssetId: getRelatingAssetId(state),
  relatingAssetKey: getRelatingAssetKey(state),
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
