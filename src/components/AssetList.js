import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'
import {
  scrollToFocusingAsset,
} from '../routines'


const styles = theme => ({
  root: {
    height: '100%',
    overflow: 'auto',
  },
  hide: {
    visibility: 'hidden',
  },
  editing: {
    backgroundColor: theme.palette.secondary.main,
  },
})


class AssetList extends PureComponent {

  componentDidUpdate() {
    scrollToFocusingAsset(this)
  }

  render() {
    const {
      classes,
      visibleAssets,
      focusingAssetId,
      locatingAssetId,
      relatingAssetId,
      relatingAssetKey,
      relatedAssetTypeIds,
      relatedAssetIds,
      setFocusingAsset,
      addAssetRelation,
      dropAssetRelation,
    } = this.props

    const editingAssetId = locatingAssetId || relatingAssetId

    return(
      <List className={classes.root}>
      {visibleAssets.map(asset => {
        const assetId = asset.get('id')
        const assetName = asset.get('name')
        const assetTypeId = asset.get('typeId')
        const primaryAssetTypeId = assetTypeId[0]
        const isRelated = relatedAssetIds.includes(assetId)
        const actionPayload = {
          id: relatingAssetId,
          key: relatingAssetKey,
          otherId: assetId,
        }
        return (
          <ListItem
            className={classNames({
              [classes.editing]: editingAssetId && editingAssetId === assetId,
            })}
            button
            selected={assetId === focusingAssetId}
            key={assetId}
            ref={assetId}
            onClick={() => {
              setFocusingAsset({id: assetId})
            }}
          >
            <ListItemText primary={assetName} />
          {
            relatingAssetId &&
            <ListItemSecondaryAction>
              <Switch
                className={classNames({
                  [classes.hide]:
                    !relatedAssetTypeIds.includes(primaryAssetTypeId) ||
                    relatingAssetId === assetId
                })}
                checked={isRelated}
                onChange={() => isRelated ?
                  dropAssetRelation(actionPayload) :
                  addAssetRelation(actionPayload)
                }
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
