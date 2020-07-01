import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import {
  deleteAssetVertex,
  setAssetsGeoJson,
} from '../actions'

export default function AssetVertexDeleteDialog({
  deleteAssetVertexObj,
  isOpen,
  onClose,
}) {
  const dispatch = useDispatch()

  function handleConfirm() {
    const {
      assetId,
      removedPositionIndex, 
      vertexCount,
      updatedData,
    } = deleteAssetVertexObj
    dispatch(deleteAssetVertex(
      assetId, removedPositionIndex, vertexCount))
    dispatch(setAssetsGeoJson(updatedData))
    onClose()
  }

  return (
    <Dialog open={isOpen || false} onClose={onClose}>
      <DialogTitle>
        Delete Asset Vertex
      </DialogTitle>
      <DialogContent>
        Are you sure you want to delete this Asset vertex?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          color='secondary'
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
