import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { ASSET_TYPES } from '../constants'

const AssetTypeCheckboxes = ({
  selectedAssetTypeIds,
  onAssetTypeClick,
}) => {
  return (
    <List disablePadding>
    {ASSET_TYPES.map(assetType => (
      <ListItem
        button
        key={assetType.id}
        onClick={() => onAssetTypeClick({id: assetType.id})}
      >
        <Checkbox
          checked={selectedAssetTypeIds.includes(assetType.id)}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText primary={assetType.name} />
      </ListItem>
    ))}
    </List>
  )
}

export default AssetTypeCheckboxes
