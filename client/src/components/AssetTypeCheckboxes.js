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
    {ASSET_TYPES.map(assetType => {
      const {id, name} = assetType
      return (
        <ListItem
          button
          key={id}
          onClick={() => onAssetTypeClick({id})}
        >
          <Checkbox
            checked={selectedAssetTypeIds.includes(id)}
            tabIndex={-1}
            disableRipple
          />
          <ListItemText primary={name} />
        </ListItem>
      )
    })}
    </List>
  )
}

export default AssetTypeCheckboxes
