import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const AssetList = props => {
  const {
    onSelect,
  } = props
  const {
    assetById,
    highlightedAssetId,
    selectedAssetTypeIds,
    sortedAssetIds,
  } = props
  const {
    highlightAsset,
  } = props
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
      </ListItem>
    ))}
    </List>
  )
}

export default AssetList
