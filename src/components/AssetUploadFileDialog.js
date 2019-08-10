import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import {DropzoneArea} from 'material-ui-dropzone'

const styles = theme => ({
  attribute: {
    margin: `${theme.spacing(3)}px 0 0 0`,
  },
})


class AssetAddDialog extends PureComponent {

  onCancel = () => {
    const { onClose } = this.props;
      onClose()
  };

  onOk = () => {
    const { onSave, addingAsset } = this.props;
      onSave(addingAsset.get('assetCSVFile'))
  };

  render() {
    const {
      addingAsset,
      uploaderProps,
      setAssetCSVFile
    } = this.props
    const open = addingAsset.get('uploaderIsOpen')
    return (
      <Dialog
        open={open}
        onClose={this.onCancel}
        disableBackdropClick
      >
        <DialogTitle>Add Asset</DialogTitle>
        <DialogContent>
            <DropzoneArea {...uploaderProps} onChange={setAssetCSVFile}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCancel}>Cancel</Button>
          <Button onClick={this.onOk} color='primary'>Ok</Button>
        </DialogActions>
      </Dialog>
    )
  }
}


export default withStyles(styles)(AssetAddDialog)
