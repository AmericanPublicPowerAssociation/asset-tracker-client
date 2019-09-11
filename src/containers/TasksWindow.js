import { connect } from 'react-redux'
import TasksWindow from '../components/TasksWindow'
import {
  refreshTasks,
} from '../actions'
import {
  getTasks,
} from '../selectors'


const mapStateToProps = state => ({
  tasks: getTasks(state),
})


const mapDispatchToProps = dispatch => ({
  refreshTasks: payload => {dispatch(
    refreshTasks(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TasksWindow)
