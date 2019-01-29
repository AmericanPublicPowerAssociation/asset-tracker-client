import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import AssetTypeRadioButtons from './AssetTypeRadioButtons'
import { ASSET_TYPE_BY_ID } from '../constants'
import { getRandomString } from '../macros'

class AssetAddDialog extends Component {
  state = {
    assetTypeId: '7',
  }

  handleAssetTypeClick = assetTypeId => {
    this.setState({assetTypeId: assetTypeId})
  }

  handleCancel = () => {
    this.props.onClose()}

  handleOk = () => {
    const assetTypeId = this.state.assetTypeId
    const assetTypeName = ASSET_TYPE_BY_ID[assetTypeId]['name']
    const assetId = getRandomString(7)
    this.props.addSelectedAssetType(assetTypeId)
    this.props.addAsset({
      'id': assetId,
      'name': assetTypeName + ' ' + assetId,
      'typeId': assetTypeId})
    this.props.highlightAsset(assetId)
    this.props.onClose(assetTypeId)
  }

  render() {
    const { ...etc } = this.props
    const { assetTypeId } = this.state
    return (
      <Dialog {...etc}>
        <DialogTitle>Add Asset</DialogTitle>
        <DialogContent>
          <AssetTypeRadioButtons
            selectedAssetTypeId={assetTypeId}
            onAssetTypeClick={this.handleAssetTypeClick}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel}>Cancel</Button>
          <Button onClick={this.handleOk} color="primary">Ok</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AssetAddDialog
