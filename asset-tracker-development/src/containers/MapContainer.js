import { connect } from 'react-redux'
import { setSelected } from '../actions'
import Map from '../components/Map'


const mapStateToProps = (state, ownProps) => ({
  markers: state.assets,
	selectedAsset: state.selectedAsset,
	editMode: state.editMode,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSelected: (asset) => dispatch(setSelected(asset)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
