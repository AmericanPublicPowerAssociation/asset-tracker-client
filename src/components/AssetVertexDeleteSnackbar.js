import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import {
  deleteAssetVertex,
  setAssetsGeoJson,
} from '../actions'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.warning.main,
  },
}))

export default function AssetVertexDeleteDialog({
  deleteAssetVertexObj,
  isOpen,
  hideMessage,
}) {
  const dispatch = useDispatch()
  const classes = useStyles()
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
    hideMessage()
  }

  function handleClose(e, reason) {
    if (reason === 'clickaway') return
    hideMessage()
  }

  const actionComponent = (
    <>
      <Button color='primary' size='small' onClick={handleConfirm}>Confirm</Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  return (
    <Snackbar
      ContentProps={{
        classes: { root: classes.root },
      }}
      open={isOpen}
      onClose={handleClose}
      action={actionComponent}
      autoHideDuration={4000}
      message='Are you sure you want to delete the vertex?'
    />
  )
}
