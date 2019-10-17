import { connect } from 'react-redux'
import MapsWindow from '../components/MapsWindow'
import {
  refreshAssetsKit,
} from '../actions'
import {
  setAssetsFilterKeys,
  setAssetsFilterValues,
  toggleAssetsFilterKey,
} from '../actions'
import {
  getAssetsFilterKeysByAttribute,
  getAssetsFilterValueByAttribute,
  getAssetTypeById,
  getAssetCountByAssetTypeId,
} from '../selectors'

const mapStateToProps = state => ({
  assetFilterValueByAttribute: getAssetsFilterValueByAttribute(state),
  assetFilterKeysByAttribute: getAssetsFilterKeysByAttribute(state),
  assetTypeById: getAssetTypeById(state),
  assetCountByAssetTypeId: getAssetCountByAssetTypeId(state),
})


const mapDispatchToProps = dispatch => ({
  refreshAssetsKit: payload => {dispatch(
    refreshAssetsKit(payload))},
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
)(MapsWindow)
