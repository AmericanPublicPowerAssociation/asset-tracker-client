import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'

const AssetList = props => {
  // Get local variables
  const { onSelect } = props
  const { exposedAssetKey } = props
  // Get global variables
  const {
    assetById,
    highlightedAssetId,
    selectedAssetTypeIds,
    sortedAssetIds,
  } = props
  const { highlightAsset } = props

  const visibleAssetIds = sortedAssetIds.filter(
    assetId => selectedAssetTypeIds.includes(assetById[assetId].typeId))
  return (
    <List disablePadding>
    {visibleAssetIds.map(assetId => (
      <ListItem
        button
        key={assetId}
        onClick={() => {
          highlightAsset(assetId)
          onSelect()
        }}
        selected={assetId === highlightedAssetId}
      >
        <ListItemText primary={assetById[assetId].name} />
        {exposedAssetKey &&
          <ListItemSecondaryAction>
            <Switch />
          </ListItemSecondaryAction>
        }
      </ListItem>
    ))}
    </List>
  )
}

export default AssetList
