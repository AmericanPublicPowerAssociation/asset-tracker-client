import { connect } from 'react-redux'
import AssetFilter from '../components/AssetFilter'
import {
  setAssetAttributeFilters,
  setAssetFilter,
  toggleAssetAttributeFilter,
} from '../actions'
import {
  getAssetFilter,
  getAssetFiltersByAttribute,
  getCountByAssetTypeId,
} from '../selectors'


const mapStateToProps = state => ({
  assetFilter: getAssetFilter(state),
  assetFiltersByAttribute: getAssetFiltersByAttribute(state),
  countByAssetTypeId: getCountByAssetTypeId(state),
})


const mapDispatchToProps = dispatch => ({
  setAssetFilter: payload => {dispatch(
    setAssetFilter(payload))},
  setAssetAttributeFilters: payload => {dispatch(
    setAssetAttributeFilters(payload))},
  toggleAssetAttributeFilter: payload => {dispatch(
    toggleAssetAttributeFilter(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetFilter)
