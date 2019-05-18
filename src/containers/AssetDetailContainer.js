import { connect } from 'react-redux'
import AssetDetail from '../components/AssetDetail'
import {
  getFocusingAsset,
} from '../selectors'


const mapStateToProps = state => ({
  focusingAsset: getFocusingAsset(state),
})


const mapDispatchToProps = dispatch => ({
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetDetail)
