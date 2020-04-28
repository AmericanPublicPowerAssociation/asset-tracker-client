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

export default function AssetName({ asset, isEditing }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const assetId = asset.id
  const assetName = asset.name

  function handleChange(event) {
    dispatch(setAssetValue(assetId, 'name', event.target.value))
  }

  return (isEditing ?
    <TextField
      onChange={handleChange}
      value={assetName}
      multiline={true}
      variant='filled'
      InputProps={{
        className: classes.input,
      }}
    /> :
    <Typography>
      {assetName}
    </Typography>
  )
}
