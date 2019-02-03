import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  formControl: {
    margin: '24px 0 0 0',
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

const AssetRelationControl = ({
  classes,
  label,
  currentAssetId,
  currentAssetRelation,
  assetById,
  exposedAssetId,
  exposedAssetRelation,
  onAssetRelationOpen,
  onAssetRelationClose,
}) => {
  const asset = assetById[currentAssetId]
  const relationIds = (asset && asset[currentAssetRelation]) || []
  return (
    <FormControl fullWidth className={classes.formControl}>
      <FormLabel>{label}</FormLabel>
      <div className={classes.chipGroup}>
      {relationIds.map(assetId => (
        <Chip
          key={assetId}
          label={assetById[assetId].name}
          className={classes.chip} />
      ))}
        <Chip
          className={classNames(classes.chip, {
            [classes.hide]: exposedAssetId && (
              exposedAssetId !== currentAssetId ||
              exposedAssetRelation !== currentAssetRelation),
          })}
          label={<AddIcon />}
          color='primary'
          onClick={() => onAssetRelationOpen(
            currentAssetId,
            currentAssetRelation)}
        />
      </div>
    </FormControl>
  )
}

export default withStyles(styles)(AssetRelationControl)
