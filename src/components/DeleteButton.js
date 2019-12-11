import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import produce from 'immer'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles( theme => ({
  deleteButton: {
    width: '100%'
  }
}))


export default function DeleteButton(props){  
  const {
    focusingAsset,
    setGeoJson,
    geoJson,
    selectedFeatureIndexes,
    setSelectedFeatureIndexes,
    setFocusingAssetId,
    setAssetById
    } = props
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const classes = useStyles()

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    const index = selectedFeatureIndexes[0] 
    if(input === focusingAsset.id) {
      setGeoJson(
        produce( draft => {
          draft.features.splice(index,1)
        })
      )

      setAssetById(
        produce( draft => {
          delete draft[focusingAsset.id]
        })
      )
      setSelectedFeatureIndexes([])
      setFocusingAssetId(undefined)
      setOpen(false) 
    }
  }

  return (
    <div>
      <Button
          classes={{root: classes.deleteButton}}
          variant="contained"
          color="secondary"
          onClick={ () => setOpen(true) }
          startIcon={<DeleteIcon />}>
          Delete
        </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Asset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this asset? To proceed, please enter the asset id in the text field below.
            <br/>
            Asset by Id: {focusingAsset.id}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="delete-asset-id"
            label="ASSET ID"
            type="text"
            fullWidth 
            value={input}
            onChange={ e => setInput(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button 
            color='secondary'
            variant='contained'
            disabled={input !== focusingAsset.id}
            onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
