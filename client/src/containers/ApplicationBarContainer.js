import { connect } from 'react-redux'
import {
  addSelectedAssetType,
  setHighlightedAsset,
} from '../actions'
import ApplicationBar from '../components/ApplicationBar'
import { getExposedAsset } from '../selectors'

const mapStateToProps = state => ({
  highlightedAssetId: state.highlightedAssetId,
  exposedAssetKey: state.exposedAssetKey,
  exposedAsset: getExposedAsset(state),
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
