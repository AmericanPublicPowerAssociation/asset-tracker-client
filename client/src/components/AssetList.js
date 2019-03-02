import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'

const styles = theme => ({
  relating: {
    backgroundColor: theme.palette.secondary.main,
  },
})

class AssetList extends PureComponent {
  render() {
    const {
      classes,
      // Get local variables
      onSelect,
      // Get global variables
      visibleAssets,
      relatedAssetIds,
      relatedAssetTypeIds,
      focusingAssetId,
      relatingAssetId,
      relatingAssetKey,
      setFocusingAsset,
      toggleAssetRelation,
    } = this.props
    return (
      <List disablePadding>
        {visibleAssets.map(visibleAsset => {
          const visibleAssetId = visibleAsset.get('id')
          const visibleAssetName = visibleAsset.get('name')
          const visibleAssetTypeId = visibleAsset.get('typeId')
          return (
            <ListItem
              button
              onClick={() => {
                setFocusingAsset({id: visibleAssetId})
                onSelect()
              }}
              selected={visibleAssetId === focusingAssetId}
              className={(
                relatingAssetId &&
                relatingAssetId === visibleAssetId &&
                classes.relating) || ''}
              key={visibleAssetId}
            >
              <ListItemText primary={visibleAssetName} />
              {
                relatingAssetId &&
                relatingAssetId !== visibleAssetId &&
                relatedAssetTypeIds.includes(visibleAssetTypeId) &&
                <ListItemSecondaryAction>
                  <Switch
                    checked={relatedAssetIds.includes(visibleAssetId)}
                    onChange={() => {toggleAssetRelation({
                      relatingAssetId,
                      relatingAssetKey,
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
}

export default withStyles(styles)(AssetList)
