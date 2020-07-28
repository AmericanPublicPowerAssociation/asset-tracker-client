import React from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import FullScreenExitIcon from '@material-ui/icons/FullscreenExit'
import FullScreenIcon from '@material-ui/icons/Fullscreen'
import AssetName from './AssetName'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'

export default function AssetNameWithLogo(props) {
  const {
    asset,
    expand,
    setExpand,
    showExpandButton = false,
    isViewing = true } = props

  return (
    <Box display='flex' flex-direction='column' alignItems='center' style={{ width: '100%' }}>
      <AssetTypeSvgIcon assetTypeCode={asset.typeCode} />
      <Box flexGrow={1} style={{ overflowX: 'hidden' }} pl={1}>
        <AssetName asset={asset} isEditing={!isViewing} />
      </Box>
      { showExpandButton && (
        <IconButton style={{ padding: 0 }} onClick={() => {setExpand(!expand)}}>
          {expand ?
            <FullScreenExitIcon /> :
            <FullScreenIcon />
          }
        </IconButton>)
      }
    </Box>
  )
}
