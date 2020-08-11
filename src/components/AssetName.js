// TODO: Review from scratch

import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FullScreenExitIcon from '@material-ui/icons/FullscreenExit'
import FullScreenIcon from '@material-ui/icons/Fullscreen'
import {
  setAssetValue,
} from '../actions'
import {
  IsLayoutMobileContext,
} from '../contexts'

const useStyles = makeStyles(theme => ({
  input: {
    lineHeight: 1.5,
    padding: '0 !important',
  },
  inline: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))

export default function AssetName({
  asset,
  isEditing,
  isFullScreen,
  setIsFullScreen,
}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isLayoutMobile = useContext(IsLayoutMobileContext)

  const assetId = asset.id
  const assetName = asset.name

  function handleAssetNameChange(event) {
    dispatch(setAssetValue(assetId, 'name', event.target.value))
  }

  return (
    <div className={classes.inline}>
      {isEditing ?
        <TextField
          fullWidth
          value={assetName}
          multiline={true}
          variant='filled'
          InputProps={{ className: classes.input }}
          onChange={handleAssetNameChange}
        /> :
        <Typography style={{ overflowWrap: 'anywhere' }}>{assetName}</Typography>
      }
      {isLayoutMobile && (
        <IconButton onClick={() => setIsFullScreen(!isFullScreen)}>
          {isFullScreen ?
            <FullScreenExitIcon /> :
            <FullScreenIcon />
          }
        </IconButton>
      )}
    </div>
  )
}
