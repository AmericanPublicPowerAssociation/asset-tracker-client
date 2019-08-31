import { connect } from 'react-redux'
import AssetTasksWindow from '../components/AssetTasksWindow'
import {
  refreshAssetTasks,
} from '../actions'
import {
  getAssetTasks,
} from '../selectors'


const mapStateToProps = state => ({
  assetsTasks: getAssetTasks(state),
})


const mapDispatchToProps = dispatch => ({
  refreshAssetTasks: payload => {dispatch(
    refreshAssetTasks(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetTasksWindow)
