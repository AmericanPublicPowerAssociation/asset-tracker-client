import { connect } from 'react-redux'
import AssetAddDialog from '../components/AssetAddDialog'
import {
  addAsset,
  closeAssetAddDialog,
  setAddingAssetValues,
} from '../actions'
import {
  getAddingAsset,
} from '../selectors'


const mapStateToProps = state => ({
  addingAsset: getAddingAsset(state),
})


const mapDispatchToProps = dispatch => ({
  closeAssetAddDialog: payload => {dispatch(
    closeAssetAddDialog(payload))},
  setAddingAssetValues: payload => {dispatch(
    setAddingAssetValues(payload))},
  addAsset: payload => {dispatch(
    addAsset(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetAddDialog)
