import { connect } from 'react-redux'
import { handleGetAssets } from '../actions'
import AssetsTable from '../components/AssetsTable'


const mapStateToProps = (state, ownProps) => ({
  assets: state.assets
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadData: () => dispatch(handleGetAssets())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetsTable)
