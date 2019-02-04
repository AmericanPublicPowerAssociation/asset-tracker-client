import { connect } from 'react-redux'
import ApplicationBar from '../components/ApplicationBar'

const mapStateToProps = state => ({
  exposedAssetId: state.exposedAssetId,
  exposedAssetKey: state.exposedAssetKey,
  assetById: state.assetById,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationBar)
