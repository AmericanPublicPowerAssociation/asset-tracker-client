import { connect } from 'react-redux'
import MapsWindow from '../components/MapsWindow'
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
)(MapsWindow)
