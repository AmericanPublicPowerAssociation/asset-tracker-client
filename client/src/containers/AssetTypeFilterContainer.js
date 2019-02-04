import { connect } from 'react-redux'
import { toggleSelectedAssetType } from '../actions'
import AssetTypeCheckboxes from '../components/AssetTypeCheckboxes'

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
)(AssetTypeCheckboxes)
