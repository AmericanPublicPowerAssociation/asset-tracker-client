import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'
import { ASSET_TYPE_BY_ID } from '../constants'

const styles = theme => ({
  exposed: {
    backgroundColor: theme.palette.secondary.main,
  },
})

const AssetList = ({
  classes,
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
  const visibleAssetTypeIds = exposedAssetId ? ASSET_TYPE_BY_ID[
    assetById[exposedAssetId].typeId][exposedAssetKey] : []
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
          className={(
            exposedAssetId &&
            exposedAssetId === visibleAssetId &&
            classes.exposed) || ''}
        >
          <ListItemText primary={visibleAsset.name} />
          {
            exposedAssetId &&
            exposedAssetId !== visibleAssetId &&
            visibleAssetTypeIds.includes(visibleAsset.typeId) &&
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

export default withStyles(styles)(AssetList)
