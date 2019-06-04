import { connect } from 'react-redux'
import MapsWindow from '../components/MapsWindow'
import {
  refreshAssets,
  refreshAssetTypes,
} from '../actions'


const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
  refreshAssets: payload => {dispatch(
    refreshAssets(payload))},
  refreshAssetTypes: payload => {dispatch(
    refreshAssetTypes(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapsWindow)
