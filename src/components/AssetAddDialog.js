import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import AssetTypeSelect from './AssetTypeSelect'
import AssetName from './AssetName'
// import VendorName from './VendorName'
import {
  DEFAULT_ASSET_TYPE_ID,
} from '../constants'


const styles = theme => ({
  attribute: {
    margin: `${theme.spacing.unit * 3}px 0 0 0`,
  },
})


class AssetAddDialog extends PureComponent {
  state = {
    typeId: DEFAULT_ASSET_TYPE_ID,
    name: '',
    // vendorName: '',
  }

  onCancel = () => {
    const { onClose } = this.props
    onClose()
  }

  onOk = () => {
    const {
      onClose,
      // Get redux props
      addAsset,
    } = this.props
    const {
      typeId,
      name,
    } = this.state
    addAsset({typeId, name})
    onClose()
  }

  changeAssetType = event => {
    this.setState({typeId: event.target.value})}
  changeAssetName = event => {
    this.setState({name: event.target.value})}

  /*
  changeVendorName = event => {
    this.setState({vendorName: event.target.value})}
  */

  render = () => {
    const {
      classes,
      open,
      onClose,
    } = this.props
    const {
      typeId,
      name,
      // vendorName,
    } = this.state
    return (
      <Dialog
        open={open}
        onClose={onClose}
        disableBackdropClick
      >
        <DialogTitle>Add Asset</DialogTitle>
        <DialogContent>
          <AssetTypeSelect
            value={typeId}
            onChange={this.changeAssetType}
          />
          <AssetName
            value={name}
            onChange={this.changeAssetName}
            className={classes.attribute}
          />
          {/*
          <VendorName
            value={vendorName}
            onChange={this.changeVendorName}
            className={classes.attribute}
          />
          */}
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
