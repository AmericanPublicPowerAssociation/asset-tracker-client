import { connect } from 'react-redux'
import {
  addSelectedAssetType,
  setHighlightedAsset,
} from '../actions'
import AssetCircuit from '../components/AssetCircuit'

const mapStateToProps = state => ({
  highlightedAssetId: state.highlightedAssetId,
  assetById: state.assetById,
})

const mapDispatchToProps = dispatch => ({
  addSelectedAssetType: payload => {dispatch(
    addSelectedAssetType(payload))},
  setHighlightedAsset: payload => {dispatch(
    setHighlightedAsset(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetCircuit)
