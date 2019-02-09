import { connect } from 'react-redux'
import AssetMap from '../components/AssetMap'

const mapStateToProps = state => ({
  selectedAssetTypeIds: state.selectedAssetTypeIds,
})

export default connect(
  mapStateToProps,
)(AssetMap)
