import { connect } from 'react-redux'
import {
  closeAssetsUploadDialog,
  uploadAssetsCsv,
  setAssetCSVFile,
} from '../actions'
import {
  getAddingAsset,
} from '../selectors'
import AssetUploadFileDialog from '../components/AssetUploadFileDialog'


const mapStateToProps = state => ({
  addingAsset: getAddingAsset(state),
  uploaderProps: {
    acceptedFiles: ['text/csv'],
    filesLimit: 1,
    showPreviewsInDropzone: true,
    showFileNamesInPreview: true,
    showFileNames: true,
  }
})


const mapDispatchToProps = dispatch => ({
  onClose: payload => {dispatch(
    closeAssetsUploadDialog(payload))},
  onSave: payload => {dispatch(
    uploadAssetsCsv(payload))},
  setAssetCSVFile: payload => {
    dispatch(
    setAssetCSVFile(payload))
  },
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetUploadFileDialog)
