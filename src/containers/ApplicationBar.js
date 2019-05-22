import { connect } from 'react-redux'
import ApplicationBar from '../components/ApplicationBar'
import {
  openAssetAddDialog,
  openNavigationDrawer,
} from '../actions'
import {
  getIsInformationDrawerOpen,
  getIsNavigationDrawerOpen,
  getIsUserMember,
} from '../selectors'


const mapStateToProps = state => ({
  isUserMember: getIsUserMember(state),
  isNavigationDrawerOpen: getIsNavigationDrawerOpen(state),
  isInformationDrawerOpen: getIsInformationDrawerOpen(state),
})


const mapDispatchToProps = dispatch => ({
  openAssetAddDialog: payload => {dispatch(
    openAssetAddDialog(payload))},
  openNavigationDrawer: payload => {dispatch(
    openNavigationDrawer(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationBar)
