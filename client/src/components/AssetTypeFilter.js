import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { ASSET_TYPES } from '../constants'

const AssetTypeFilter = props => {
  const { selectedAssetTypeIds } = props
  const { onAssetTypeClick } = props
  return (
    <List disablePadding>
    {ASSET_TYPES.map(x => (
      <ListItem
        button
        key={x.id}
        onClick={() => onAssetTypeClick(x.id)}
      >
        <Checkbox
          checked={selectedAssetTypeIds.includes(x.id)}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText primary={x.name} />
      </ListItem>
    ))}
    </List>
  )
}

export default AssetTypeFilter

/*
*/
