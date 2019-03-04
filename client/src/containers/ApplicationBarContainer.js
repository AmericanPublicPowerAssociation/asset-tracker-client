import { connect } from 'react-redux'
import {
  addSelectedAssetType,
  setFocusingAsset,
} from '../actions'
import ApplicationBar from '../components/ApplicationBar'
import {
  getLocatingAsset,
  getRelatingAsset,
} from '../selectors'

const mapStateToProps = state => ({
  focusingAssetId: state.focusingAssetId,
  locatingAsset: getLocatingAsset(state),
  relatingAssetKey: state.relatingAssetKey,
  relatingAsset: getRelatingAsset(state),
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
