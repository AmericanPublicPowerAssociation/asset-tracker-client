import { connect } from 'react-redux'
import {
} from '../actions'
import NavigationDrawer from '../components/NavigationDrawer'
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
)(NavigationDrawer)
