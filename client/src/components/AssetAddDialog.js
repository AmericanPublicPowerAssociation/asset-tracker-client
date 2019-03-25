import React, { PureComponent } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import AssetTypeRadioButtons from './AssetTypeRadioButtons'
import {
  ASSET_TYPE_BY_ID,
  DEFAULT_ASSET_TYPE_ID,
} from '../constants'
import { getRandomString } from '../macros'

class AssetAddDialog extends PureComponent {
  state = {
    assetTypeId: DEFAULT_ASSET_TYPE_ID,
  }

  onAssetTypeClick = ({id}) => {
    this.setState({assetTypeId: id})}

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
    const { assetTypeId } = this.state
    const assetTypeName = ASSET_TYPE_BY_ID[assetTypeId]['name']
    const assetId = getRandomString(7)
    addSelectedAssetType({id: assetTypeId})
    addAsset({
      id: assetId,
      name: assetTypeName + ' ' + assetId,
      typeId: assetTypeId})
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
