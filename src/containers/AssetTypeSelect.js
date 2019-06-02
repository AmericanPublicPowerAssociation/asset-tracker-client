import { connect } from 'react-redux'
import AssetTypeSelect from '../components/AssetTypeSelect'
import {
} from '../actions'
import {
  getAssetTypeById,
} from '../selectors'


const mapStateToProps = state => ({
  assetTypeById: getAssetTypeById(state),
})


const mapDispatchToProps = dispatch => ({
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetTypeSelect)
