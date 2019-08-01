import { connect } from 'react-redux'
import {
  getAuthUrl,
  getIsUserAuthenticated,
} from 'appa-auth-consumer'
import NotAuthenticatedWindow from '../components/NotAuthenticatedWindow'


const mapStateToProps = state => ({
  authUrl: getAuthUrl(state),
//   isNavigationDrawerOpen: getIsNavigationDrawerOpen(state),
  isUserAuthenticated: getIsUserAuthenticated(state),
})


const mapDispatchToProps = dispatch => ({
//   closeNavigationDrawer: payload => {dispatch(
//     closeNavigationDrawer(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotAuthenticatedWindow)
