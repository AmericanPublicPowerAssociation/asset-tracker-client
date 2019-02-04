import React, { Component } from 'react'
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

class AssetAddDialog extends Component {
  state = {
    assetTypeId: DEFAULT_ASSET_TYPE_ID,
  }

  handleAssetTypeClick = ({id}) => {
    this.setState({assetTypeId: id})}

  handleCancel = () => {
    this.props.onClose()}

  handleOk = () => {
    const { assetTypeId } = this.state
    const assetTypeName = ASSET_TYPE_BY_ID[assetTypeId]['name']
    const assetId = getRandomString(7)
    this.props.addSelectedAssetType({id: assetTypeId})
    this.props.addAsset({
      'id': assetId,
      'name': assetTypeName + ' ' + assetId,
      'typeId': assetTypeId})
    this.props.setHighlightedAsset({id: assetId})
    this.props.onClose()}

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
          <Button onClick={this.handleOk} color='primary'>Ok</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AssetAddDialog
