import { connect } from 'react-redux'
import MapsWindow from '../components/MapsWindow'
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
)(MapsWindow)
