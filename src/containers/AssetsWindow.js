import { connect } from 'react-redux'
import AssetsWindow from '../components/AssetsWindow'
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
)(AssetsWindow)
