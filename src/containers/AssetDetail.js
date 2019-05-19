import { connect } from 'react-redux'
import AssetDetail from '../components/AssetDetail'
import {
  updateAsset,
} from '../actions'
import {
  getFocusingAsset,
} from '../selectors'


const mapStateToProps = state => ({
  focusingAsset: getFocusingAsset(state),
})


const mapDispatchToProps = dispatch => ({
  updateAsset: (...args) => {dispatch(
    updateAsset(...args))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetDetail)
