import { connect } from 'react-redux'
import { setSelected, toggleEdit, handleRemoveAsset, handleAddAsset, handleEditAsset } from '../actions'
import AssetDetails from '../components/AssetDetails'


const mapStateToProps = (state, ownProps) => ({
	asset: state.selectedAsset,
	editMode: state.editMode,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSelected: (asset) => dispatch(setSelected(asset)),
	toggleEdit: (val) => {
    dispatch(toggleEdit(val))
  },
  deleteAsset: (asset) => dispatch(handleRemoveAsset(asset)),
  saveAsset: (asset) =>  {
    if (asset.id === '') {
      dispatch(handleAddAsset(asset))
    } 
    else {
      dispatch(handleEditAsset(asset))
    }
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetDetails)
