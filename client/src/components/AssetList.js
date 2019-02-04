import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'

const AssetList = ({
  // Get local variables
  onSelect,
  // Get global variables
  sortedAssetIds,
  selectedAssetTypeIds,
  highlightedAssetId,
  exposedAssetId,
  assetById,
  setHighlightedAsset,
}) => {
  const visibleAssetIds = sortedAssetIds.filter(sortedAssetId =>
    selectedAssetTypeIds.includes(assetById[sortedAssetId].typeId))
  return (
    <List disablePadding>
    {visibleAssetIds.map(visibleAssetId => (
      <ListItem
        button
        key={visibleAssetId}
        onClick={() => {
          setHighlightedAsset({id: visibleAssetId})
          onSelect()
        }}
        selected={visibleAssetId === highlightedAssetId}
      >
        <ListItemText primary={assetById[visibleAssetId].name} />
        {exposedAssetId &&
          <ListItemSecondaryAction>
            <Switch
              onChange={() => {console.log('hey')}}
            />
          </ListItemSecondaryAction>
        }
      </ListItem>
    ))}
    </List>
  )
}

export default AssetList
