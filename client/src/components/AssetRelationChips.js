import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'

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

const AssetRelationChips = ({
  classes,
  label,
  assetKey,
  highlightedAssetId,
  exposedAssetId,
  exposedAssetKey,
  assetById,
  setExposedAsset,
}) => {
  const assetId = highlightedAssetId
  const asset = assetById[assetId]
  const relatedAssetIds = (asset && asset[assetKey]) || []
  return (
    <FormControl fullWidth className={classes.root}>
      <FormLabel>{label}</FormLabel>
      <div className={classes.chipGroup}>
      {relatedAssetIds.map(relatedAssetId => (
        <Chip
          key={relatedAssetId}
          label={assetById[relatedAssetId].name}
          className={classes.chip}
        />
      ))}
        <Chip
          label={exposedAssetId ? <CheckIcon /> : <AddIcon />}
          color={exposedAssetId ? 'secondary' : 'primary'}
          className={classNames(classes.chip, {
            [classes.hide]: exposedAssetId && (
              exposedAssetId !== assetId ||
              exposedAssetKey !== assetKey),
          })}
          onClick={() => setExposedAsset(exposedAssetId ? {
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

export default withStyles(styles)(AssetRelationChips)
