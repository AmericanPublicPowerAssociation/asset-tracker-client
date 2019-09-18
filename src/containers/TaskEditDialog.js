import { connect } from 'react-redux'
import TaskEditDialog from '../components/TaskEditDialog'
import {
  editTask,
  closeTaskEditDialog,
  setEditingTaskValues,
} from '../actions'
import {
  getEditingTask,
} from '../selectors'


const mapStateToProps = state => ({
  editingTask: getEditingTask(state),
})


const mapDispatchToProps = dispatch => ({
  closeTaskEditDialog: payload => {dispatch(
    closeTaskEditDialog(payload))},
  setEditingTaskValues: payload => {dispatch(
    setEditingTaskValues(payload))},
  editTask: payload => {dispatch(
    editTask(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskEditDialog)
