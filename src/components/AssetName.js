import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import {
  setAssetValue,
} from '../actions'

const useStyles = makeStyles(theme => ({
  input: {
    lineHeight: 1.5,
    padding: '0 !important',
  },
  inline: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

export default function AssetName({
  asset,
  isEditing,
  // TODO: Rename
  expand,
  setExpand,
}) {
  const theme = useTheme()
  const classes = useStyles()
  const dispatch = useDispatch()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'))

  const assetId = asset.id
  const assetName = asset.name

  function handleChange(event) {
    dispatch(setAssetValue(assetId, 'name', event.target.value))
  }

  const expandIcon = (expand ?
    <ExpandMore onClick={() => setExpand(false)} /> :
    <ExpandLess onClick={() => setExpand(true)} />)

  return (isEditing ?
    <>
      <TextField
        value={assetName}
        multiline={true}
        variant='filled'
        InputProps={{ className: classes.input }}
        onChange={handleChange}
      />
      {isMobileView ? expandIcon : <></>}
    </>:
    <div className={classes.inline}>
      <Typography>{assetName}</Typography>
      { isMobileView ? expandIcon : <></>}
    </div>
  )
}
