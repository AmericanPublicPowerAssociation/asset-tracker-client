import { connect } from 'react-redux'
import AssetDetail from '../components/AssetDetail'
import {
  changeAsset,
  replaceAsset,
} from '../actions'
import {
  getFocusingAsset,
} from '../selectors'


const mapStateToProps = state => ({
  focusingAsset: getFocusingAsset(state),
})


const mapDispatchToProps = dispatch => ({
  changeAsset: payload => {dispatch(
    changeAsset(payload))},
  replaceAsset: payload => {dispatch(
    replaceAsset(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetDetail)
