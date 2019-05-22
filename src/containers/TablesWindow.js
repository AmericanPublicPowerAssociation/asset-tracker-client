import { connect } from 'react-redux'
import TablesWindow from '../components/TablesWindow'
import {
  refreshAssets,
} from '../actions'


const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
  refreshAssets: payload => {dispatch(
    refreshAssets(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TablesWindow)
