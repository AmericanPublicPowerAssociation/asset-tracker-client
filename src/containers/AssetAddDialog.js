import { connect } from 'react-redux'
import AssetAddDialog from '../components/AssetAddDialog'
import {
  addAsset,
} from '../actions'


const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
  addAsset: (...args) => {dispatch(
    addAsset(...args))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetAddDialog)
