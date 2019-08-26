import { connect } from 'react-redux'
import TablesWindow from '../components/TablesWindow'
import {
  refreshAssetsKit,
} from '../actions'


const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
  refreshAssetsKit: payload => {dispatch(
    refreshAssetsKit(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TablesWindow)
