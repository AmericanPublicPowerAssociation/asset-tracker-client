import { connect } from 'react-redux'
import AssetAddDialog from '../components/AssetAddDialog'
import {
  addAsset,
  closeAssetAddDialog,
  setAddingAssetValue,
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
  setAddingAssetValue: payload => {dispatch(
    setAddingAssetValue(payload))},
  addAsset: payload => {dispatch(
    addAsset(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetAddDialog)
