import { connect } from 'react-redux'
import AssetsFilter from '../components/AssetsFilter'
import {
  setAssetsFilterKeys,
  setAssetsFilterValues,
  toggleAssetsFilterKey,
} from '../actions'
import {
  getAssetsFilterKeysByAttribute,
  getAssetsFilterValueByAttribute,
  getAssetTypeById,
  //getCountByAssetTypeId,
} from '../selectors'


const mapStateToProps = state => ({
  assetFilterValueByAttribute: getAssetsFilterValueByAttribute(state),
  assetFilterKeysByAttribute: getAssetsFilterKeysByAttribute(state),
  assetTypeById: getAssetTypeById(state),
  //countByAssetTypeId: getCountByAssetTypeId(state),
})


const mapDispatchToProps = dispatch => ({
  setAssetsFilterValues: payload => {dispatch(
    setAssetsFilterValues(payload))},
  setAssetsFilterKeys: payload => {dispatch(
    setAssetsFilterKeys(payload))},
  toggleAssetsFilterKey: payload => {dispatch(
    toggleAssetsFilterKey(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetsFilter)
