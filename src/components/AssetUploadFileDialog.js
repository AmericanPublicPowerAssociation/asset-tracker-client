import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DropzoneArea } from 'material-ui-dropzone'
import Grid from "@material-ui/core/Grid";
import {TextField} from "@material-ui/core";

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
      onSave({
        file: addingAsset.get('assetCSVFile'),
        overwrite: addingAsset.get('overwrite'),
      })
  };

  render() {
    const {
      addingAsset,
      setOverwriteRecords,
      uploaderProps,
      setAssetCSVFile
    } = this.props
    const loading = addingAsset.get('loading')
    const open = addingAsset.get('uploaderIsOpen')
    const overwriteRecords = addingAsset.get('overwrite')
    
    return (
      <Dialog
        open={open}
        onClose={this.onCancel}
        disableBackdropClick
      >
        <DialogTitle>Add Asset</DialogTitle>
        <DialogContent>
            <DropzoneArea {...uploaderProps} onChange={setAssetCSVFile}/>
          { loading ? <Grid style={{ marginTop: '20px' }} container     align="center"
                                         justify="center"
                                         direction="column">
            <CircularProgress  size={20} />
            <p>Wait patiently, this could take a while! </p>
          </Grid> : null}
        </DialogContent>
        <DialogActions>
          <FormControlLabel control={
            <Checkbox checked={overwriteRecords}  onChange={setOverwriteRecords}  />
          } label='Overwrite existing records'/>
          <Button disabled={loading} onClick={this.onCancel}>Cancel</Button>
          <Button disabled={loading} onClick={this.onOk} color='primary'>Ok</Button>
        </DialogActions>
      </Dialog>
    )
  }
}


export default withStyles(styles)(AssetAddDialog)
