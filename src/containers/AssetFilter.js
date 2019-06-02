import { connect } from 'react-redux'
import AssetFilter from '../components/AssetFilter'
import {
  setAssetFilterKeys,
  setAssetFilterValue,
  toggleAssetFilterKey,
} from '../actions'
import {
  getAssetFilterKeysByAttribute,
  getAssetFilterValueByAttribute,
  getAssetTypeById,
  getCountByAssetTypeId,
} from '../selectors'


const mapStateToProps = state => ({
  assetFilterValueByAttribute: getAssetFilterValueByAttribute(state),
  assetFilterKeysByAttribute: getAssetFilterKeysByAttribute(state),
  assetTypeById: getAssetTypeById(state),
  countByAssetTypeId: getCountByAssetTypeId(state),
})


const mapDispatchToProps = dispatch => ({
  setAssetFilterValue: payload => {dispatch(
    setAssetFilterValue(payload))},
  setAssetFilterKeys: payload => {dispatch(
    setAssetFilterKeys(payload))},
  toggleAssetFilterKey: payload => {dispatch(
    toggleAssetFilterKey(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetFilter)
