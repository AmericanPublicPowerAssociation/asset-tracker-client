import { connect } from 'react-redux'
import { toggleSelectedAssetType } from '../actions'
import AssetTypeFilter from '../components/AssetTypeFilter'

const mapStateToProps = state => ({
  selectedAssetTypeIds: state.selectedAssetTypeIds,
})

const mapDispatchToProps = dispatch => ({
  onAssetTypeClick: assetTypeId => {dispatch(
    toggleSelectedAssetType(assetTypeId))}
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetTypeFilter)
