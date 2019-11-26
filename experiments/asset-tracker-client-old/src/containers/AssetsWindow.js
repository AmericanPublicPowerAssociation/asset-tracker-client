import { connect } from 'react-redux'
import AssetsWindow from '../components/AssetsWindow'
import {
  refreshAssetsKit,
} from '../actions'
import {
  setAssetsFilterKeys,
  setAssetsFilterValues,
  toggleAssetsFilterKey,
  deselectEverything,
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
  deselectEverything: payload => {dispatch(
    deselectEverything())}
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetsWindow)
