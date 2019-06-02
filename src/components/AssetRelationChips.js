import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { List } from 'immutable'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Check'


const styles = theme => ({
  chip: {
    margin: `${theme.spacing.unit}px 8px 0 0`,
  },
  hide: {
    visibility: 'hidden',
  },
})


class AssetRelationChips extends PureComponent {

  render() {
    const {
      classes,
      className,
      label,
      assetKey,
      relatedAssets,
      // Get redux variables
      relatingAssetId,
      relatingAssetKey,
      focusingAsset,
      focusingAssetType,
      setFocusingAsset,
      setRelatingAsset,
    } = this.props
    const assetId = focusingAsset.get('id')

    // Skip if the focusing asset cannot relate to other assets in this key
    const relatedAssetTypeIds = focusingAssetType.get(assetKey, List())
    if (relatedAssetTypeIds.isEmpty()) {
      return null
    }

    return (
      <FormControl fullWidth className={className}>
        <FormLabel>{label}</FormLabel>
        <div>

        {relatedAssets.map(relatedAsset => {
          const relatedAssetId = relatedAsset.get('id')
          const relatedAssetName = relatedAsset.get('name')
          return (
            <Chip
              key={relatedAssetId}
              label={relatedAssetName}
              className={classes.chip}
              onClick={() => setFocusingAsset({id: relatedAssetId})}
            />
          )
        })}

          <Chip
            label={relatingAssetId ? <SaveIcon /> : <AddIcon />}
            color={relatingAssetId ? 'secondary' : 'primary'}
            className={classNames(classes.chip, {
              [classes.hide]: relatingAssetId && (
                relatingAssetId !== assetId ||
                relatingAssetKey !== assetKey),
            })}
            onClick={() => setRelatingAsset(relatingAssetId ? {
              id: null,
              key: null,
            } : {
              id: assetId,
              key: assetKey,
            })}
          />

        </div>
      </FormControl>
    )
  }

}


export default withStyles(styles)(AssetRelationChips)
