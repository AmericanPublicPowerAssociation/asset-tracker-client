import { connect } from 'react-redux'
import {
  addSelectedAssetType,
  setHighlightedAsset,
} from '../actions'
import ApplicationBar from '../components/ApplicationBar'

const mapStateToProps = state => ({
  highlightedAssetId: state.highlightedAssetId,
  exposedAssetId: state.exposedAssetId,
  exposedAssetKey: state.exposedAssetKey,
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
)(ApplicationBar)
