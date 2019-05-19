import { connect } from 'react-redux'
import AssetFilter from '../components/AssetFilter'
import {
  setAssetNameQuery,
  toggleSelectedAssetType,
} from '../actions'
import {
  getAssetNameQuery,
  getCountByAssetTypeId,
  getSelectedAssetTypeIds,
} from '../selectors'


const mapStateToProps = state => ({
  assetNameQuery: getAssetNameQuery(state),
  countByAssetTypeId: getCountByAssetTypeId(state),
  selectedAssetTypeIds: getSelectedAssetTypeIds(state),
})


const mapDispatchToProps = dispatch => ({
  setAssetNameQuery: payload => {dispatch(
    setAssetNameQuery(payload))},
  toggleSelectedAssetType: payload => {dispatch(
    toggleSelectedAssetType(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetFilter)
