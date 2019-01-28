import { connect } from 'react-redux'
import {
  addAsset,
  addSelectedAssetType,
} from '../actions'
import AssetAddDialog from '../components/AssetAddDialog'

const mapDispatchToProps = dispatch => ({
  addSelectedAssetType: assetTypeId => {dispatch(
    addSelectedAssetType(assetTypeId))},
  addAsset: asset => {dispatch(
    addAsset(asset))}
})

export default connect(
  null,
  mapDispatchToProps,
)(AssetAddDialog)
