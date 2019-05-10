import {
  setFocusingAsset,
} from '../actions'
import { getVisibleAssets } from '../selectors'

const mapStateToProps = state => ({
  visibleAssets: getVisibleAssets(state),
  focusingAssetId: state.focusingAssetId,
})

const mapDispatchToProps = dispatch => ({
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))},
})
