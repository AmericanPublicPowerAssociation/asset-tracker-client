import { connect } from 'react-redux'
import {
  addAsset,
} from '../actions'
import AssetAddDialog from '../components/AssetAddDialog'


const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
  addAsset: payload => {dispatch(
    addAsset(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetAddDialog)
