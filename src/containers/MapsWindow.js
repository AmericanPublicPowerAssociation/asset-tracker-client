import { connect } from 'react-redux'
import MapsWindow from '../components/MapsWindow'
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
)(MapsWindow)
