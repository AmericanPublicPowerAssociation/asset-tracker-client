import { connect } from 'react-redux'
import {
  addSelectedAssetType,
  setFocusingAsset,
} from '../actions'
import AssetCircuit from '../components/AssetCircuit'

const mapStateToProps = state => ({
  focusingAssetId: state.focusingAssetId,
  assetById: state.assetById,
})

const mapDispatchToProps = dispatch => ({
  addSelectedAssetType: payload => {dispatch(
    addSelectedAssetType(payload))},
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetCircuit)
