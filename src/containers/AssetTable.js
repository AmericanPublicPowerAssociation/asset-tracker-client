import { connect } from 'react-redux'
import AssetTable from '../components/AssetTable'
import {
  setFocusingAsset,
} from '../actions'
import {
  getFocusingAssetId,
  getVisibleAssets,
} from '../selectors'


const mapStateToProps = state => ({
  visibleAssets: getVisibleAssets(state),
  focusingAssetId: getFocusingAssetId(state),
})


const mapDispatchToProps = dispatch => ({
  setFocusingAsset: payload => {dispatch(
    setFocusingAsset(payload))}
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetTable)
