import { connect } from 'react-redux'
import RisksWindow from '../components/RisksWindow'
import {
  getRisks,
  refreshRisks,
  getSortedRisks,
} from 'asset-report-risks'
import {
  openTaskEditDialog,
  setEditingTaskValues,
  refreshAssetsKit,
  setAssetsFilterKeys,
  setAssetsFilterValues,
  toggleAssetsFilterKey,
} from '../actions'
import {
  getAssetsFilterKeysByAttribute,
  getAssetsFilterValueByAttribute,
  getAssetTypeById,
  getRiskCountByAssetTypeId,
  getVisibleRisks,
} from '../selectors'


const mapStateToProps = state => ({
  risks: getRisks(state),
  assetFilterValueByAttribute: getAssetsFilterValueByAttribute(state),
  assetFilterKeysByAttribute: getAssetsFilterKeysByAttribute(state),
  assetTypeById: getAssetTypeById(state),
  riskCountByAssetTypeId: getRiskCountByAssetTypeId (state),
  visibleRisks: getVisibleRisks(state),
  sortedRisks: getSortedRisks(state),
})


const mapDispatchToProps = dispatch => ({
  refreshRisks: payload => {dispatch(
    refreshRisks(payload))},
  openTaskEditDialog: payload => {dispatch(
    openTaskEditDialog(payload))},
  setEditingTaskValues: payload => {dispatch(
    setEditingTaskValues(payload))},
  refreshAssetsKit: payload => {dispatch(
    refreshAssetsKit(payload))},
  setAssetsFilterValues: payload => {dispatch(
    setAssetsFilterValues(payload))},
  setAssetsFilterKeys: payload => {dispatch(
    setAssetsFilterKeys(payload))},
  toggleAssetsFilterKey: payload => {dispatch(
    toggleAssetsFilterKey(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RisksWindow)
