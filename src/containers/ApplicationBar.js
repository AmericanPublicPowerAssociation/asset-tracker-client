import { connect } from 'react-redux'
import ApplicationBar from '../components/ApplicationBar'
import {
  openAssetAddDialog,
  openNavigationDrawer,
  setFocusingAsset,
  setRelatingAsset,
} from '../actions'
import {
  getIsInformationDrawerOpen,
  getIsNavigationDrawerOpen,
  getIsUserMember,
  getFocusingAssetId,
  getRelatingAsset,
  getRelatingAssetKey,
} from '../selectors'


const mapStateToProps = state => ({
  isUserMember: getIsUserMember(state),
  isNavigationDrawerOpen: getIsNavigationDrawerOpen(state),
  isInformationDrawerOpen: getIsInformationDrawerOpen(state),
  focusingAssetId: getFocusingAssetId(state),
  relatingAsset: getRelatingAsset(state),
  relatingAssetKey: getRelatingAssetKey(state),
})


const mapDispatchToProps = dispatch => ({
  openAssetAddDialog: payload => {dispatch(
    openAssetAddDialog(payload))},
  openNavigationDrawer: payload => {dispatch(
    openNavigationDrawer(payload))},
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))},
  setRelatingAsset: payload => {dispatch(
    setRelatingAsset(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationBar)
