import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import AssetTypeRadioButtons from './AssetTypeRadioButtons'

class AssetAddDialog extends Component {
  state = {
    assetTypeId: '7',
  }

  handleAssetTypeClick = assetTypeId => {
    this.setState({assetTypeId: assetTypeId})}

  handleCancel = () => {
    this.props.onClose()
  }

  handleOk = () => {
    this.props.onClose(this.state.assetTypeId)
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
