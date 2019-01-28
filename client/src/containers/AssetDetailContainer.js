import { connect } from 'react-redux'
import AssetDetail from '../components/AssetDetail'

const mapStateToProps = state => ({
  assetById: state.assetById,
  highlightedAssetId: state.highlightedAssetId,
})

export default connect(
  mapStateToProps,
)(AssetDetail)
