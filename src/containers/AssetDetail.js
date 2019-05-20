import { connect } from 'react-redux'
import AssetDetail from '../components/AssetDetail'
import {
  changeAsset,
} from '../actions'
import {
  getFocusingAsset,
} from '../selectors'


const mapStateToProps = state => ({
  focusingAsset: getFocusingAsset(state),
})


const mapDispatchToProps = dispatch => ({
  changeAsset: (...args) => {dispatch(
    changeAsset(...args))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetDetail)
