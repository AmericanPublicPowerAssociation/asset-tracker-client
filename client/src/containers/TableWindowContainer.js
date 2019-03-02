import { connect } from 'react-redux'
import {
  setFocusingAsset,
} from '../actions'
import TableWindow from '../components/TableWindow'
import { getVisibleAssets } from '../selectors'

const mapStateToProps = state => ({
  visibleAssets: getVisibleAssets(state),
  focusingAssetId: state.focusingAssetId,
})

const mapDispatchToProps = dispatch => ({
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableWindow)
