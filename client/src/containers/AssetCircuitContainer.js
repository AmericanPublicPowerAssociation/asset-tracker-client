import { connect } from 'react-redux'
import {
  addSelectedAssetType,
  setFocusingAsset,
} from '../actions'
import AssetCircuit from '../components/AssetCircuit'
import {
  getCircuitAssetIdPairs,
} from '../selectors'

const mapStateToProps = state => ({
  focusingAssetId: state.focusingAssetId,
  circuitAssetIdPairs: getCircuitAssetIdPairs(state),
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
