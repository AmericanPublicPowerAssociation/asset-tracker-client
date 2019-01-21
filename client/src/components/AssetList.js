import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const assetById = {
  'a': {'name': 'aaa'},
  'b': {'name': 'bbb'},
}

const visibleAssetIds = [
  'a', 'b',
]

const AssetList = (props) => {
  // const { assetById, visibleAssetIds } = props
  return (
    <List disablePadding>
    {visibleAssetIds.map(assetId => {
      const asset = assetById[assetId]
      return (
        <ListItem key={assetId}>
          <ListItemText primary={asset.name} />
        </ListItem>
      )
    })}
    </List>
  )
}

export default AssetList
