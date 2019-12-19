import { connect } from 'react-redux'
import AssetDetail from '../components/AssetDetail'
import {
  changeAsset,
  updateShape,
  mergeAsset,
  openTaskEditDialog,
  refreshAssetTasks,
  setEditingTaskValues,
} from '../actions'
import {
  getChildAssets,
  getConnectedAssets,
  getFocusingAsset,
  getFocusingAssetType,
  getParentAssets,
  getRelatingAssetId,
  getRelatingAssetKey,
  getTaskById,
} from '../selectors'


const mapStateToProps = state => ({
  focusingAsset: getFocusingAsset(state),
  focusingAssetType: getFocusingAssetType(state),
  relatingAssetId: getRelatingAssetId(state),
  relatingAssetKey: getRelatingAssetKey(state),
  connectedAssets: getConnectedAssets(state),
  parentAssets: getParentAssets(state),
  childAssets: getChildAssets(state),
  taskById: getTaskById(state),
})


const mapDispatchToProps = dispatch => ({
  changeAsset: payload => {dispatch(
    changeAsset(payload))},
  updateShape: payload => {dispatch(
    updateShape(payload))},
  mergeAsset: payload => {dispatch(
    mergeAsset(payload))},
  refreshAssetTasks: payload => {dispatch(
    refreshAssetTasks(payload))},
  openTaskEditDialog: payload => {dispatch(
    openTaskEditDialog(payload))},
  setEditingTaskValues: payload => {dispatch(
    setEditingTaskValues(payload))},

})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetDetail)
