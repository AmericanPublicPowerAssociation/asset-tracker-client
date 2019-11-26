import { connect } from 'react-redux'
import TasksWindow from '../components/TasksWindow'
import {
  refreshTasks,
  openTaskEditDialog,
  setEditingTaskValues,
} from '../actions'
import {
  getTaskById,
} from '../selectors'


const mapStateToProps = state => ({
  taskById: getTaskById(state),
})


const mapDispatchToProps = dispatch => ({
  refreshTasks: payload => {dispatch(
    refreshTasks(payload))},
  openTaskEditDialog: payload => {dispatch(
    openTaskEditDialog(payload))},
  setEditingTaskValues: payload => {dispatch(
    setEditingTaskValues(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TasksWindow)
