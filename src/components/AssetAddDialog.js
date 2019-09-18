import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import AssetTypeSelect from '../containers/AssetTypeSelect'
import AssetName from './AssetName'


const styles = theme => ({
  attribute: {
    margin: `${theme.spacing(3)}px 0 0 0`,
  },
})


class AssetAddDialog extends PureComponent {

  onCancel = () => {
    const { closeAssetAddDialog } = this.props
    closeAssetAddDialog()
  }

  onOk = () => {
    const { addingAsset, addAsset } = this.props
    addAsset(addingAsset)
  }

  render() {
    const {
      classes,
      addingAsset,
      setAddingAssetValues,
    } = this.props
    const open = addingAsset.get('isOpen')
    const typeId = addingAsset.get('typeId')
    const name = addingAsset.get('name')
    const errors = addingAsset.get('errors')
    return (
      <Dialog
        open={open}
        onClose={this.onCancel}
        disableBackdropClick
      >
        <DialogTitle>Add Asset</DialogTitle>
        <DialogContent>
          <AssetTypeSelect
            value={typeId}
            onChange={event => setAddingAssetValues({
              typeId: event.target.value})}
          />
          <AssetName
            name={name}
            errorText={errors.get('name')}
            className={classes.attribute}
            onChange={event => setAddingAssetValues({
              name: event.target.value})}
          />
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
