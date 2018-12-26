import { connect } from 'react-redux'
import { handleSearchAssets } from '../actions'
import AssetsTable from '../components/AssetsTable'


const mapStateToProps = (state, ownProps) => ({
  assets: state.assets
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadData: () => dispatch(handleSearchAssets({}))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetsTable)
