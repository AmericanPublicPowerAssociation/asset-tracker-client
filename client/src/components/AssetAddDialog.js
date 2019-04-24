import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import AssetTypeSelect from './AssetTypeSelect'

import {
  ASSET_TYPE_BY_ID,
  DEFAULT_ASSET_TYPE_ID,
} from '../constants'
import { getRandomString } from '../macros'

const styles = theme => ({
  attribute: {
    margin: `${theme.spacing.unit * 3}px 0 0 0`,
  },
})

class AssetAddDialog extends PureComponent {
  state = {
    assetTypeId: DEFAULT_ASSET_TYPE_ID,
    assetName: ASSET_TYPE_BY_ID[DEFAULT_ASSET_TYPE_ID]['name']+ ' - ' + getRandomString(7),
    vendorName: '',
  }

  onAssetTypeChange = event => {
      const assetTypeId = event.target.value
      const assetTypeName = ASSET_TYPE_BY_ID[assetTypeId]['name']
      this.setState({
        assetTypeId:  assetTypeId,
        assetName: assetTypeName + ' - ' + getRandomString(7),
    })
  }

  onAssetNameChange = event => {
    this.setState({assetName: event.target.value})}

  onVendorNameChange = event => {
    this.setState({vendorName: event.target.value})}

  onCancel = () => {
    const { onClose } = this.props
    onClose()
  }

  onOk = () => {
    const {
      addSelectedAssetType,
      addAsset,
      setFocusingAsset,
      onClose,
    } = this.props
    const {
      assetTypeId,
      assetName,
      vendorName,
    } = this.state
      if (assetName === ""){
        alert('The Asset Name is empty, add a name to save.')
      }
      else {
          const assetId = getRandomString(7)
          addSelectedAssetType({id: assetTypeId})
          addAsset({
              id: assetId,
              typeId: assetTypeId,
              name: assetName,
              vendorName: vendorName,
          })
          setFocusingAsset({id: assetId})
          onClose()
      }

  }

  render() {
    const { classes, open, onClose } = this.props
    const { assetTypeId, assetName, vendorName } = this.state
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Asset</DialogTitle>
        <DialogContent>
          <AssetTypeSelect
						value={assetTypeId}
						onChange={this.onAssetTypeChange}
					/>
          <TextField
            fullWidth
            label='Asset Name'
            value={assetName}
            onChange={this.onAssetNameChange}
						className={classes.attribute}
          />
          <TextField 
            fullWidth 
            label='Vendor Name'
            value={vendorName}
            onChange={this.onVendorNameChange}
						className={classes.attribute}
          />
					{/*
          <TextField fullWidth label='Approximate Location' placeholder='z' helperText='a' />
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
