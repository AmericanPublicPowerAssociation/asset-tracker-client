import { connect } from 'react-redux'
import {
  updateAsset,
  setExposedAsset,
} from '../actions'
import AssetDetail from '../components/AssetDetail'

const mapStateToProps = state => ({
  highlightedAssetId: state.highlightedAssetId,
  exposedAssetId: state.exposedAssetId,
  exposedAssetKey: state.exposedAssetKey,
  assetById: state.assetById,
})

const mapDispatchToProps = dispatch => ({
  updateAsset: payload => {dispatch(
    updateAsset(payload))},
  setExposedAsset: payload => {dispatch(
    setExposedAsset(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetDetail)
