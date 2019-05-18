import { connect } from 'react-redux'
import {
  refreshAssets,
  setFocusingAsset,
} from '../actions'
import TablesWindow from '../components/TablesWindow'
import {
  getFocusingAssetId,
  getVisibleAssets,
} from '../selectors'


const mapStateToProps = state => ({
  visibleAssets: getVisibleAssets(state),
  focusingAssetId: getFocusingAssetId(state),
})


const mapDispatchToProps = dispatch => ({
  refreshAssets: payload => {dispatch(
    refreshAssets(payload))},
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))}
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TablesWindow)
