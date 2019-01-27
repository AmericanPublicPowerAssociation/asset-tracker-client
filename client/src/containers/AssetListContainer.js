import { connect } from 'react-redux'
import AssetList from '../components/AssetList'

const mapStateToProps = state => ({
  assetById: state.assetById,
  visibleAssetIds: state.visibleAssetIds,
})

export default connect(
  mapStateToProps,
)(AssetList)
