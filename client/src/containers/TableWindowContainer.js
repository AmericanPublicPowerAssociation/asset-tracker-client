import { connect } from 'react-redux'
import {
  setHighlightedAsset,
} from '../actions'
import TableWindow from '../components/TableWindow'
import { getVisibleAssets } from '../selectors'

const mapStateToProps = state => ({
  visibleAssets: getVisibleAssets(state),
  highlightedAssetId: state.highlightedAssetId,
})

const mapDispatchToProps = dispatch => ({
  setHighlightedAsset: payload => {dispatch(
    setHighlightedAsset(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableWindow)
