import { connect } from 'react-redux'
import LogsWindow from '../components/LogsWindow'
import {
  refreshLogs,
} from '../actions'
import {
  getLogs,
} from '../selectors'


const mapStateToProps = state => ({
  logs: getLogs(state),
})


const mapDispatchToProps = dispatch => ({
  refreshLogs: payload => {dispatch(
    refreshLogs(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogsWindow)
