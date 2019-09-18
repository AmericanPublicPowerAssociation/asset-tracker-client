import { connect } from 'react-redux'
import RisksWindow from '../components/RisksWindow'
import {
  getRisks,
  refreshRisks,
} from 'asset-report-risks'
import {
  openTaskEditDialog,
  setEditingTaskValues,
} from '../actions'


const mapStateToProps = state => ({
  risks: getRisks(state),
})


const mapDispatchToProps = dispatch => ({
  refreshRisks: payload => {dispatch(
    refreshRisks(payload))},
  openTaskEditDialog: payload => {dispatch(
    openTaskEditDialog(payload))},
  setEditingTaskValues: payload => {dispatch(
    setEditingTaskValues(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RisksWindow)
