import { connect } from 'react-redux'
import {
  setAssetNameQuery,
} from '../actions'
import AssetFilter from '../components/AssetFilter'


const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
  setAssetNameQuery: payload => {dispatch(
    setAssetNameQuery(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetFilter)
