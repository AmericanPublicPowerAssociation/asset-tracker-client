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
  tilt: {
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.shortest,
    }),
    transform: 'rotate(45deg)',
  },
  hide: {
    visibility: 'hidden',
  },
})

const AssetRelationControl = ({
  classes,
  label,
  assetKey,
  exposedAssetKey,
  asset,
  assetById,
  onAssetKeyOpen,
  onAssetKeyClose,
}) => {
  const relationIds = (asset && asset[assetKey]) || []
  const isAssetKeyExposed = exposedAssetKey === assetKey
  return (
    <FormControl fullWidth className={classes.formControl}>
      <FormLabel>{label}</FormLabel>
      <div className={classes.chipGroup}>
      {relationIds.map(assetId => (
        <Chip
          label={assetById[assetId].name}
          className={classes.chip} />
      ))}
        <Chip
          className={classNames(classes.chip, {
            [classes.hide]: exposedAssetKey && !isAssetKeyExposed,
          })}
          label={<AddIcon className={classNames({
            [classes.tilt]: isAssetKeyExposed,
          })}/>}
          color={isAssetKeyExposed ? 'secondary' : 'primary'}
          onClick={() => isAssetKeyExposed ? onAssetKeyClose() : onAssetKeyOpen(assetKey)}
        />
      </div>
    </FormControl>
  )
}

export default withStyles(styles)(AssetRelationControl)
