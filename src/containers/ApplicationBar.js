import { connect } from 'react-redux'
import {
  getIsUserMember,
} from 'appa-auth-consumer'
import ApplicationBar from '../components/ApplicationBar'
import {
  openAssetAddDialog,
  openNavigationDrawer,
  openAssetsUploadDialog,
  downloadAssetsUploadDialog,
  downloadAssetsDss,
  setFocusingAsset,
  setLocatingAsset,
  setRelatingAsset,
} from '../actions'
import {
  getIsInformationDrawerOpen,
  getIsNavigationDrawerOpen,
  getFocusingAssetId,
  getLocatingAsset,
  getRelatingAsset,
  getRelatingAssetKey, getCountByAssetTypeId,
} from '../selectors'


const mapStateToProps = state => ({
  isUserMember: getIsUserMember(state),
  isNavigationDrawerOpen: getIsNavigationDrawerOpen(state),
  isInformationDrawerOpen: getIsInformationDrawerOpen(state),
  focusingAssetId: getFocusingAssetId(state),
  locatingAsset: getLocatingAsset(state),
  relatingAsset: getRelatingAsset(state),
  relatingAssetKey: getRelatingAssetKey(state),
  countByAssetTypeId: getCountByAssetTypeId(state),
})


const mapDispatchToProps = dispatch => ({
  openAssetAddDialog: payload => {dispatch(
    openAssetAddDialog(payload))},
  openNavigationDrawer: payload => {dispatch(
    openNavigationDrawer(payload))},
  openAssetsUploadDialog: payload => {dispatch(
    openAssetsUploadDialog(payload))},
  downloadAssetsUploadDialog: payload => {dispatch(
    downloadAssetsUploadDialog(payload))},
  downloadDSSAssets: payload => {dispatch(
    downloadAssetsDss(payload))},
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))},
  setLocatingAsset: payload => {dispatch(
    setLocatingAsset(payload))},
  setRelatingAsset: payload => {dispatch(
    setRelatingAsset(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationBar)
