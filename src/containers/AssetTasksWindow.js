import { connect } from 'react-redux'
import AssetTasksWindow from '../components/AssetTasksWindow'
import {
  refreshTasks,
} from '../actions'
import {
  getAssetTasks,
} from '../selectors'


const mapStateToProps = state => ({
  assetsTasks: getAssetTasks(state),
})


const mapDispatchToProps = dispatch => ({
  refreshTasks: payload => {
    dispatch(
      refreshTasks(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetTasksWindow)
