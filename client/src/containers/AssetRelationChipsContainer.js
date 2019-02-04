import { connect } from 'react-redux'
import {
  setExposedAsset,
} from '../actions'
import AssetRelationChips from '../components/AssetRelationChips'

const mapStateToProps = state => ({
  highlightedAssetId: state.highlightedAssetId,
  exposedAssetId: state.exposedAssetId,
  exposedAssetKey: state.exposedAssetKey,
  assetById: state.assetById,
})

const mapDispatchToProps = dispatch => ({
  setExposedAsset: payload => {dispatch(
    setExposedAsset(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetRelationChips)
