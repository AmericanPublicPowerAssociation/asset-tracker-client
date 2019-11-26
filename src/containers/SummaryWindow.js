import { connect } from 'react-redux'
import SummaryWindow from '../components/SummaryWindow'
import {
  refreshDashboards
} from '../actions'
import {
  getDashboards
} from '../selectors'

const mapStateToProps = state => {
  return { 
    dashboards: getDashboards(state)
  }
}

const mapDispatchToProps = dispatch => ({
  refreshDashboards: payload => {dispatch(
    refreshDashboards(payload))}
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SummaryWindow)
