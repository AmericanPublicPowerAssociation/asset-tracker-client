import { connect } from 'react-redux'
import {
  setHighlightedAsset,
} from '../actions'
import TableWindow from '../components/TableWindow'

const mapStateToProps = state => ({
  assetById: state.assetById,
})

const mapDispatchToProps = dispatch => ({
  setHighlightedAsset: payload => {dispatch(
    setHighlightedAsset(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableWindow)
