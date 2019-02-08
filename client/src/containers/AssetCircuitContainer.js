import { connect } from 'react-redux'
import {
  setHighlightedAsset,
} from '../actions'
import AssetCircuit from '../components/AssetCircuit'

const mapStateToProps = state => ({
  highlightedAssetId: state.highlightedAssetId,
  assetById: state.assetById,
})

const mapDispatchToProps = dispatch => ({
  setHighlightedAsset: payload => {dispatch(
    setHighlightedAsset(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetCircuit)
