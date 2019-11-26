import { connect } from 'react-redux'
import MapsWindow from '../components/MapsWindow'
import {
  refreshAssetsKit,
} from '../actions'
import {
  setAssetsFilterProximity,
  setAssetsFilterKeys,
  setAssetsFilterValues,
  toggleAssetsFilterKey,
  deselectEverything,
} from '../actions'
import {
  getAssetsFilterByProximity,
  getAssetsFilterKeysByAttribute,
  getAssetsFilterValueByAttribute,
  getAssetTypeById,
  getAssetCountByAssetTypeId,
} from '../selectors'

const mapStateToProps = state => ({
  assetFilterByProximity: getAssetsFilterByProximity(state),
  assetFilterValueByAttribute: getAssetsFilterValueByAttribute(state),
  assetFilterKeysByAttribute: getAssetsFilterKeysByAttribute(state),
  assetTypeById: getAssetTypeById(state),
  assetCountByAssetTypeId: getAssetCountByAssetTypeId(state),
  filterByProximitySwitch: true,
})


const mapDispatchToProps = dispatch => ({
  setAssetsFilterProximity: payload =>{dispatch(
    setAssetsFilterProximity(payload))},
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
)(MapsWindow)
