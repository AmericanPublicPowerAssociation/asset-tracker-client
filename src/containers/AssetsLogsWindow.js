import { connect } from 'react-redux'
import AssetsLogsWindow from '../components/AssetsLogsWindow'
import {
  refreshAssetsLogs,
} from '../actions'
import {
  getAssetsLogs,
} from '../selectors'


const mapStateToProps = state => ({
  assetsLogs: getAssetsLogs(state),
})


const mapDispatchToProps = dispatch => ({
  refreshAssetsLogs: payload => {dispatch(
    refreshAssetsLogs(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetsLogsWindow)
