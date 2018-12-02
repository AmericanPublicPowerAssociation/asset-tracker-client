import { connect } from 'react-redux'
import { setSelected, toggleEdit } from '../actions'
import AssetsGrid from '../components/AssetsGrid'


const mapStateToProps = (state, ownProps) => ({
  assets: state.assets,
	selectedAsset: state.selectedAsset,
	editMode: state.editMode,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSelected: (asset) => dispatch(setSelected(asset)),
	toggleEdit: (val) => dispatch(toggleEdit(val))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetsGrid)
