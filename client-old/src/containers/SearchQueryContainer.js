import { connect } from 'react-redux'
import { setSelected, handleSearchAssets } from '../actions'
import SearchQuery from '../components/SearchQuery'


const mapStateToProps = (state, ownProps) => ({
  editMode: state.editMode
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSelected: (asset) => dispatch(setSelected(asset)),
  searchAssets: (filters) => dispatch(handleSearchAssets(filters))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchQuery)
