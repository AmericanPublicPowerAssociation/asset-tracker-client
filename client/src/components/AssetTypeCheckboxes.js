import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { ASSET_TYPE_BY_ID } from '../constants'

const AssetTypeCheckboxes = ({
  selectedAssetTypeIds,
  onAssetTypeClick,
}) => {
  return (
    <List disablePadding>
    {Object.entries(ASSET_TYPE_BY_ID).map(([id, {name}]) =>
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
    )}
    </List>
  )
}

export default AssetTypeCheckboxes
