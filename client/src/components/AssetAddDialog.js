import React, { PureComponent } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import AssetTypeRadioButtons from './AssetTypeRadioButtons'
import {
  // ASSET_TYPE_BY_ID,
  DEFAULT_ASSET_TYPE_ID,
} from '../constants'
import { getRandomString } from '../macros'

class AssetAddDialog extends PureComponent {
  state = {
    assetTypeId: DEFAULT_ASSET_TYPE_ID,
    assetName: '',
    vendorName: '',
  }

  onAssetTypeClick = ({id}) => {
    this.setState({assetTypeId: id})}

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
    // const assetTypeName = ASSET_TYPE_BY_ID[assetTypeId]['name']
    const assetId = getRandomString(7)
    addSelectedAssetType({id: assetTypeId})
    addAsset({
      id: assetId,
      typeId: assetTypeId,
      // name: assetTypeName + ' ' + assetId,
      name: assetName,
      vendorName: vendorName,
    })
    setFocusingAsset({id: assetId})
    onClose()}

  render() {
    const { open, onClose } = this.props
    const { assetTypeId } = this.state
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Asset</DialogTitle>
        <DialogContent>
          <AssetTypeRadioButtons
            selectedAssetTypeId={assetTypeId}
            onAssetTypeClick={this.onAssetTypeClick}
          />
          <TextField
            fullWidth
            label='Asset Name'
            placeholder='x'
            helperText='y'
            onChange={this.onAssetNameChange}
          />
          <TextField 
            fullWidth 
            label='Vendor Name' 
            placeholder='c' 
            helperText='d' 
            onChange={this.onVendorNameChange}
          />
          <TextField fullWidth label='Approximate Location' placeholder='z' helperText='a' />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCancel}>Cancel</Button>
          <Button onClick={this.onOk} color='primary'>Ok</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AssetAddDialog
