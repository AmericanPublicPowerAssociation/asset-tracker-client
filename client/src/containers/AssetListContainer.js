import { connect } from 'react-redux'
import AssetList from '../components/AssetList'

const mapStateToProps = state => ({
  assetById: state.assetById,
  selectedAssetTypeIds: state.selectedAssetTypeIds,
  sortedAssetIds: state.sortedAssetIds,
})

export default connect(
  mapStateToProps,
)(AssetList)
