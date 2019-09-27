import { connect } from 'react-redux'
import CircuitsWindow from '../components/CircuitsWindow'
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
)(CircuitsWindow)
