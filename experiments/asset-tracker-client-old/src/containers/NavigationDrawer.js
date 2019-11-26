import { connect } from 'react-redux'
import {
  getAuthUrl,
  getIsUserAuthenticated,
} from 'appa-auth-consumer'
import NavigationDrawer from '../components/NavigationDrawer'
import {
  closeNavigationDrawer,
} from '../actions'
import {
  getIsNavigationDrawerOpen,
} from '../selectors'


const mapStateToProps = state => ({
  authUrl: getAuthUrl(state),
  isNavigationDrawerOpen: getIsNavigationDrawerOpen(state),
  isUserAuthenticated: getIsUserAuthenticated(state),
})


const mapDispatchToProps = dispatch => ({
  closeNavigationDrawer: payload => {dispatch(
    closeNavigationDrawer(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationDrawer)
