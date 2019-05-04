import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import { ASSET_TYPE_BY_ID } from '../constants'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 3}px 0 0 0`,
  },
  chipGroup: {
    display: 'flex',
    flexWrap: 'wrap',
  },
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
      label,
      assetKey,
      focusingAsset,
      relatingAssetId,
      relatingAssetKey,
      relatedAssets,
      addSelectedAssetType,
      setFocusingAsset,
      setRelatingAsset,
    } = this.props
    const assetId = focusingAsset.get('id')
    const assetTypeId = focusingAsset.get('typeId')
    const relatedAssetTypeIds = ASSET_TYPE_BY_ID[assetTypeId][assetKey] || []
    if (!relatedAssetTypeIds.length) return null
    return (
      <FormControl fullWidth className={classes.root}>
        <FormLabel>{label}</FormLabel>
        <div className={classes.chipGroup}>
        {relatedAssets.map(relatedAsset => {
          const relatedAssetId = relatedAsset.get('id')
          const relatedAssetName = relatedAsset.get('name')
          const relatedAssetTypeId = relatedAsset.get('typeId')
          return (
            <Chip
              key={relatedAssetId}
              label={relatedAssetName}
              className={classes.chip}
              onClick={() => {
                addSelectedAssetType({id: relatedAssetTypeId})
                setFocusingAsset({id: relatedAssetId})
              }}
            />
          )
        })}
          <Chip
            label={relatingAssetId ? <CheckIcon /> : <AddIcon />}
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
