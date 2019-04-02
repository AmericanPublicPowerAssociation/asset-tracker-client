import { connect } from 'react-redux'
import ReportWindow from '../components/ReportWindow'
import {
  getVulnerableAssets,
} from '../selectors'

const mapStateToProps = state => ({
  vulnerableAssets: getVulnerableAssets(state),
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportWindow)
