import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import AssetTypeSelect from '../containers/AssetTypeSelect'
import AssetName from './AssetName'


const useStyles = makeStyles(theme => ({
  attribute: {
    margin: `${theme.spacing(3)}px 0 0 0`,
  },
}))


export default function AssetAddDialog(props) {
  const classes = useStyles()
  const {
    addingAsset,
    setAddingAssetValues,
  } = props

  function onCancel() {
    const { closeAssetAddDialog } = props
    closeAssetAddDialog()
  }

  function onOk() {
    const { addingAsset, addAsset } = props
    addAsset(addingAsset)
  }

  const open = addingAsset.get('isOpen')
  const typeId = addingAsset.get('typeId')
  const name = addingAsset.get('name')
  const errors = addingAsset.get('errors')

  return (
    <Dialog
      open={open}
      onClose={onCancel}
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
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onOk} color='primary'>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}
