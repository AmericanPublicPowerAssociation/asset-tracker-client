import { connect } from 'react-redux'
import TablesWindow from '../components/TablesWindow'
import {
  refreshAssetsPack,
} from '../actions'


const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
  refreshAssetsPack: payload => {dispatch(
    refreshAssetsPack(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TablesWindow)
