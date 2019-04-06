import { connect } from 'react-redux'
import { toggleSelectedAssetType } from '../actions'
import AssetFilter from '../components/AssetFilter'

const mapStateToProps = state => ({
  selectedAssetTypeIds: state.selectedAssetTypeIds,
})

const mapDispatchToProps = dispatch => ({
  onAssetTypeClick: payload => {dispatch(
    toggleSelectedAssetType(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetFilter)
