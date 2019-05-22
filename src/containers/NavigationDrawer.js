import { connect } from 'react-redux'
import NavigationDrawer from '../components/NavigationDrawer'
import {
  closeNavigationDrawer,
  signIn,
  signOut,
} from '../actions'
import {
  getIsNavigationDrawerOpen,
  getIsUserAuthenticated,
} from '../selectors'


const mapStateToProps = state => ({
  isNavigationDrawerOpen: getIsNavigationDrawerOpen(state),
  isUserAuthenticated: getIsUserAuthenticated(state),
})


const mapDispatchToProps = dispatch => ({
  closeNavigationDrawer: payload => {dispatch(
    closeNavigationDrawer(payload))},
  signIn: payload => {dispatch(
    signIn(payload))},
  signOut: payload => {dispatch(
    signOut(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationDrawer)
