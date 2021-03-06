import { connect } from 'react-redux'
import DashboardsWindow from '../components/DashboardsWindow'
import {
  refreshDashboards,
} from '../actions'
import {
  getDashboards,
} from '../selectors'


const mapStateToProps = state => ({
  dashboards: getDashboards(state),
})


const mapDispatchToProps = dispatch => ({
  refreshDashboards: payload => {dispatch(
    refreshDashboards(payload))}
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardsWindow)
