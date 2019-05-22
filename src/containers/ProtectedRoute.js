import { connect } from 'react-redux'
import ProtectedRoute from '../components/ProtectedRoute'
import {
} from '../actions'
import {
  getIsUserAuthenticated,
} from '../selectors'


const mapStateToProps = state => ({
  isUserAuthenticated: getIsUserAuthenticated(state),
})


const mapDispatchToProps = dispatch => ({
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProtectedRoute)
