import { connect } from 'react-redux'
import {
  addAsset,
  addSelectedAssetType,
  highlightAsset,
} from '../actions'
import AssetAddDialog from '../components/AssetAddDialog'

const mapDispatchToProps = dispatch => ({
  addAsset: asset => {dispatch(
    addAsset(asset))},
  addSelectedAssetType: assetTypeId => {dispatch(
    addSelectedAssetType(assetTypeId))},
  highlightAsset: assetId => {dispatch(
    highlightAsset(assetId))},
})

export default connect(
  null,
  mapDispatchToProps,
)(AssetAddDialog)
