import { connect } from 'react-redux'
import TablesWindow from '../components/TablesWindow'
import {
  refreshAssets,
  refreshAssetTypes,
} from '../actions'


const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
  refreshAssetTypes: payload => {dispatch(
    refreshAssetTypes(payload))},
  refreshAssets: payload => {dispatch(
    refreshAssets(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TablesWindow)
