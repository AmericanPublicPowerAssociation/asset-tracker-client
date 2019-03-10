import { connect } from 'react-redux'
import {
  addSelectedAssetType,
  addAsset,
  setFocusingAsset,
} from '../actions'
import AssetAddDialog from '../components/AssetAddDialog'

const mapDispatchToProps = dispatch => ({
  addSelectedAssetType: payload => {dispatch(
    addSelectedAssetType(payload))},
  addAsset: payload => {dispatch(
    addAsset(payload))},
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))},
})

export default connect(
  null,
  mapDispatchToProps,
)(AssetAddDialog)
