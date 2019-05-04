import { connect } from 'react-redux'
import { setSelectedAssetTypes, setSearchTerm, toggleSelectedAssetType } from '../actions'
// import AssetFilter from '../components/AssetFilter'
import AssetFilterUpdate from '../components/AssetFilterUpdate'

const mapStateToProps = state => ({
  selectedAssetTypeIds: state.selectedAssetTypeIds,
})

const mapDispatchToProps = dispatch => ({
  setSelectedAssetTypes: payload => {dispatch(
    setSelectedAssetTypes(payload))},
  onAssetTypeClick: payload => {dispatch(
    toggleSelectedAssetType(payload))},
  setSearchTerm: payload => {dispatch(
    setSearchTerm(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetFilterUpdate)
