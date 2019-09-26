import { connect } from 'react-redux'
import AssetsCircuit from '../components/AssetsCircuit'
import {
  getAssetById,
  getFocusingAssetId,
  getSelectedAssets,
  getSelectedAssetIds,
  getConnectionGraph,
} from '../selectors'


const mapStateToProps = state => ({
  assetById: getAssetById(state),
  selectedAssets: getSelectedAssets(state),
  selectedAssetIds: getSelectedAssetIds(state),
  connectionGraph: getConnectionGraph(state),
  focusingAssetId: getFocusingAssetId(state),
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetsCircuit)
