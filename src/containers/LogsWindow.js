import { connect } from 'react-redux'
import LogsWindow from '../components/LogsWindow'
import {
  refreshLogs,
} from '../actions'


const mapStateToProps = state => ({
  logs: state.get('logs'),
})


const mapDispatchToProps = dispatch => ({
  refreshLogs: payload => {dispatch(
    refreshLogs(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogsWindow)
