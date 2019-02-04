import { connect } from 'react-redux'
import {
  addAsset,
  addSelectedAssetType,
  setHighlightedAsset,
} from '../actions'
import AssetAddDialog from '../components/AssetAddDialog'

const mapDispatchToProps = dispatch => ({
  addAsset: payload => {dispatch(
    addAsset(payload))},
  addSelectedAssetType: payload => {dispatch(
    addSelectedAssetType(payload))},
  setHighlightedAsset: payload => {dispatch(
    setHighlightedAsset(payload))},
})

export default connect(
  null,
  mapDispatchToProps,
)(AssetAddDialog)
