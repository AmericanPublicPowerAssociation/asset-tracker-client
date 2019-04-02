import { connect } from 'react-redux'
import {
  addSelectedAssetType,
  setFocusingAsset,
} from '../actions'
import ApplicationBar from '../components/ApplicationBar'
import {
  getLocatingAsset,
  getRelatingAsset,
  getVulnerableAssets,
} from '../selectors'

const mapStateToProps = state => ({
  selectedAssetIds: state.selectedAssetIds,
  focusingAssetId: state.focusingAssetId,
  locatingAsset: getLocatingAsset(state),
  relatingAssetKey: state.relatingAssetKey,
  relatingAsset: getRelatingAsset(state),
  vulnerableAssets: getVulnerableAssets(state),
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
)(ApplicationBar)
