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
    assetTypeId: DEFAULT_ASSET_TYPE_ID,
    assetName: '',
    vendorName: '',
  }

  onCancel = () => {
    const { onClose } = this.props
    onClose()
  }

  onOk = () => {
  }

  changeAssetType = event => {
    const assetTypeId = event.target.value
    this.setState({
      assetTypeId: assetTypeId,
    })
  }

  changeAssetName = event => {
    this.setState({
      assetName: event.target.value,
    })
  }

  /*
  changeVendorName = event => {
    this.setState({
      vendorName: event.target.value,
    })
  }
  */

  render() {
    const {
      classes,
      open,
      onClose,
    } = this.props
    const {
      assetTypeId,
      assetName,
      // vendorName,
    } = this.state
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Asset</DialogTitle>
        <DialogContent>
          <AssetTypeSelect
            value={assetTypeId}
            onChange={this.changeAssetType}
          />
          <AssetName
            value={assetName}
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
