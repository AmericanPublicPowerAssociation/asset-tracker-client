import { connect } from 'react-redux'
import TaskAddDialog from '../components/TaskAddDialog'
import {
  addTask,
  closeTaskAddDialog,
  setAddingTaskValue,
} from '../actions'
import {
  getAddingTask,
} from '../selectors'


const mapStateToProps = state => ({
  addingTask: getAddingTask(state),
})


const mapDispatchToProps = dispatch => ({
  closeTaskAddDialog: payload => {dispatch(
    closeTaskAddDialog(payload))},
  setAddingTaskValue: payload => {dispatch(
    setAddingTaskValue(payload))},
  addTask: payload => {dispatch(
    addTask(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskAddDialog)
