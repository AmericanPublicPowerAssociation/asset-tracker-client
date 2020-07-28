// TODO: Review from scratch

import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {
  setAssetValue,
} from '../actions'

const useStyles = makeStyles(theme => ({
  input: {
    lineHeight: 1.5,
    padding: '0 !important',
  },
}))

export default function AssetName({
  asset,
  isEditing,
}) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const assetId = asset.id
  const assetName = asset.name

  function handleAssetNameChange(event) {
    dispatch(setAssetValue(assetId, 'name', event.target.value))
  }

  return isEditing
    ? <TextField
        fullWidth
        value={assetName}
        multiline={true}
        variant='filled'
        InputProps={{ className: classes.input }}
        onChange={handleAssetNameChange}
      />
    : <Typography>{assetName}</Typography>
}
