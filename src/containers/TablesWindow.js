import { connect } from 'react-redux'
import TablesWindow from '../components/TablesWindow'
import {
  refreshAssets,
  setFocusingAsset,
} from '../actions'
import {
  getFocusingAssetId,
  getVisibleAssets,
} from '../selectors'


const mapStateToProps = state => ({
  visibleAssets: getVisibleAssets(state),
  focusingAssetId: getFocusingAssetId(state),
})


const mapDispatchToProps = dispatch => ({
  refreshAssets: (...args) => {dispatch(
    refreshAssets(...args))},
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))}
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TablesWindow)
