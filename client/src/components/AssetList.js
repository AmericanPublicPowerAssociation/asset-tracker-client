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
  exposedAssetKey,
  assetById,
  setHighlightedAsset,
  toggleAssetRelation,
}) => {
  const visibleAssetIds = sortedAssetIds.filter(sortedAssetId =>
    selectedAssetTypeIds.includes(assetById[sortedAssetId].typeId))
  return (
    <List disablePadding>
    {visibleAssetIds.map(visibleAssetId => {
      const visibleAsset = assetById[visibleAssetId]
      return (
        <ListItem
          button
          key={visibleAssetId}
          onClick={() => {
            setHighlightedAsset({id: visibleAssetId})
            onSelect()
          }}
          selected={visibleAssetId === highlightedAssetId}
        >
          <ListItemText primary={visibleAsset.name} />
          {exposedAssetId && exposedAssetId !== visibleAssetId &&
            <ListItemSecondaryAction>
              <Switch
                checked={(
                  assetById[exposedAssetId][exposedAssetKey] || []
                ).includes(visibleAssetId)}
                onChange={() => {toggleAssetRelation({
                  exposedAssetId,
                  exposedAssetKey,
                  visibleAssetId})}}
              />
            </ListItemSecondaryAction>
          }
        </ListItem>
      )
    })}
    </List>
  )
}

export default AssetList
