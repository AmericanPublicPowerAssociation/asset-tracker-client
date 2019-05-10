import { connect } from 'react-redux'
import {
  refreshAssets,
} from '../actions'
import TablesWindow from '../components/TablesWindow'
import {
  getVisibleAssets,
} from '../selectors'


const mapStateToProps = state => ({
  visibleAssets: getVisibleAssets(state),
})


const mapDispatchToProps = dispatch => ({
  refreshAssets: payload => {dispatch(
    refreshAssets(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TablesWindow)
