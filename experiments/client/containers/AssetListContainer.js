import { connect } from 'react-redux'
import {
  toggleAssetRelation,
} from '../actions'
import AssetList from '../components/AssetList'
import {
  getVisibleAssets,
} from '../selectors'

const mapStateToProps = state => ({
  locatingAssetId: state.locatingAssetId,
})

const mapDispatchToProps = dispatch => ({
  toggleAssetRelation: payload => {dispatch(
    toggleAssetRelation(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetList)
