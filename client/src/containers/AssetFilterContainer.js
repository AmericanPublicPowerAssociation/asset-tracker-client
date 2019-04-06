import { connect } from 'react-redux'
import { setSelectedAssetTypes } from '../actions'
import AssetFilter from '../components/AssetFilter'

const mapStateToProps = state => ({
  selectedAssetTypeIds: state.selectedAssetTypeIds,
})

const mapDispatchToProps = dispatch => ({
  setSelectedAssetTypes: payload => {dispatch(
    setSelectedAssetTypes(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetFilter)
