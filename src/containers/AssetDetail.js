import { connect } from 'react-redux'
import AssetDetail from '../components/AssetDetail'
import {
  changeAsset,
  mergeAsset,
} from '../actions'
import {
  getFocusingAsset,
} from '../selectors'


const mapStateToProps = state => ({
  focusingAsset: getFocusingAsset(state),
})


const mapDispatchToProps = dispatch => ({
  mergeAsset: payload => {dispatch(
    mergeAsset(payload))},
  changeAsset: (...args) => {dispatch(
    changeAsset(...args))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetDetail)
