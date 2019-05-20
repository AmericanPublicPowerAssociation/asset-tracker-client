import React, { PureComponent } from 'react'
import { Map } from 'immutable'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import AssetTypeSelect from './AssetTypeSelect'
import AssetName from './AssetName'
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
    utilityId: 'abc',
    typeId: DEFAULT_ASSET_TYPE_ID,
    name: '',
    errors: Map(),
  }

  trackType = event => {
    this.setState({typeId: event.target.value})
  }

  trackChanges = attributes => {
    this.setState({...attributes})
  }

  onCancel = () => {
    const { onClose } = this.props
    onClose()
  }

  onOk = () => {
    const { addAsset } = this.props
    const { utilityId, typeId, name } = this.state
    addAsset({utilityId, typeId, name}, {
      onError: this.onError,
      onSuccess: this.onSuccess,
    })
  }

  onError = errors => {
    this.setState({errors})
  }

  onSuccess = asset => {
    const { onClose } = this.props
    const { errors } = this.state
    this.setState({name: '', errors: errors.clear()})
    onClose()
  }

  render = () => {
    const { classes, open, onClose } = this.props
    const { typeId, name, errors } = this.state
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
            onChange={this.trackType}
          />
          <AssetName
            name={name}
            errorText={errors.get('name')}
            className={classes.attribute}
            onChange={this.trackChanges}
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
