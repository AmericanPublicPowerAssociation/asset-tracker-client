import { connect } from 'react-redux'
import TasksWindow from '../components/TasksWindow'
import {
  refreshTasks,
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
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TasksWindow)
