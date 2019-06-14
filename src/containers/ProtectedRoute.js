import { connect } from 'react-redux'
import {
  getIsUserAuthenticated,
} from 'appa-auth-client'
import ProtectedRoute from '../components/ProtectedRoute'
import {
} from '../actions'


const mapStateToProps = state => ({
  isUserAuthenticated: getIsUserAuthenticated(state),
})


const mapDispatchToProps = dispatch => ({
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProtectedRoute)
